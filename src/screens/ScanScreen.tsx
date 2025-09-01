// src/screens/ScanScreen.tsx
import React, {useState} from 'react';
import {View, Image, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {Camera} from 'react-native-vision-camera';
import {useCameraHandler} from '../hooks/useCameraHandler';
import {useTFLite} from '../hooks/useTFLite';
import {useSplashProgress} from '../hooks/useSplashProgress';
import ScanButton from '../components/ScanButton';
import ResultCard from '../components/ResultCard';
import {LoadingBar} from '../components/LoadingBar';
import {COLORS} from '../theme';

export default function ScanScreen() {
  const {camera, device, permission} = useCameraHandler();
  const {isModelLoaded, result, classify} = useTFLite();

  const [photo, setPhoto] = useState<string>();
  const [isCapturing, setIsCapturing] = useState(false);

  // hook sincronizado con el modelo
  const {progress, done} = useSplashProgress(isModelLoaded);

  // 📌 Caso 1: permisos denegados
  if (permission === 'denied') {
    return <Text>No tienes permisos de cámara</Text>;
  }

  // 📌 Caso 2: aún no está listo (loading + barra)
  if (!done) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingBar progress={progress} />
      </View>
    );
  }

  // 📌 Captura de foto
  const takePhoto = async () => {
    if (!device || !camera.current) {
      console.warn('No se encontró cámara en el dispositivo');
      return;
    }
    try {
      setIsCapturing(true);
      const capture = await camera.current.takePhoto({flash: 'off'});
      const photoPath = `file://${capture.path}`;
      setPhoto(photoPath);
      classify(capture.path);
    } catch (e) {
      console.error('Error al tomar foto:', e);
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.decoration} />

      <Text style={styles.infoText}>
        {photo ? 'Planta escaneada' : 'Toma una foto para escanear la planta'}
      </Text>

      <View style={styles.cameraContainer}>
        {/* 📌 Caso 3A: Vista de resultado */}
        {photo && result ? (
          <>
            <Image source={{uri: photo}} style={styles.previewImage} />
            <ResultCard result={result} onReset={() => setPhoto(undefined)} />
          </>
        ) : (
          <>
            {/* 📌 Cámara dentro de un frame */}
            <View style={styles.cameraFrame}>
              {device && (
                <Camera
                  ref={camera}
                  style={styles.camera}
                  device={device}
                  isActive={!photo}
                  photo
                />
              )}
            </View>

            {/* 📌 Cuadrícula de escaneo */}
            <Image
              source={require('../assets/images/scan_square.png')}
              style={styles.scanSquare}
            />

            {/* 📌 Overlay de captura */}
            {isCapturing && (
              <View style={styles.capturingOverlay}>
                <ActivityIndicator size="large" color="white" />
                <Text style={{color: 'white', marginTop: 10}}>
                  Procesando foto...
                </Text>
              </View>
            )}

            {/* 📌 Botón de escaneo */}
            {!isCapturing && <ScanButton onPress={takePhoto} />}
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary.dark,
  },
  decoration: {
    width: 500,
    height: 500,
    borderRadius: 250,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    position: 'absolute',
    top: -250,
    transform: 'rotate(60deg)',
  },
  infoText: {
    width: 300,
    color: 'white',
    fontSize: 28,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 70,
  },
  cameraContainer: {
    width: '100%',
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    paddingTop: 20,
  },
  cameraFrame: {
    width: '80%',
    height: '54%',
    minWidth: 330,
    minHeight: 400,
    overflow: 'hidden',
    borderRadius: 30,
    elevation: 5,
  },
  camera: {
    height: '100%',
    width: '100%',
  },
  scanSquare: {
    width: '70%',
    height: '70%',
    minWidth: 290,
    minHeight: 440,
    resizeMode: 'contain',
    position: 'absolute',
    top: 0,
    zIndex: 10,
    alignSelf: 'center',
  },
  previewImage: {
    width: '80%',
    height: '70%',
    borderRadius: 10,
  },
  // ⏳ Estado cargando modelo
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary.dark,
  },
  // ⏳ Overlay mientras captura/procesa
  capturingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
    borderRadius: 30,
  },
});
