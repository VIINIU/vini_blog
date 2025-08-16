'use client';

import { useEffect } from 'react';
import { useRightBar } from '@/app/components/RightBarContext';

type Floor = { floor: string; label: string; targetId: string };

export default function SetRightBarClient({ floors }: { floors: Floor[] }) {
  const { setRightBar } = useRightBar();

  useEffect(() => {
    setRightBar("Short Cut", floors);
  }, [floors, setRightBar]);

  return null;
}

