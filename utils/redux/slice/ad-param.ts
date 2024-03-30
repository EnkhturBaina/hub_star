import { IAdParam } from '@/interfaces/request.interface';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: IAdParam = { page: 1, limit: 10, order: 'DESC' };
const adParam = createSlice({
  name: 'ad-param',
  initialState,
  reducers: {
    emptyAdParam: () => {
      return initialState;
    },
    setAdParam: (state, action: PayloadAction<IAdParam>) => {
      state = action.payload;
      return action.payload;
    },
  },
});
export const { emptyAdParam, setAdParam } = adParam.actions;
export default adParam.reducer;
