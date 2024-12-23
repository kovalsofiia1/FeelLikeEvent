import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";;
import { Event, EventComment } from "./types";
import { bookEvent, changeEventStatus, commentEvent, deleteEventById, fetchEvents, fetchTopEvents, getEventById, likeEvent, saveEvent } from "./actions";

interface EventState {
  events: {
    events: Event[],
    pagination: {
      page: number,
      pageSize: number,
      totalPages: number,
      totalEvents: number,
    }
  }; // Replace with proper event type
  topEvents: Event[];
  currentEvent: Event | null;
  currentEventComments: EventComment[];
  loading: boolean;
  error: string | null;
}

const initialState: EventState = {
  events: {
    events: [],
    pagination: {
      page: 0,
      pageSize: 6,
      totalEvents: 0,
      totalPages: 0
    }
  },
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
      .addCase(fetchTopEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopEvents.fulfilled, (state, action) => {
        state.topEvents = action.payload;
        state.loading = false;
      })
      .addCase(fetchTopEvents.rejected, (state, action) => {
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

      .addCase(deleteEventById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEventById.fulfilled, (state, action: PayloadAction<{ eventId: string }>) => {
        state.currentEvent = null;
        state.currentEventComments = [];
        state.loading = false;
      })
      .addCase(deleteEventById.rejected, (state, action) => {
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
          state.currentEventComments = [action.payload.comment, ...state.currentEventComments];
        }
      })
  },
});

export default eventSlice.reducer;
