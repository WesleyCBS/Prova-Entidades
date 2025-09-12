import { Injectable } from '@angular/core';
import { ConsoleVideogame } from 'src/app/model/console';

@Injectable({
  providedIn: 'root'
})
export class ConsoleService {
  private _consoles: ConsoleVideogame[] = [];

  constructor(){
 
  }

  public get consoles(): ConsoleVideogame[] {
    return this._consoles;
  }

  public create(console: ConsoleVideogame): boolean {
    this._consoles.push(console);
    return true;
  }

  public editar(console: ConsoleVideogame, nome: string, marca: string,
                anoLancamento: Date, armazenamento: string, voltagem: string): boolean {
    for(let i = 0; i < this._consoles.length; i++){
      if(this._consoles[i].id === console.id){
        this._consoles[i].nome = nome;
        this._consoles[i].marca = marca;
        this._consoles[i].anoLancamento = anoLancamento;
        this._consoles[i].armazenamento = armazenamento;
        this._consoles[i].voltagem = voltagem;
        return true;
      }
    }
    return false;
  }

  public delete(console: ConsoleVideogame): boolean {
    for(let i = 0; i < this._consoles.length; i++){
      if(this._consoles[i].id === console.id){
        this._consoles.splice(i,1);
        return true;
      }
    }
    return false;
  }
}

