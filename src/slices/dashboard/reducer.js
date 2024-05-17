import { createSlice } from '@reduxjs/toolkit';
import dashboardThunk from './thunk';

const initialState = {
  dashboardCards: {},
  isLoading: false,
  errorMsg: '',
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // GET ALL DASHBOARD CARDS
      .addCase(dashboardThunk.getDashboardCards.pending, state => {
        state.isLoading = true;
      })
      .addCase(dashboardThunk.getDashboardCards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dashboardCards = action?.payload;
      })
      .addCase(dashboardThunk.getDashboardCards.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMsg = action?.error?.message;
      });
  },
});

export default dashboardSlice.reducer;
