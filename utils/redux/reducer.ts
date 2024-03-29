import { TypedUseSelectorHook, useSelector } from "react-redux";
import { combineReducers } from "redux";
import AdParamReducer from "./slice/ad-param";

const rootReducer = combineReducers({
  adParam: AdParamReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default rootReducer;
