// src/services/TFLiteService.ts
import {Tflite} from 'react-native-tflite-classification';
import {ClassificationResult} from '../types/tflite';

class TFLiteService {
  private tflite: Tflite;

  constructor() {
    this.tflite = new Tflite();
  }

  loadModel(modelPath: string, labelsPath: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.tflite.loadModel({modelPath, labelsPath}, (err, res) => {
        if (err) {
          console.error('❌ Error cargando modelo:', err);
          reject(err);
        } else {
          console.log('✅ Modelo cargado:', res);
          resolve(true);
        }
      });
    });
  }

  classifyImage(
    path: string,
    numResults = 5,
    threshold = 0,
  ): Promise<ClassificationResult[]> {
    return new Promise((resolve, reject) => {
      this.tflite.runModelOnImage(
        {path, numResults, threshold},
        (err: Error | null, res?: ClassificationResult[]) => {
          if (err) {
            console.error('❌ Error clasificando imagen:', err);
            reject(err);
          } else if (res) {
            console.log('resultados alsificacion', res);

            resolve(res);
          } else {
            reject(new Error('No se recibió resultado del modelo'));
          }
        },
      );
    });
  }
  close() {
    this.tflite.close();
  }
}

export default new TFLiteService();
