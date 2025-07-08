import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component'; // Crearás este componente
import { ProductGalleryComponent } from './components/product-gallery/product-gallery.component'; // Crearás este componente

export const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }, // Redirige la ruta raíz a /inicio
  { path: 'inicio', component: HomeComponent },
  { path: 'productos', component: ProductGalleryComponent },
  // Opcional: Ruta para productos individuales si lo necesitas
  // { path: 'productos/:id', component: ProductDetailComponent },
  { path: '**', redirectTo: '/inicio' } // Ruta comodín para cualquier otra URL (puedes crear un 404 page)
];
