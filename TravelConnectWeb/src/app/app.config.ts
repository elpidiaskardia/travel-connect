import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideState, provideStore } from '@ngrx/store';
import { apiReducer } from './store/reducersRedux/reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideClientHydration(),
    provideStore(),
    provideState({name:'journey', reducer: apiReducer},
     )
  ]
};
