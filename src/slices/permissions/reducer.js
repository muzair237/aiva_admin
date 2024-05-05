import { createSlice } from '@reduxjs/toolkit';
import permissionThunk from './thunk';

const initialState = {
  permissions: {},
  parents: [],
  isLoading: false,
  errorMsg: '',
};

const permissionSlice = createSlice({
  name: 'permission',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // GET ALL PERMISSIONS
      .addCase(permissionThunk.getAllPermissions.pending, state => {
        state.permissions = {};
        state.parents = [];
        state.errorMsg = '';
        state.isLoading = true;
      })
      .addCase(permissionThunk.getAllPermissions.fulfilled, (state, action) => {
        state.permissions = action?.payload;
        // state.parents = ac;
        state.errorMsg = '';
        state.isLoading = false;
      })
      .addCase(permissionThunk.getAllPermissions.rejected, (state, action) => {
        state.permissions = {};
        state.parents = [];
        state.errorMsg = action?.error?.message;
        state.isLoading = false;
      })

      // GET UNIQUE PARENTS
      .addCase(permissionThunk.getUniqueParents.pending, state => {
        state.parents = [];
        state.errorMsg = '';
        state.isLoading = true;
      })
      .addCase(permissionThunk.getUniqueParents.fulfilled, (state, action) => {
        state.parents = action?.payload;
        state.errorMsg = '';
        state.isLoading = false;
      })
      .addCase(permissionThunk.getUniqueParents.rejected, (state, action) => {
        state.parents = [];
        state.errorMsg = action?.error?.message;
        state.isLoading = false;
      });
  },
});

export default permissionSlice.reducer;
