import { createSlice } from '@reduxjs/toolkit';
import roleThunk from './thunk';

const initialState = {
  roles: {},
  permissions: [],
  isLoading: false,
  errorMsg: '',
};

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // GET ALL ROLES
      .addCase(roleThunk.getAllRoles.pending, state => {
        state.isLoading = true;
      })
      .addCase(roleThunk.getAllRoles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.roles = action?.payload;
      })
      .addCase(roleThunk.getAllRoles.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMsg = action?.error?.message;
      })

      // GET UNIQUE PARENTS
      .addCase(roleThunk.getUniqueParents.fulfilled, (state, action) => {
        state.permissions = action?.payload;
      })
      .addCase(roleThunk.getUniqueParents.rejected, (state, action) => {
        state.errorMsg = action?.error?.message;
      })

      // CREATE PERMISSION
      .addCase(roleThunk.createPermission.pending, state => {
        state.isLoading = true;
      })
      .addCase(roleThunk.createPermission.fulfilled, (state, action) => {
        state.isLoading = false;
      })

      .addCase(roleThunk.createPermission.rejected, (state, action) => {
        state.errorMsg = action?.error?.message;
        state.isLoading = false;
      })

      // DELETE PERMISSION
      .addCase(roleThunk.deletePermission.pending, state => {
        state.isLoading = true;
      })
      .addCase(roleThunk.deletePermission.fulfilled, (state, action) => {
        state.isLoading = false;
      })

      .addCase(roleThunk.deletePermission.rejected, (state, action) => {
        state.errorMsg = action?.error?.message;
        state.isLoading = false;
      });
  },
});

export default roleSlice.reducer;
