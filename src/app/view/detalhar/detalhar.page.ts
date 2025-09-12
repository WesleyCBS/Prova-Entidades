import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ConsoleVideogame } from 'src/app/model/console';
import { ConsoleService } from 'src/app/service/console.service';
import { AlertController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DetalharPage implements OnInit {
  console!: ConsoleVideogame;
  nome!: string;
  marca!: string;
  anoLancamento!: string;
  armazenamento!: string;
  voltagem!: string;
  editar: boolean = false;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private consoleService: ConsoleService
  ) {}

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    if(nav?.extras?.state?.['objeto']) {
      this.console = nav.extras.state['objeto'];
      this.nome = this.console.nome;
      this.marca = this.console.marca;
      this.anoLancamento = this.console.anoLancamento.toISOString().split('T')[0];
      this.armazenamento = this.console.armazenamento;
      this.voltagem = this.console.voltagem;
    }
  }

  async presentAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Cadastro de Consoles',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  private validar(campo: any): boolean {
    return campo !== undefined && campo !== null && campo !== '';
  }

  salvar() {
    if(!this.validar(this.nome) || !this.validar(this.marca) || !this.validar(this.anoLancamento)) {
      this.presentAlert("Erro ao atualizar", "Preencha todos os campos obrigatórios!");
      return;
    }

    if(this.consoleService.editar(
      this.console, 
      this.nome, 
      this.marca, 
      new Date(this.anoLancamento), 
      this.armazenamento, 
      this.voltagem
    )) {
      this.presentAlert('Atualizar', 'Console atualizado com sucesso');
      this.router.navigate(['/home']);
    } else {
      this.presentAlert('Atualizar', 'Erro ao atualizar console');
    }
  }

  excluir() {
    if(this.consoleService.delete(this.console)) {
      this.presentAlert('Excluir', 'Console excluído com sucesso');
      this.router.navigate(['/home']);
    } else {
      this.presentAlert('Excluir', 'Erro ao excluir console');
    }
  }

  alterarEdicao() {
    this.editar = !this.editar;
  }
}
