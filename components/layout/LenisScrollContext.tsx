"use client";

import { createContext, useContext, type ReactNode } from "react";
import type Lenis from "lenis";

interface LenisContextValue {
  scrollY: number;
  lenis: Lenis | null;
}

const LenisContext = createContext<LenisContextValue>({ scrollY: 0, lenis: null });

export const useLenis = () => useContext(LenisContext);

/**
 * Provides current Lenis virtual-scroll position and instance to children.
 */
export function LenisScrollProvider({
  scrollY,
  lenis,
  children,
}: {
  scrollY: number;
  lenis: Lenis | null;
  children: ReactNode;
}) {
  return (
    <LenisContext.Provider value={{ scrollY, lenis }}>
      {children}
    </LenisContext.Provider>
  );
}
