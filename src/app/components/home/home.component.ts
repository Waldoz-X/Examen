import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf, CurrencyPipe, DecimalPipe } from '@angular/common';
import { ApiService, Producto } from '../../services/api.service';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'primeng/carousel'; // Import CarouselModule
import { ButtonModule } from 'primeng/button'; // For buttons like "Add to Cart" or "Explore"
import { TagModule } from 'primeng/tag'; // Optional: for "AGOTADO" tag

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    NgIf,
    CurrencyPipe,
    DecimalPipe,
    RouterModule,
    CarouselModule, // Add CarouselModule here
    ButtonModule, // Add ButtonModule
    TagModule // Add TagModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productosDestacados: Producto[] = [];
  isLoading: boolean = false;
  errorMessage: string | null = null;
  private readonly NUM_PRODUCTOS_DESTACADOS = 8; // Number of featured products from API (more for carousel)

  // Static images for the new carousel (e.g., promotional banners, collection highlights)
  carouselBanners: { src: string; alt: string; link: string; title: string; subtitle: string }[] = [];

  // Responsive settings for the product carousel (from API)
  responsiveOptionsProducts: any[] = [];
  // Responsive settings for the banner carousel (if needed, simpler for full-width images)
  responsiveOptionsBanners: any[] = [];


  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    // Initialize static carousel banners
    this.carouselBanners = [
      {
        src: 'https://www.youngla.com/cdn/shop/files/JULY_2ND_US_RESTOCK_DESKTOP.jpg?v=1751484536&width=2000', // Replace with your image path
        alt: 'Restock Alert',
        link: '/productos', // Link to a collection or all products
        title: '¡RESTOCK MASIVO!',
        subtitle: 'No te quedes sin tus favoritos.'
      },
      {
        src: 'https://www.youngla.com/cdn/shop/files/JULY_2ND_DROP_DESKTOP.jpg?v=1751484533&width=2000', // Replace with your image path
        alt: 'Nueva Colección',
        link: '/productos/hombre/ropa',
        title: 'NUEVA COLECCIÓN HOMBRE',
        subtitle: 'Descubre lo último en ropa fitness.'
      },
      {
        src: 'https://www.youngla.com/cdn/shop/files/JULY_2ND_LIFESTYLE_DESKTOP.jpg?v=1751484535&width=2000', // Replace with your image path
        alt: 'Suplementos Premium',
        link: '/suplementos',
        title: 'POTENCIA TU ENTRENAMIENTO',
        subtitle: 'Explora nuestra gama de suplementos.'
      },
      {
        src: 'https://www.youngla.com/cdn/shop/files/Banner_1_d6c39ac7-1cbb-4e3c-9813-e817e2184775.jpg?v=1751052537&width=2000', // Replace with your image path
        alt: 'New Drop',
        link: '/suplementos',
        title: '¡NEW DROP!',
        subtitle: 'No te quedes sin tus favoritos.'
      }

      // Add more banners as needed
    ];

    // Responsive options for the products carousel (similar to previous)
    this.responsiveOptionsProducts = [
      { breakpoint: '1024px', numVisible: 3, numScroll: 3 },
      { breakpoint: '768px', numVisible: 2, numScroll: 2 },
      { breakpoint: '560px', numVisible: 1, numScroll: 1 }
    ];

    // Responsive options for the banner carousel (usually full width, so numVisible: 1)
    this.responsiveOptionsBanners = [
      { breakpoint: '1024px', numVisible: 1, numScroll: 1 },
      { breakpoint: '768px', numVisible: 1, numScroll: 1 },
      { breakpoint: '560px', numVisible: 1, numScroll: 1 }
    ];

    this.loadProductosDestacados();
  }

  loadProductosDestacados(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.apiService.getProductos().subscribe(
      (response: any) => {
        const allProducts: Producto[] = response.$values || response;
        // Shuffle products and take the first N (or all if less than N)
        this.productosDestacados = this.shuffleArray(allProducts).slice(0, this.NUM_PRODUCTOS_DESTACADOS);
        this.isLoading = false;
      },
      error => {
        console.error('Error al cargar productos destacados:', error);
        this.errorMessage = 'No se pudieron cargar los productos destacados. Por favor, inténtalo de nuevo más tarde.';
        this.isLoading = false;
        this.productosDestacados = [];
      }
    );
  }

  // Helper function to shuffle an array (optional, for random featured products)
  private shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
