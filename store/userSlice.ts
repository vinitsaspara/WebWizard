import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string;
  name: string;
  email: string;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  id: "",
  name: "",
  email: "",
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user", 
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Omit<UserState, "isLoggedIn">>) => {
      // Merge payload into state
      Object.assign(state, action.payload);
      state.isLoggedIn = true;
    },
    clearUser: (state) => {
      state.id = "";
      state.name = "";
      state.email = "";
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
