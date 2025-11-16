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
    if (nav?.extras?.state?.['objeto']) {
      this.console = nav.extras.state['objeto'] as ConsoleVideogame;

      this.nome = this.console.nome;
      this.marca = this.console.marca;
      this.anoLancamento = this.console.anoLancamento.toISOString().split('T')[0];
      this.armazenamento = this.console.armazenamento;
      this.voltagem = this.console.voltagem;
    } else {
      this.presentAlert('Erro', 'Console não encontrado.', true);
    }
  }

  alterarEdicao() {
    this.editar = !this.editar;
  }

  private validar(campo: any): boolean {
    return campo !== undefined && campo !== null && campo !== '';
  }

  async salvar() {
    if (!this.validar(this.nome) || !this.validar(this.marca) || !this.validar(this.anoLancamento)) {
      await this.presentAlert('Erro', 'Preencha todos os campos obrigatórios!');
      return;
    }

    // Atualiza os dados da instância existente sem criar um novo objeto
    this.console.nome = this.nome;
    this.console.marca = this.marca;
    this.console.anoLancamento = new Date(this.anoLancamento);
    this.console.armazenamento = this.armazenamento || '';
    this.console.voltagem = this.voltagem || '';

    try {
      await this.consoleService.update(this.console);
      await this.presentAlert('Sucesso', 'Console atualizado com sucesso!', true);
    } catch (err) {
      console.error(err);
      await this.presentAlert('Erro', 'Falha ao atualizar console');
    }
  }

  async excluir() {
    const confirmAlert = await this.alertController.create({
      header: 'Confirmação',
      message: `Deseja realmente excluir o console '${this.console.nome}'?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Excluir',
          handler: async () => {
            try {
              await this.consoleService.delete(this.console);
              await this.presentAlert('Sucesso', 'Console excluído com sucesso!', true);
            } catch (err) {
              console.error(err);
              await this.presentAlert('Erro', 'Falha ao excluir console');
            }
          }
        }
      ]
    });

    await confirmAlert.present();
  }

  async presentAlert(header: string, message: string, navigate: boolean = false) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();

    if (navigate) {
      this.router.navigate(['/home']);
    }
  }
}





