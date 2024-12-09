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
