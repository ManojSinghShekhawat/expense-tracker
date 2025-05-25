import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const authCheck = createAsyncThunk("auth/check", async (_, thunkAPI) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACK_END_URL}/user/authcheck`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    if (res.data.user) {
      return res.data.user;
    } else {
      return thunkAPI.rejectWithValue("Not authenticated");
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Not authenticated"
    );
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    loading: true,
    user: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authCheck.pending, (state) => {
        state.loading = true;
      })
      .addCase(authCheck.fulfilled, (state, action) => {
        if (action.payload) {
          state.isAuthenticated = true;
          state.user = action.payload;
        } else {
          state.isAuthenticated = false;
          state.user = null;
        }
        state.loading = false;
      })
      .addCase(authCheck.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.loading = false;
      });
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
