// store/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string;
  role: string;
  department?: string;
  token: string | null;
}

const initialState: UserState = {
  id: "",
  role: "",
  department: "",
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.role = action.payload.role;
      state.department = action.payload.department || "";
      state.token = action.payload.token;
    },
    clearUser: (state) => {
      state.id = "";
      state.role = "";
      state.department = "";
      state.token = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
