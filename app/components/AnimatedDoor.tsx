// app/components/AnimatedDoor.jsx
'use client';

import { useState } from 'react';
import { Door } from './Door';

export default function AnimatedDoor() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDoor = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="cursor-pointer"
      onClick={toggleDoor}
    >
      <Door isOpen={isOpen} />
    </div>
  );
}