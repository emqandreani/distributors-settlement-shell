import { createSlice, createSelector } from "@reduxjs/toolkit";

export interface authState {
  authenticated: boolean;
}

const initialState: authState = {
  authenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.authenticated = true;
    },
    logout: (state) => {
      state.authenticated = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

const select = (state: any) => state.auth;

export const selectAuth = createSelector(select, (state) => state.authenticated);
