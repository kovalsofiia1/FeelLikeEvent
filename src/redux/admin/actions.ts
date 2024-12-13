import { axiosInst } from "@/src/api/axiosSetUp";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../user/types";

export const fetchEvents = createAsyncThunk(
  "admin/fetchEvents",
  async (params: {}, { rejectWithValue }) => {
    try {
      const response = await axiosInst.get(`/events`, { params: { ...params, status: 'ALL' } });

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch events");
    }
  }
);


export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (params: {}, { rejectWithValue }) => {
    try {
      const response = await axiosInst.get(`/user`, { params });

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch users");
    }
  }
);

export const changeEventStatus = createAsyncThunk(
  "admin/changeEventStatus",
  async ({ eventId, action }: { eventId: string, action: "decline" | "verify" }, { rejectWithValue }) => {
    try {
      const response = await axiosInst.patch(`/events/${eventId}/${action}`);

      return response.data.event;
    } catch {
      return rejectWithValue("Failed to update event status");
    }
  }
);

export const changeUserStatus = createAsyncThunk(
  "admin/changeUserStatus",
  async ({ userId, status }: { userId: string, status: User["status"] }, { rejectWithValue }) => {
    try {
      const response = await axiosInst.patch(`/user/${userId}/status`, { status });

      return response.data.user;
    } catch {
      return rejectWithValue("Failed to update user status");
    }
  }
);

