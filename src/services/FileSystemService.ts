// src/services/FileSystemService.ts
import RNFS from 'react-native-fs';

const MODEL_DIR = `${RNFS.DocumentDirectoryPath}/Model`;

export async function prepareModelFiles() {
  try {
    const exists = await RNFS.exists(MODEL_DIR);
    if (!exists) {
      await RNFS.mkdir(MODEL_DIR);
      await RNFS.copyFileAssets(
        'Model/plant-disease.tflite',
        `${MODEL_DIR}/plant-disease.tflite`,
      );
      await RNFS.copyFileAssets(
        'Model/plant-disease.txt',
        `${MODEL_DIR}/plant-disease.txt`,
      );
    }
    return true;
  } catch (error) {
    console.error('❌ Error preparando archivos del modelo:', error);
    return false;
  }
}
