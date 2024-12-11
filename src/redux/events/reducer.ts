import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";;
import { Event, EventComment } from "./types";
import { bookEvent, commentEvent, fetchEvents, getEventById, likeEvent, saveEvent } from "./actions";

interface EventState {
  events: Event[]; // Replace with proper event type
  topEvents: Event[];
  currentEvent: Event | null;
  currentEventComments: EventComment[];
  loading: boolean;
  error: string | null;
}

const initialState: EventState = {
  events: [],
  topEvents: [],
  currentEvent: null,
  currentEventComments: [],
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
      .addCase(getEventById.fulfilled, (state, action: PayloadAction<{ event: Event, comments: EventComment[] }>) => {
        state.currentEvent = action.payload.event;
        state.currentEventComments = [];
        state.currentEventComments = action.payload.comments;
        state.loading = false;
      })
      .addCase(getEventById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(saveEvent.fulfilled, (state, action: PayloadAction<{ eventId: string; isSaved: boolean }>) => {
        if (state.currentEvent && state.currentEvent._id === action.payload.eventId) {
          state.currentEvent = {
            ...state.currentEvent,
            isSaved: action.payload.isSaved
          };
        }
      })

      .addCase(bookEvent.fulfilled, (state, action: PayloadAction<{ _id: string; tickets: number, eventId: string } | null>) => {
        if (!action.payload) {
          if (state.currentEvent) {
            state.currentEvent.availableSeats += state.currentEvent.booking?.tickets || 0;
            state.currentEvent.booking = null;
          }
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
      })
      .addCase(commentEvent.fulfilled, (state, action: PayloadAction<{ comment: EventComment }>) => {
        if (state.currentEvent && state.currentEvent._id === action.payload.comment.eventId) {
          // Here we expect the payload to be { comment: EventComment }
          state.currentEventComments = [action.payload.comment, ...state.currentEventComments];
        }
      });

  },
});

export default eventSlice.reducer;
