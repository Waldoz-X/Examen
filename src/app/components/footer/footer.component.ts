import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext'; // Para el campo de email
import { ButtonModule } from 'primeng/button'; // Para el botón de suscribirse
import { RouterModule } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown'; // Para routerLink

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    RouterModule,
    FormsModule,
    DropdownModule,
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  newsletterEmail: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  subscribeToNewsletter() {
    console.log('Suscrito con:', this.newsletterEmail);
    // Aquí puedes añadir la lógica para enviar el email a tu servicio de newsletter
    alert(`Gracias por suscribirte con: ${this.newsletterEmail}`);
    this.newsletterEmail = ''; // Limpiar el campo
  }
}
