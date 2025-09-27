"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store, persistor } from "@/store";
import { PersistGate } from "redux-persist/integration/react";

interface Props {
  children: ReactNode;
}

export default function ReduxProvider({ children }: Props) {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>{children}</div>} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
