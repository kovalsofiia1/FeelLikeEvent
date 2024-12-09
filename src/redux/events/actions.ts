import { axiosInst } from "@/src/api/axiosSetUp";
import { API_URL } from "@env";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch events
export const fetchEvents = createAsyncThunk("events/fetchEvents", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInst.get(`${API_URL}/events`);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Failed to fetch events");
  }
});

// Get Event by ID
export const getEventById = createAsyncThunk(
  "events/getEventById",
  async (eventId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInst.get(`/events/${eventId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue("Unable to fetch event details");
    }
  }
);

// Save/Unsave Event
export const saveEvent = createAsyncThunk(
  "events/saveEvent",
  async ({ eventId, isSaved }: { eventId: string; isSaved: boolean }, { rejectWithValue }) => {
    try {
      if (isSaved) {
        await axiosInst.delete(`/bookmark/${eventId}`);
      } else {
        await axiosInst.post(`/bookmark/${eventId}`, {});
      }
      return { eventId, isSaved: !isSaved };
    } catch {
      return rejectWithValue(isSaved ? "Failed to unsave the event" : "Failed to save the event");
    }
  }
);

// Book/Unbook Event
export const bookEvent = createAsyncThunk(
  "events/bookEvent",
  async ({ eventId_, isBooked }: { eventId_: string; isBooked: boolean }, { rejectWithValue }) => {
    let booking;
    try {
      if (isBooked) {
        await axiosInst.delete(`/event/${eventId_}/book`);
        return null
      } else {
        booking = await axiosInst.post(`/event/${eventId_}/book`, {});
      }
      const { _id, tickets, eventId } = booking.data.booking
      return { _id, tickets, eventId };
    } catch {
      return rejectWithValue(isBooked ? "Failed to unbook the event" : "Failed to book the event");
    }
  }
);

// Like/Unlike Event
export const likeEvent = createAsyncThunk(
  "events/likeEvent",
  async ({ eventId, isLiked }: { eventId: string; isLiked: boolean }, { rejectWithValue }) => {
    try {
      if (isLiked) {
        await axiosInst.delete(`/like/${eventId}`);
      } else {
        await axiosInst.post(`/like/${eventId}`, {});
      }
      return { eventId, isLiked: !isLiked };
    } catch {
      return rejectWithValue(isLiked ? "Failed to unlike the event" : "Failed to like the event");
    }
  }
);