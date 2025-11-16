import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ConsoleService } from 'src/app/service/console.service';
import { ConsoleVideogame } from 'src/app/model/console';


@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,]
})
export class CadastrarPage implements OnInit {
  nome!: string;
  marca!: string;
  anoLancamento!: string;
  armazenamento!: string;
  voltagem!: string;

  constructor(
    private alertController: AlertController, 
    private router: Router, 
    private consoleService: ConsoleService
  ) {}

  ngOnInit() {}

  cadastrar() {
    if(!this.validar(this.nome) || !this.validar(this.marca) || !this.validar(this.anoLancamento) || !this.validar(this.armazenamento) || !this.validar(this.voltagem)) {
      this.presentAlert("Erro ao cadastrar", "Preencha todos os campos obrigatórios!");
      return;
    }

    const consoleNovo: ConsoleVideogame = new ConsoleVideogame(
      this.nome,
      this.marca,
      new Date(this.anoLancamento),
      this.armazenamento || "",
      this.voltagem || ""
    );

    this.consoleService.create(consoleNovo);
    this.presentAlert("Sucesso", "Console Cadastrado");
    this.router.navigate(["/home"]);
  }

  private validar(campo: any): boolean {
    return campo !== undefined && campo !== null && campo !== '';
  }

  async presentAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Atenção',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}

























