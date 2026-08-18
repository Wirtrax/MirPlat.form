import { createSlice } from '@reduxjs/toolkit';

const initialState: { superAdmin: boolean } = {
  superAdmin: false,
};

const superAdminSlice = createSlice({
  name: 'superAdmin',
  initialState,
  reducers: {
    setSuperAdmin: (state, action) => {
      state.superAdmin = action.payload;
      console.log('administrator has started work');
    },
    unsetSuperAdmin: (state) => {
      state.superAdmin = false;
      console.log('administrator has finished work');
    },
  },
});
export const { setSuperAdmin, unsetSuperAdmin } = superAdminSlice.actions;
export default superAdminSlice.reducer;
