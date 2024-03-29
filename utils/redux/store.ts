import { configureStore } from "@reduxjs/toolkit";
import { createTransform, persistReducer, persistStore } from "redux-persist";
import { EncryptorConfig } from "redux-persist-transform-encrypt";
import thunkMiddleware from "redux-thunk";
import reducers from "./reducer";
const encryptionKey = process.env.NEXT_PUBLIC_REDUX_SECRET_KEY;
const encryptor = createTransform(
  (inboundState, key) => {
    return encryptor(inboundState, encryptionKey);
  },
  (outboundState, key) => {
    return encryptor(outboundState, encryptionKey);
  },
);
const persistConfig = {
  key: "root",
  storage: localStorage,
  whitelist: ["ad-param"],
  blacklist: [],
  transforms: [encryptor],
};
const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
  reducer: persistedReducer,
  // middleware: [thunkMiddleware],
});
const persistor = persistStore(store);
export { persistor, store };
export type AppDispatch = typeof store.dispatch;
