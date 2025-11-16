import { Injectable, NgZone } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, docData, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { ConsoleVideogame } from '../model/console';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsoleService {
  private collectionName = 'consoles';

  constructor(private firestore: Firestore, private ngZone: NgZone) {}

  public create(console: ConsoleVideogame) {
    const colRef = collection(this.firestore, this.collectionName);
    return addDoc(colRef, {
      id: console.id,
      nome: console.nome,
      marca: console.marca,
      anoLancamento: console.anoLancamento,
      armazenamento: console.armazenamento,
      voltagem: console.voltagem
    });
  }

  public getAll(): Observable<ConsoleVideogame[]> {
    const colRef = collection(this.firestore, this.collectionName);
    return collectionData(colRef, { idField: 'id' }) as Observable<ConsoleVideogame[]>;
  }

  public getById(id: string): Observable<ConsoleVideogame> {
    const docRef = doc(this.firestore, `${this.collectionName}/${id}`);
    return docData(docRef, { idField: 'id' }) as Observable<ConsoleVideogame>;
  }

  public update(console: ConsoleVideogame) {
    const docRef = doc(this.firestore, `${this.collectionName}/${console.id}`);
    return updateDoc(docRef, {
      nome: console.nome,
      marca: console.marca,
      anoLancamento: console.anoLancamento,
      armazenamento: console.armazenamento,
      voltagem: console.voltagem
    });
  }

  public delete(console: ConsoleVideogame) {
    const docRef = doc(this.firestore, `${this.collectionName}/${console.id}`);
    return deleteDoc(docRef);
  }
}







