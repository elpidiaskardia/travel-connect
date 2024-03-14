import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, switchMap, tap, } from 'rxjs';
import { DataState, RequestEntry } from '../../store/reducersRedux/reducers';
import { Store, select } from '@ngrx/store';
import * as actions from "../../store/actionsRedux/actions";

@Injectable({
  providedIn: 'root'
})
export class JourneyService {

  constructor(private httpClient: HttpClient, private store: Store<{ data: DataState }>) { }

  // getData(origin : string, destination: string): Observable<any> {
  //   return this.httpClient.get(`/api/getJourney/${origin}/${destination}`);
  // }

  getRequestEntryByOriginAndDestination(origin: string, destination: string): Observable<RequestEntry | undefined> {
    return this.store.pipe(
      select('data'),
      map((dataState: DataState) => {
        const entry = dataState.history.find(entry => entry.origin === origin && entry.destination === destination);
        return entry;
      })
    );
  }

  getData(origin: string, destination: string): Observable<any> {
    return this.getRequestEntryByOriginAndDestination(origin, destination).pipe(
      switchMap((entry) => {
        if (entry) {
          return of(entry.data);
        } else {
          return this.httpClient.get(`/api/getJourney/${origin}/${destination}`).pipe(
            tap(response => {
              this.store.dispatch(actions.fetchSuccess({ origin, destination, data: response }));
            })
          );
        }
      })
    );
  }
}