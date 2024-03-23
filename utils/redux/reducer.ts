import { TypedUseSelectorHook, useSelector } from "react-redux";
import { combineReducers } from "redux";
import UserReducer from "./slice/user.slice";


const rootReducer = combineReducers({
    user: UserReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default rootReducer;
