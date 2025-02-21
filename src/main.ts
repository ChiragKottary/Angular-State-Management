import { bootstrapApplication } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { productReducer } from './app/store/product.reducer';
import { ProductEffects } from './app/store/product.effects';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideStore({ products: productReducer }),
    provideStoreDevtools(),
    provideEffects([ProductEffects]),
    provideHttpClient()
  ]
}).catch(err => console.error(err));