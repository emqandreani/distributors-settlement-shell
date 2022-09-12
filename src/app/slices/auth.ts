import { createSlice, createSelector } from "@reduxjs/toolkit";

export interface authState {
  authenticated: boolean;
  idToken: null | string;
}

const initialState: authState = {
  authenticated: false,
  idToken: null,
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
      state.idToken = null;
    },
    setIdToken: (state, action) => {
      state.idToken = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, setIdToken } = authSlice.actions;

export default authSlice.reducer;

const select = (state: any) => state.auth;

export const selectAuth = createSelector(select, (state) => state.authenticated);
