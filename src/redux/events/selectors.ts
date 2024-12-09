import { RootState } from '../store';

export const selectEvents = (state: RootState) => state.events.events;

export const selectTopEvents = (state: RootState) => state.events.topEvents;

export const selectCurrentEvent = (state: RootState) => state.events.currentEvent;