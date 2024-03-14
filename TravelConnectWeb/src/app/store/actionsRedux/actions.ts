import { createAction, props } from "@ngrx/store";

export const fetchRequest = createAction('[API] Fetch Request', props<{ origin: string, destination: string }>());
export const fetchSuccess = createAction('[API] Fetch Success', props<{ origin: string, destination: string, data: any }>());
