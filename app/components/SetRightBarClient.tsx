'use client';

import { useEffect } from 'react';
import { useRightBar } from '@/app/components/RightBarContext';

type Floor = { floor: string; label: string; targetId: string };

type SetRightBarClientProps = {
  floors: Floor[];
  title?: string;
};

export default function SetRightBarClient({ floors, title = "Floor Guide" }: SetRightBarClientProps) {
  const { setRightBar } = useRightBar();

  useEffect(() => {
    setRightBar(title, floors);
  }, [floors, title, setRightBar]);

  return null;
}

