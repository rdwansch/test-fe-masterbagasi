'use client';

import { useEffect, useState } from 'react';

export default function useLocalStorage() {
  const [data, setData] = useState<string>('');
  useEffect(() => {
    setData(localStorage.getItem('cart') || '[]');
  }, []);

  return data;
}
