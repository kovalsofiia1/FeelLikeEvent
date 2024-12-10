import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";;
import { Event } from "./types";
import { bookEvent, fetchEvents, getEventById, likeEvent, saveEvent } from "./actions";

interface EventState {
  events: Event[]; // Replace with proper event type
  topEvents: Event[];
  currentEvent: Event | null;
  loading: boolean;
  error: string | null;
}

const initialState: EventState = {
  events: [],
  topEvents: [],
  currentEvent: null,
  loading: false,
  error: null,
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.events = action.payload;
        state.loading = false;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Get Event By ID
      .addCase(getEventById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEventById.fulfilled, (state, action: PayloadAction<Event>) => {
        state.currentEvent = action.payload;
        state.loading = false;
      })
      .addCase(getEventById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Save/Unsave Event
      .addCase(saveEvent.fulfilled, (state, action: PayloadAction<{ eventId: string; isSaved: boolean }>) => {
        if (state.currentEvent && state.currentEvent._id === action.payload.eventId) {
          state.currentEvent = {
            ...state.currentEvent,
            isSaved: action.payload.isSaved
          };
        }
      })

      // Book/Unbook Event
      .addCase(bookEvent.fulfilled, (state, action: PayloadAction<{ _id: string; tickets: number, eventId: string } | null>) => {
        if (!action.payload) {
          return;
        }
        if (state.currentEvent && state.currentEvent._id === action.payload.eventId) {
          state.currentEvent = {
            ...state.currentEvent,
            booking: {
              bookingId: action.payload._id,
              tickets: action.payload.tickets
            }
          }
        }
      })

      // Like/Unlike Event
      .addCase(likeEvent.fulfilled, (state, action: PayloadAction<{ eventId: string; isLiked: boolean }>) => {
        if (state.currentEvent && state.currentEvent._id === action.payload.eventId) {
          state.currentEvent.isLiked = action.payload.isLiked;
        }
      });
  },
});

export default eventSlice.reducer;
