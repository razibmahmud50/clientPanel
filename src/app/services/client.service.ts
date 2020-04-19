import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Client } from '../models/Client' 
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientsCollection: AngularFirestoreCollection<Client>
  clientDoc: AngularFirestoreDocument <Client>
  clients: Observable<Client[]>
  client: Observable<Client>

  constructor(private afs:AngularFirestore ) { 
    this.clientsCollection = this.afs.collection('clients',
    ref=> ref.orderBy('lastName','asc'))
  }
  getClients():Observable<Client[]>{
    this.clients = this.clientsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Client;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
      return this.clients;
  }
}
