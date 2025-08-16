'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Floor = { floor: string; label: string; targetId: string };

type RightBarContextType = {
  title: string;
  floors: Floor[];
  setRightBar: (title: string, floors: Floor[]) => void;
};

const RightBarContext = createContext<RightBarContextType | undefined>(undefined);

export function RightBarProvider({ children }: { children: ReactNode }) {
  const [title, setTitle] = useState("");
  const [floors, setFloors] = useState<Floor[]>([]);

  const setRightBar = (newTitle: string, newFloors: Floor[]) => {
    setTitle(newTitle);
    setFloors(newFloors);
  };

  return (
    <RightBarContext.Provider value={{ title, floors, setRightBar }}>
      {children}
    </RightBarContext.Provider>
  );
}

export function useRightBar() {
  const context = useContext(RightBarContext);
  if (!context) {
    throw new Error("useRightBar must be used within a RightBarProvider");
  }
  return context;
}
