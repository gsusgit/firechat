import { Component, OnInit } from '@angular/core';
import { ChatService } from "../../services/chat.service";
import { Mensaje } from '../../interfaces/mensaje.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent implements OnInit {

  elemento: any;
  mensaje: string = '';
  mensajes: Mensaje[] = [];

  constructor(public chatService: ChatService) {
    this.chatService.cargarMensajes().subscribe(mensajes => {
      this.mensajes = mensajes;
      setTimeout(() => {
      }, 100);
    });
  }

  ngOnInit() {
    this.elemento = document.getElementById('app-mensajes');
  }

  enviarMensaje() {
    if (this.mensaje.length === 0) {
      return;
    } else {
      this.chatService.agregarMensaje(this.mensaje);
      this.mensaje = '';
    }
  }

  logOut() {
    this.chatService.logout();
  }

}
