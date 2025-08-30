// src/services/FileSystemService.ts
import RNFS from 'react-native-fs';

const MODEL_DIR = `${RNFS.DocumentDirectoryPath}/Model`;

export async function prepareModelFiles() {
  try {
    const exists = await RNFS.exists(MODEL_DIR);
    if (!exists) {
      await RNFS.mkdir(MODEL_DIR);
      await RNFS.copyFileAssets(
        'Model/potato_classifier_paratrioza.tflite',
        `${MODEL_DIR}/potato_classifier_paratrioza.tflite`,
      );
      await RNFS.copyFileAssets('Model/labels.txt', `${MODEL_DIR}/labels.txt`);
    }
    return true;
  } catch (error) {
    console.error('❌ Error preparando archivos del modelo:', error);
    return false;
  }
}
