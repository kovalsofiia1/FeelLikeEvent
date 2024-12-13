import { RootState } from "../store";

export const selectEvents = (state: RootState) => state.admin.events;

export const selectUsers = (state: RootState) => state.admin.users;

