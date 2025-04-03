import React, { useRef } from 'react';
import { AppStore, makeStore } from './redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import { Provider } from 'react-redux';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
    setupListeners(storeRef.current.dispatch);
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default Providers;
