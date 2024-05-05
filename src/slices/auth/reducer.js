import { createSlice } from '@reduxjs/toolkit';
import authThunk from './thunk';

const initialState = {
  user: {},
  isLoggedIn: false,
  isLoading: false,
  errorMsg: '',
  allowedPages: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // LOGIN
      .addCase(authThunk.login.pending, state => {
        state.user = {};
        state.isLoggedIn = false;
        state.errorMsg = '';
        state.isLoading = true;
        state.allowedPages = [];
      })
      .addCase(authThunk.login.fulfilled, (state, action) => {
        state.user = action?.payload;
        state.isLoggedIn = true;
        state.errorMsg = '';
        state.isLoading = false;
        state.allowedPages = action?.payload?.allowedPages;
      })
      .addCase(authThunk.login.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.user = {};
        state.errorMsg = action?.error?.message;
        state.isLoading = false;
        state.allowedPages = [];
      })

      // LOGOUT
      .addCase(authThunk.logout.pending, state => {
        state.user = {};
        state.isLoggedIn = true;
        state.errorMsg = '';
        state.isLoading = true;
        state.allowedPages = [];
      })
      .addCase(authThunk.logout.fulfilled, state => {
        state.user = {};
        state.isLoggedIn = false;
        state.errorMsg = '';
        state.isLoading = false;
        state.allowedPages = [];
      })
      .addCase(authThunk.logout.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.user = {};
        state.errorMsg = action?.error?.message;
        state.isLoading = false;
        state.allowedPages = [];
      });
  },
});

export default authSlice.reducer;
