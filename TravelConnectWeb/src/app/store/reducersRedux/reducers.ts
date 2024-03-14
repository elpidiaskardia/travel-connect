import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import * as actions from "../actionsRedux/actions";

export interface RequestEntry {
  origin: string;
  destination: string;
  data: any | null;
}

export interface DataState {
  history: RequestEntry[];
}

export const initialState: DataState = {
  history: []
};

export const apiReducer = createReducer(
  initialState,
  on(actions.fetchSuccess, (state, { origin, destination, data }) => ({
    ...state,
    currentRequest: null,
    history: [...state.history, { origin, destination, data }]
  }))
);

export const selectDataState = createFeatureSelector<DataState>('journey');

export const selectCurrentRequest = createSelector(
  selectDataState,
  (state: DataState) => state.history
);

