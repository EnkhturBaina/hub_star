import { IAdParam } from '@/interfaces/request.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const initialState: IAdParam = {
  order: 'DESC',
  page: 1,
  limit: 10,
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
  },
});
export const { emptyAdvParam, setAdvParam } = advParamSlice.actions;

export default advParamSlice.reducer;
