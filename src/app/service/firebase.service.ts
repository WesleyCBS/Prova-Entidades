import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ConsoleVideogame } from '../model/console';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private firestore: Firestore = inject(Firestore);
  private readonly PATH = 'consoles'; // nome da coleção no Firestore

  constructor() {}

  // Pega todos os consoles
  getAllConsoles(): Observable<ConsoleVideogame[]> {
    const consolesCollection = collection(this.firestore, this.PATH);
    return collectionData(consolesCollection, { idField: 'id' }) as Observable<ConsoleVideogame[]>;
  }

  // Cria um novo console
  create(consoleObj: ConsoleVideogame): Promise<string> {
    const consolesCollection = collection(this.firestore, this.PATH);
    return addDoc(consolesCollection, {
      nome: consoleObj.nome,
      marca: consoleObj.marca,
      anoLancamento: consoleObj.anoLancamento,
      armazenamento: consoleObj.armazenamento,
      voltagem: consoleObj.voltagem
    }).then(docRef => docRef.id);
  }

  // Atualiza um console existente
  update(consoleObj: ConsoleVideogame): Promise<void> {
    const consoleRef = doc(this.firestore, `${this.PATH}/${consoleObj.id}`);
    return updateDoc(consoleRef, {
      nome: consoleObj.nome,
      marca: consoleObj.marca,
      anoLancamento: consoleObj.anoLancamento,
      armazenamento: consoleObj.armazenamento,
      voltagem: consoleObj.voltagem
    });
  }

  // Deleta um console pelo ID
  delete(id: number): Promise<void> {
    const consoleRef = doc(this.firestore, `${this.PATH}/${id}`);
    return deleteDoc(consoleRef);
  }
}


