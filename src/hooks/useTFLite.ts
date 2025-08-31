import {useEffect, useState, useCallback} from 'react';
import TFLiteService from '../services/TFLiteService';
import {prepareModelFiles} from '../services/FileSystemService';
import {ClassificationResult} from '../types/tflite';

export function useTFLite() {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [result, setResult] = useState<ClassificationResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Inicializar modelo
  useEffect(() => {
    const loadModel = async () => {
      try {
        await prepareModelFiles();

        await TFLiteService.loadModel(
          '/Model/potato_classifier_paratrioza.tflite',
          '/Model/labels.txt',
        );
        // 👇 delay artificial de 1.5 segundos antes de habilitar la UI
        setTimeout(() => {
          setIsModelLoaded(true);
        }, 1500);
      } catch (e) {
        console.error('❌ Error cargando modelo:', e);
        setError('No se pudo cargar el modelo');
      }
    };

    loadModel();
  }, []);

  // Clasificar imagen
  const classify = useCallback(async (path: string) => {
    try {
      setError(null);
      setResult(null); // limpiar resultado previo
      const predictions = await TFLiteService.classifyImage(path, 5, 0.05);
      setResult(predictions);
    } catch (e) {
      console.error('❌ Error clasificando:', e);
      setError('No se pudo procesar la imagen');
    }
  }, []);

  return {isModelLoaded, result, classify, error};
}
