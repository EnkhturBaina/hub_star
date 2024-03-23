import { Users } from "@/types/user";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
const initialState: Users = {};
const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    emptyUser: () => {
      return initialState;
    },
    setUser: (state, action: PayloadAction<Users>) => {
      state = action.payload;
      return action.payload;
    },
  },
});
export const { emptyUser, setUser } = user.actions;
export default user.reducer;
