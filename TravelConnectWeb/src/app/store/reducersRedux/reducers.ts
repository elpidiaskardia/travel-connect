import { createReducer, createSelector, on } from "@ngrx/store";
import * as actions from "../actionsRedux/actions";

export interface ApiState {
  history: { [key: string]: any };
}

export const initialState: ApiState = {
  history: {},
};

export const apiReducer = createReducer(
  initialState,
  on(actions.fetchSuccess, (state, { origin, destination, data }) => (
    {
    ...state,
    history: {
      ...state.history,
      [`${origin}_${destination}`]: data,
    },
  }))
);
export const selectApiState = (state: { api: ApiState }) => state.api;

export const selectHistory = createSelector(
  selectApiState,
  (state: ApiState) => state.history
);