import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Importa el objeto 'environment'

// Define interfaces para tus modelos de backend (ahora reflejando los DTOs)
export interface Categoria { // Esta interfaz ya es correcta para CategoriaDto
  id: number;
  nombre: string;
}

export interface Marca { // Esta interfaz ya es correcta para MarcaDto
  id: number;
  nombre: string;
  logoUrl?: string; // Asegúrate de que coincida con tu MarcaDto si tiene LogoUrl
}

// ¡IMPORTANTE! Actualiza esta interfaz para que coincida con tu ProductoDto
export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagenUrl: string;
  marcaId: number;
  categoriaId: number;
  marcaNombre?: string; // Ahora es una propiedad directa del DTO
  categoriaNombre?: string; // Ahora es una propiedad directa del DTO
  tallaColorInfo?: string; // Propiedades opcionales del DTO
  sabor?: string;
  contenido?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.endPoint;

  constructor(private http: HttpClient) { }

  // Métodos para Productos
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}Productos`);
  }

  getProductoById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}Productos/${id}`);
  }

  buscarProductos(nombre: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}Productos/buscar?nombre=${nombre}`);
  }

  filtrarProductos(categoriaId?: number, marcaId?: number): Observable<Producto[]> {
    let params = new URLSearchParams();
    if (categoriaId && categoriaId !== 0) { // Añadido check para 0 si 0 significa "todas"
      params.append('categoriaId', categoriaId.toString());
    }
    if (marcaId && marcaId !== 0) { // Añadido check para 0 si 0 significa "todas"
      params.append('marcaId', marcaId.toString());
    }
    return this.http.get<Producto[]>(`${this.apiUrl}Productos/filtrar?${params.toString()}`);
  }

  // Métodos para Categorías
  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}Categorias`);
  }

  // Métodos para Marcas
  getMarcas(): Observable<Marca[]> {
    return this.http.get<Marca[]>(`${this.apiUrl}Marcas`);
  }
}
