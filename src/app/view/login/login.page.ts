import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {
  formLogar!: FormGroup;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.formLogar = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get emailControl(): AbstractControl {
    return this.formLogar.get('email')!;
  }

  get senhaControl(): AbstractControl {
    return this.formLogar.get('senha')!;
  }

  async submitForm(): Promise<void> {
    if (!this.formLogar.valid) {
      await this.presentAlert("Console", "Logar", "Todos os campos são obrigatórios!");
      return;
    }

    try {
      await this.auth.signIn(this.formLogar.value.email, this.formLogar.value.senha);
      await this.presentAlert("Console", "Logar", "Seja bem-vindo!");
      this.router.navigate(['/home']);
    } catch (error: any) {
      console.error(error);
      await this.presentAlert("Console", "Logar", "Erro ao logar, tente novamente!");
    }
  }

  public irParaSignUp(): void {
    this.router.navigate(['/registrar']);
  }

  private async presentAlert(titulo: string, subtitulo: string, mensagem: string) {
    const alert = await this.alertController.create({
      header: titulo,
      subHeader: subtitulo,
      message: mensagem,
      buttons: ['OK'],
    });
    await alert.present();
  }
}


