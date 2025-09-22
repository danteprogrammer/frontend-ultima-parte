import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; 
import { ReactiveFormsModule } from '@angular/forms';
import { tokenInterceptor } from './shared/token-interceptor';
import { errorInterceptor } from './shared/error-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([tokenInterceptor,errorInterceptor]) 
    ),
    ReactiveFormsModule
  ]
};
