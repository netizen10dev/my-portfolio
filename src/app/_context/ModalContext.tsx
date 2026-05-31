"use client";

import { createContext, useContext, useState } from "react";

type ModalCtx = {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalCtx>({
  open: false,
  openModal: () => {},
  closeModal: () => {},
});

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <ModalContext.Provider value={{ open, openModal: () => setOpen(true), closeModal: () => setOpen(false) }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
