import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add, createOutline } from 'ionicons/icons';
import { ConsoleVideogame } from 'src/app/model/console';
import { ConsoleService } from 'src/app/service/console.service';
import { firstValueFrom } from 'rxjs';

addIcons({ add: add, 'create-outline': createOutline });

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class HomePage implements OnInit {
  consoles: ConsoleVideogame[] = [];

  constructor(
    private router: Router,
    private consoleService: ConsoleService
  ) {}

  ngOnInit() {
    this.carregarConsoles();
  }

  async carregarConsoles() {
    try {
      this.consoles = await firstValueFrom(this.consoleService.getAll());
    } catch (err) {
      console.error('Erro ao carregar consoles:', err);
    }
  }

  irParaCadastrar() {
    this.router.navigate(['/cadastrar']);
  }

  detalhar(console: ConsoleVideogame) {
    this.router.navigateByUrl('/detalhar', { state: { objeto: console } });
  }
}



