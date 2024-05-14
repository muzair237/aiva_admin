import { createSlice } from '@reduxjs/toolkit';
import questionThunk from './thunk';

const initialState = {
  questions: {},
  isLoading: false,
  errorMsg: '',
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // GET ALL ADMINS
      .addCase(questionThunk.getAllQuestions.pending, state => {
        state.isLoading = true;
      })
      .addCase(questionThunk.getAllQuestions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.questions = action?.payload;
      })
      .addCase(questionThunk.getAllQuestions.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMsg = action?.error?.message;
      });
  },
});

export default adminSlice.reducer;
