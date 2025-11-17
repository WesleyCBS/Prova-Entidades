import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ConsoleVideogame } from '../model/console';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private firestore: Firestore = inject(Firestore);
  private readonly PATH = 'consoles';

  constructor() {}

  getAllConsoles(): Observable<ConsoleVideogame[]> {
    const consolesCollection = collection(this.firestore, this.PATH);
    return collectionData(consolesCollection, { idField: 'id' }) as Observable<ConsoleVideogame[]>;
  }

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

  delete(id: number): Promise<void> {
    const consoleRef = doc(this.firestore, `${this.PATH}/${id}`);
    return deleteDoc(consoleRef);
  }
}


