import { createSlice } from "@reduxjs/toolkit";

interface RoleState {
  currentRole: "admin" | "user";
}

const initialState: RoleState = {
  currentRole: "user",
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.currentRole = action.payload;
    },
    resetRole: (state) => {
      state.currentRole = "user";
    },
  },
});

export const { setRole, resetRole } = roleSlice.actions;

export default roleSlice.reducer;
