// src/screens/ScanScreen.tsx
import React, {useState} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Camera} from 'react-native-vision-camera';
import {useCameraHandler} from '../hooks/useCameraHandler';
import {useTFLite} from '../hooks/useTFLite';
import ScanButton from '../components/ScanButton';
import ResultCard from '../components/ResultCard';
import {COLORS} from '../theme';

export default function ScanScreen({navigation}: any) {
  const {camera, device, permission} = useCameraHandler();
  const {isModelLoaded, result, classify} = useTFLite();
  const [photo, setPhoto] = useState<string>();

  if (permission === 'denied') {
    return <Text>No tienes permisos de cámara</Text>;
  }

  if (!isModelLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="white" />
        <Text style={{color: 'white'}}>Cargando modelo...</Text>
      </View>
    );
  }

  const takePhoto = async () => {
    if (!device || !camera.current) {
      return;
    }
    const capture = await camera.current.takePhoto({flash: 'off'});
    const photoPath = `file://${capture.path}`;
    setPhoto(photoPath);
    classify(capture.path);
  };

  return (
    <View style={styles.container}>
      <View style={styles.decoration} />

      {!photo ? (
        <>
          {device && (
            <View style={styles.cameraWrapper}>
              <Camera
                ref={camera}
                style={styles.camera}
                device={device}
                isActive
                photo
              />
            </View>
          )}
          <Image
            source={require('../assets/images/scan_square.png')}
            style={styles.scanSquare}
          />
          <ScanButton onPress={takePhoto} />
        </>
      ) : (
        <>
          <Image source={{uri: photo}} style={styles.preview} />
          <ResultCard
            result={result}
            onNavigate={() => navigation.navigate('Gota')}
          />
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary.dark,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // 🎨 Fondo decorativo circular translúcido
  decoration: {
    width: 500,
    height: 500,
    borderRadius: 250,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    position: 'absolute',
    top: -250,
    transform: [{rotate: '60deg'}],
  },

  // 📷 Cámara dentro de un marco redondeado
  cameraWrapper: {
    width: '80%',
    height: '54%',
    minWidth: 330,
    minHeight: 400,
    overflow: 'hidden',
    borderRadius: 30,
    elevation: 5,
  },
  camera: {
    width: '100%',
    height: '100%',
  },

  // ⬛ Overlay de cuadrado de escaneo
  scanSquare: {
    width: '70%',
    height: '70%',
    minWidth: 290,
    minHeight: 440,
    resizeMode: 'contain',
    position: 'absolute',
    top: 60,
    zIndex: 10,
    alignSelf: 'center',
  },

  // 🔘 Botón flotante inferior
  takePhotoButton: {
    position: 'absolute',
    bottom: 20,
    elevation: 3,
  },

  // 🖼️ Imagen de previsualización
  preview: {
    width: '80%',
    height: '70%',
    borderRadius: 10,
    marginTop: 20,
  },

  // ⏳ Estado cargando modelo
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary.dark,
  },
});
