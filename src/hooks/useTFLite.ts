// src/hooks/useTFLite.ts
import {useEffect, useState} from 'react';
import {prepareModelFiles} from '../services/FileSystemService';
import TFLiteService from '../services/TFLiteService';

export function useTFLite() {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [result, setResult] = useState<{
    label: string;
    confidence: number;
  } | null>(null);

  useEffect(() => {
    const init = async () => {
      const ready = await prepareModelFiles();
      if (ready) {
        try {
          await TFLiteService.loadModel(
            '/Model/potato_classifier_paratrioza.tflite',
            '/Model/labels.txt',
          );
          setIsModelLoaded(true);
        } catch (e) {
          setIsModelLoaded(false);
        }
      }
    };

    init();

    return () => {
      TFLiteService.close();
    };
  }, []);

  const classify = async (photoPath: string) => {
    if (!isModelLoaded) {
      return;
    }
    try {
      const res = await TFLiteService.classifyImage(photoPath);
      if (res && res.length > 0) {
        setResult(res[0]);
      }
    } catch (e) {
      console.error('Error en clasificación:', e);
    }
  };

  return {isModelLoaded, result, classify};
}
