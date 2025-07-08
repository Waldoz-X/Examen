import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor, CurrencyPipe, DecimalPipe } from '@angular/common';
import { ApiService, Producto, Categoria, Marca } from '../../services/api.service';
import { FormsModule } from '@angular/forms';

// PrimeNG Modules
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select'; // For p-select
import { ButtonModule } from 'primeng/button'; // For the "Recargar Productos" button
import { TagModule } from 'primeng/tag'; // For category tags on product cards

@Component({
  selector: 'app-product-gallery',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    SelectModule,
    ButtonModule, // Add ButtonModule here
    TagModule,    // Add TagModule here
    NgIf,
    NgFor,
    CurrencyPipe,
    DecimalPipe
  ],
  templateUrl: './product-gallery.component.html',
  styleUrls: ['./product-gallery.component.css']
})
export class ProductGalleryComponent implements OnInit {
  productos: Producto[] = [];
  categorias: Categoria[] = [];
  marcas: Marca[] = [];
  searchTerm: string = '';
  selectedCategory: Categoria | undefined;
  selectedBrand: Marca | undefined;
  isLoading: boolean = false; // To handle loading state
  errorMessage: string | null = null; // To display errors

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadInitialData();
  }

  // Method to load initial data and refresh from the "Recargar Productos" button
  loadInitialData(): void {
    this.errorMessage = null; // Clear previous errors
    this.isLoading = true;   // Indicate loading

    // Reset filters and search term when reloading
    this.searchTerm = '';
    this.selectedCategory = undefined;
    this.selectedBrand = undefined;

    // Use Promise.all to load all data in parallel
    Promise.all([
      this.loadProductos(),
      this.loadCategorias(),
      this.loadMarcas()
    ]).finally(() => {
      this.isLoading = false; // Finish loading
    });
  }

  private loadProductos(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.apiService.getProductos().subscribe(
        (response: any) => {
          this.productos = response.$values || response;
          resolve();
        },
        error => {
          console.error('Error al cargar productos:', error);
          this.errorMessage = 'No se pudieron cargar los productos. Verifica tu conexión o la API.';
          this.productos = []; // Clear products on error
          reject(error);
        }
      );
    });
  }

  private loadCategorias(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.apiService.getCategorias().subscribe(
        (response: any) => {
          this.categorias = [{ id: 0, nombre: 'Todas las categorías' }, ...(response.$values || response)];
          resolve();
        },
        error => {
          console.error('Error al cargar categorías:', error);
          this.errorMessage = 'No se pudieron cargar las categorías.';
          this.categorias = [{ id: 0, nombre: 'Todas las categorías' }]; // Keep "All" option
          reject(error);
        }
      );
    });
  }

  private loadMarcas(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.apiService.getMarcas().subscribe(
        (response: any) => {
          this.marcas = [{ id: 0, nombre: 'Todas las marcas' }, ...(response.$values || response)];
          resolve();
        },
        error => {
          console.error('Error al cargar marcas:', error);
          this.errorMessage = 'No se pudieron cargar las marcas.';
          this.marcas = [{ id: 0, nombre: 'Todas las marcas' }]; // Keep "All" option
          reject(error);
        }
      );
    });
  }

  onSearchChange(): void {
    // Trigger search/filter only after a short delay to avoid excessive API calls
    // (Optional: use RxJS debounceTime for more advanced control)
    if (this.searchTerm.length >= 2 || this.searchTerm === '') {
      this.applyFiltersAndSearch();
    }
  }

  onFilterChange(): void {
    this.applyFiltersAndSearch();
  }

  applyFiltersAndSearch(): void {
    this.errorMessage = null; // Clear errors
    this.isLoading = true;    // Indicate loading

    const categoriaId = this.selectedCategory?.id !== 0 ? this.selectedCategory?.id : undefined;
    const marcaId = this.selectedBrand?.id !== 0 ? this.selectedBrand?.id : undefined;

    // If there's a search term, use buscarProductos, which can combine with filters
    if (this.searchTerm) {
      this.apiService.buscarProductos(this.searchTerm).subscribe(
        (response: any) => {
          this.productos = response.$values || response;
          this.isLoading = false;
        },
        error => {
          console.error('Error al buscar productos:', error);
          this.errorMessage = 'Error al buscar productos. Intenta de nuevo.';
          this.productos = [];
          this.isLoading = false;
        }
      );
    } else {
      // If no search term, just apply filters
      this.apiService.filtrarProductos(categoriaId, marcaId).subscribe(
        (response: any) => {
          this.productos = response.$values || response;
          this.isLoading = false;
        },
        error => {
          console.error('Error al filtrar productos:', error);
          this.errorMessage = 'Error al filtrar productos. Intenta de nuevo.';
          this.productos = [];
          this.isLoading = false;
        }
      );
    }
  }
}
