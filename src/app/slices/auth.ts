import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";

export interface AuthInitialStateProps {
  authenticated: boolean;
  idToken: null | string;
}

const initialState: AuthInitialStateProps = {
  authenticated: false,
  idToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthtenticated: (state: AuthInitialStateProps, action: PayloadAction<boolean>) => {
      state.authenticated = action.payload;
    },
    setIdToken: (state, action) => {
      state.idToken = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIdToken, setAuthtenticated } = authSlice.actions;

export default authSlice.reducer;

const select = (state: any) => state.auth;

export const selectAuth = createSelector(select, (state) => state.authenticated);
