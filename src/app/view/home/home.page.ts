import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add, createOutline } from 'ionicons/icons';
import { ConsoleVideogame } from 'src/app/model/console';
import { ConsoleService } from 'src/app/service/console.service';

addIcons({ add: add, 'create-outline': createOutline });

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class HomePage {
  consoles: ConsoleVideogame[];

  constructor(
    private router: Router,
    private consoleService: ConsoleService
  ) { 
    this.consoles = this.consoleService.consoles;
  }

  irParaCadastrar() {
    this.router.navigate(["/cadastrar"]);
  }

  detalhar(console: ConsoleVideogame) {
    this.router.navigateByUrl('/detalhar', { state: { objeto: console } });
  }
}

