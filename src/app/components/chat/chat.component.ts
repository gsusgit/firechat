import { Component, AfterViewChecked } from '@angular/core';
import { ChatService } from "../../services/chat.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent implements AfterViewChecked {

  elemento: any;
  mensaje: string = '';
  mensajes: any[] = [];

  constructor(public chatService: ChatService) {
    this.chatService.cargarMensajes().subscribe(mensajes => {
      this.mensajes = mensajes;
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 20);
    });
  }

  ngAfterViewChecked() {
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

}
