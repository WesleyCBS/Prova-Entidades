import { Injectable, NgZone, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  Auth,
  authState,
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private router: Router = inject(Router);
  private ngZone: NgZone = inject(NgZone);

  public usuarioDados$: Observable<User | null>;

  constructor() {
    this.usuarioDados$ = authState(this.auth).pipe(
      map((user) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          return user;
        } else {
          localStorage.setItem('user', 'null');
          return null;
        }
      })
    );
  }

  public signIn(email: string, password: string): Promise<User> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((cred) => cred.user);
  }

  public signUpWithEmailPassword(email: string, password: string): Promise<User> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((cred) => cred.user);
  }

  public signOut(): Promise<void> {
    return signOut(this.auth).then(() => {
      localStorage.removeItem('user');
      this.ngZone.run(() => this.router.navigate(['signIn']));
    });
  }

  public estaLogado(): boolean {
    const user = localStorage.getItem('user');
    return user !== 'null' && user !== null;
  }

  public getUsuarioLogado(): User | null {
    const user = localStorage.getItem('user');
    return user && user !== 'null' ? JSON.parse(user) : null;
  }
}

