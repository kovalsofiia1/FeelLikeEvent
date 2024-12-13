import { axiosInst } from "@/src/api/axiosSetUp";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { EventComment, User } from "./types";
import { isWeb } from "@/src/utils/storage";

// Async thunk to fetch events
export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async (params: {}, { rejectWithValue }) => {
    try {
      const response = await axiosInst.get(`/events`, { params });

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch events");
    }
  }
);

// Get Event by ID
export const getEventById = createAsyncThunk(
  "events/getEventById",
  async (eventId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInst.get(`/events/${eventId}`);

      const commentsresp = await axiosInst.get(`events/${eventId}/comments`)
      return { event: response.data, comments: commentsresp.data };
    } catch (error: any) {
      return rejectWithValue("Unable to fetch event details");
    }
  }
);

export const deleteEventById = createAsyncThunk(
  "events/deleteEventById",
  async (eventId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInst.delete(`/events/${eventId}`);
      return { eventId };
    } catch (error: any) {
      return rejectWithValue("Unable to delete event");
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
  async ({ eventId_, isBooked, data = {} }: { eventId_: string; isBooked: boolean, data: Object }, { rejectWithValue }) => {
    let booking;
    try {
      if (isBooked) {
        await axiosInst.delete(`/events/${eventId_}/book`);
        return null;
      } else {
        booking = await axiosInst.post(`/events/${eventId_}/book`, data);
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

export const commentEvent = createAsyncThunk(
  "events/commentEvent",
  async ({ eventId, text }: { eventId: string, text: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInst.post(`/events/${eventId}/comment`, { text });

      const comment = response.data.comment;

      return {
        comment: {
          userId: comment.userId,
          eventId: comment.eventId,
          text: comment.text,
          date: comment.date,
          _id: comment._id
        } as EventComment
      };
    } catch {
      return rejectWithValue("Failed to comment the event");
    }
  }
);


export const changeEventStatus = createAsyncThunk(
  "events/changeEventStatus",
  async ({ eventId, action }: { eventId: string, action: "decline" | "verify" }, { rejectWithValue }) => {
    try {
      const response = await axiosInst.patch(`/events/${eventId}/${action}`);

      return response.data.event;
    } catch {
      return rejectWithValue("Failed to comment the event");
    }
  }
);