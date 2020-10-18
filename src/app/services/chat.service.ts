import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from "../interfaces/mensaje.interface";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<any>;

  public chats: Mensaje[] = [];

  constructor(private afs: AngularFirestore) { }

  cargarMensajes() {
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'desc').limit(10));
    return this.itemsCollection.valueChanges().pipe(
      map((mensajes: Mensaje[]) => {
        this.chats = [];
        for (let mensaje of mensajes) {
          this.chats.unshift(mensaje);
        }
        return this.chats;
      })
    )
  }

  agregarMensaje(texto: string) {
    // TODO falta el UID del usuario
    let mensaje: Mensaje = {
      nombre: 'Fernando',
      mensaje: texto,
      fecha: new Date().getTime()
    }
    this.itemsCollection.add(mensaje)
      .then(() => {
        console.log('Mensaje enviado');
      })
      .catch(() => {
        console.error('Ocurrió un error al enviar el mensaje');
      });
  }

}
