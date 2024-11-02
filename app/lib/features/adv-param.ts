import { IAdParam } from '@/interfaces/request.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const initialState: IAdParam = {
  order: 'DESC',
  page: 1,
  limit: 10,
  process: 'CREATED',
};
export const advParamSlice = createSlice({
  name: 'AdvParam',
  initialState,
  reducers: {
    emptyAdvParam: () => {
      return initialState;
    },
    setAdvParam: (state, action: PayloadAction<IAdParam>) => {
      state = action.payload;
      console.log('is working redux', state);
      return state;
    },
    setNotfParam: (state, action: PayloadAction<any>) => {
      state.notification = action.payload.notification;
      return state;
    },
  },
});
export const { emptyAdvParam, setAdvParam, setNotfParam } = advParamSlice.actions;

export default advParamSlice.reducer;
