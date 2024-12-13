import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";;
import { Event } from "../events/types";
import { User } from "../user/types";
import { changeEventStatus, changeUserStatus, fetchEvents, fetchUsers } from "./actions";

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
  users: {
    users: User[],
    pagination: {
      page: number,
      pageSize: number,
      totalPages: number,
      totalEvents: number,
    }
  }
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
  users: {
    users: [],
    pagination: {
      page: 0,
      pageSize: 6,
      totalEvents: 0,
      totalPages: 0
    }
  },
  loading: false,
  error: null,
};

const adminSlice = createSlice({
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
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(changeEventStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeEventStatus.fulfilled, (state, action: PayloadAction<Event>) => {
        const updatedEvent = action.payload;
        state.events.events = state.events.events.map(event =>
          event._id === updatedEvent._id ? { ...event, ...updatedEvent } : event
        );

        state.loading = false;
      })
      .addCase(changeEventStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(changeUserStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeUserStatus.fulfilled, (state, action: PayloadAction<User>) => {
        const updatedUser = action.payload;
        state.users.users = state.users.users.map(user =>
          user._id === updatedUser._id ? { ...user, ...updatedUser } : user
        );

        state.loading = false;
      })
      .addCase(changeUserStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

  },
});

export default adminSlice.reducer;
