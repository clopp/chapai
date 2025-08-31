// src/hooks/useSplashProgress.ts
import {useEffect, useState} from 'react';

export function useSplashProgress(
  isModelLoaded: boolean,
  duration = 2000,
  step = 50,
) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // si el modelo aún NO está cargado, el progreso se limita al 80%
      if (!isModelLoaded && current >= 80) {
        return;
      }

      // si el modelo YA está cargado, avanza hasta 100%
      if (isModelLoaded && current < 100) {
        current += 5;
      } else {
        current += 100 / (duration / step);
      }

      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setDone(true);
      }
      setProgress(Math.floor(current));
    }, step);

    return () => clearInterval(interval);
  }, [isModelLoaded, duration, step]);

  return {progress, done};
}
