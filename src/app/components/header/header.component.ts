import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext'; // Para el buscador
import { ButtonModule } from 'primeng/button'; // Para los botones de iconos
import { DropdownModule } from 'primeng/dropdown';
import {FormsModule} from '@angular/forms'; // Para el selector de divisa

interface CurrencyOption {
  name: string;
  code: string;
  icon: string; // URL o clase CSS para la bandera
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    FormsModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  mainMenuItems: MenuItem[] = [];
  topBarText: string = 'ENVÍO GRATIS EN PEDIDOS SUPERIORES A $100 MXN'; // Ejemplo
  searchValue: string = '';

  currencies: CurrencyOption[] = [];
  selectedCurrency: CurrencyOption | undefined;

  ngOnInit() {
    // Configuración de los ítems del menú principal
    this.mainMenuItems = [
      {
        label: 'Hombre',
        icon: 'pi pi-user',
        items: [
          { label: 'Ropa Fitness', routerLink: '/productos/hombre/ropa' },
          { label: 'Suplementos', routerLink: '/productos/hombre/suplementos' },
          { separator: true },
          { label: 'Ver Todo', routerLink: '/productos/hombre' }
        ]
      },
      {
        label: 'Mujer',
        icon: 'pi pi-user-plus',
        items: [
          { label: 'Ropa Fitness', routerLink: '/productos/mujer/ropa' },
          { label: 'Suplementos', routerLink: '/productos/mujer/suplementos' },
          { separator: true },
          { label: 'Ver Todo', routerLink: '/productos/mujer' }
        ]
      },
      {
        label: 'Marcas',
        icon: 'pi pi-tag',
        items: [
          { label: 'YoungLA', routerLink: '/marcas/youngla' },
          { label: 'Gymshark', routerLink: '/marcas/gymshark' },
          { label: 'Dragon Pharma', routerLink: '/marcas/dragonpharma' },
          { separator: true },
          { label: 'Todas las Marcas', routerLink: '/marcas' }
        ]
      },
      {
        label: 'Suplementos',
        icon: 'pi pi-star',
        routerLink: '/suplementos'
      },
      {
        label: 'Outlet',
        icon: 'pi pi-percentage',
        routerLink: '/outlet'
      }
    ];

    // Configuración de opciones de divisa
    this.currencies = [
      { name: 'USD', code: 'USD', icon: 'https://www.youngla.com/cdn/shop/t/107/assets/us_flag.svg?v=127363975448218537201712331136' }, // Asegúrate de tener estas banderas
      { name: 'Europe', code: 'MXN', icon: 'https://www.youngla.com/cdn/shop/t/107/assets/eu_flag.svg?v=162611157536009161531712331136' }
    ];
    this.selectedCurrency = this.currencies.find(c => c.code === 'USD'); // Valor por defecto
  }

  onSearch() {
    console.log('Buscando:', this.searchValue);
    // Aquí puedes implementar la lógica de redirección a la página de resultados de búsqueda
    // this.router.navigate(['/search'], { queryParams: { q: this.searchValue } });
  }

  // Puedes añadir métodos para la navegación de los iconos
  goToAccount() {
    // this.router.navigate(['/account']);
  }

  goToCart() {
    // this.router.navigate(['/cart']);
  }
}
