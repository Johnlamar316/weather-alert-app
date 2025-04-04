import { combineReducers, configureStore, Middleware } from '@reduxjs/toolkit';
import globalReducer from './index';
import { api } from './api';

/* CUSTOM Middleware */
const loggerMiddleware: Middleware = (storeAPI) => (next) => (action) => {
  const actionType = action as { type: string };
  console.group(`Action: ${actionType.type}`);
  console.log('%c Previous State:', 'color: red', storeAPI.getState());
  console.log('%c Dispatching:', 'color: yellow', action);
  const result = next(action);
  console.log('%c Next State:', 'color: orange', storeAPI.getState());
  console.groupEnd();
  return result;
};

/* REDUX STORE */
const rootReducer = combineReducers({
  global: globalReducer,
  [api.reducerPath]: api.reducer,
});

export const makeStore = () => {
  const middleware = [api.middleware];

  if (import.meta.env.MODE !== 'production') {
    middleware.push(loggerMiddleware);
  }

  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(middleware),
  });
};

/* REDUX TYPES */
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
