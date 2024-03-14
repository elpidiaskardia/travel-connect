import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, switchMap, tap, } from 'rxjs';
import { ApiState } from '../../store/reducersRedux/reducers';
import { Store } from '@ngrx/store';
import * as actions from "../../store/actionsRedux/actions";

@Injectable({
  providedIn: 'root'
})
export class JourneyService {

  constructor(private httpClient: HttpClient, private store: Store<ApiState>) {}

  getData(origin : string, destination: string): Observable<any> {
    return this.httpClient.get(`/api/getJourney/${origin}/${destination}`);
  }

  // getData(origin: string, destination: string): Observable<any> {
  //   const key = `${origin}_${destination}`;
  //   const cachedData = this.store.select(state => state.history);
  //   return this.store.select(state => state.history).pipe(
  //     switchMap(history => {
  //       if (!history) {
  //         return of(null);
  //       }
  //       const cachedData = history[key];
  //       if (cachedData) {
  //         return of(cachedData);
  //       } else {
  //         return this.httpClient.get(`/api/getJourney/${origin}/${destination}`).pipe(
  //           tap(response => {
  //             this.store.dispatch(actions.fetchSuccess({ origin, destination, data: response }));
  //           }),
  //           catchError(error => {
  //             this.store.dispatch(actions.fetchFailure({ error }));
  //             return of(null);
  //           })
  //         );
  //       }
  //     })
  //   );
  // }
}