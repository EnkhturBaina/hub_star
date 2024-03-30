import { configureStore } from '@reduxjs/toolkit';
import { createTransform, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { EncryptorConfig } from 'redux-persist-transform-encrypt';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducer';
const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
  reducer: persistedReducer,
  // middleware: [thunkMiddleware],
});
const persistor = persistStore(store);
export { persistor, store };
export type AppDispatch = typeof store.dispatch;
