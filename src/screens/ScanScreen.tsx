// src/screens/ScanScreen.tsx
import React, {useState} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
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
  const [isCapturing, setIsCapturing] = useState(false);

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
      console.warn('No se encontró cámara en el dispositivo');
      return;
    }
    try {
      setIsCapturing(true); // 🚀 Bloqueamos la UI
      const capture = await camera.current.takePhoto({flash: 'off'});
      const photoPath = `file://${capture.path}`;
      setPhoto(photoPath);
      classify(capture.path);
    } catch (e) {
      console.error('Error al tomar foto:', e);
    } finally {
      setIsCapturing(false); // ✅ Liberamos
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.decoration} />

      <Text style={styles.infoText}>
        {photo ? 'Planta escaneada' : 'Toma una foto para escanear la planta'}
      </Text>

      <View style={styles.cameraContainer}>
        {photo ? (
          <Image source={{uri: photo}} style={styles.previewImage} />
        ) : (
          <>
            {/* Cámara dentro de un frame */}
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

            {/* Cuadrícula de escaneo */}
            <Image
              source={require('../assets/images/scan_square.png')}
              style={styles.scanSquare}
            />

            {/* Overlay de "Capturando" */}
            {isCapturing && (
              <View style={styles.capturingOverlay}>
                <ActivityIndicator size="large" color="white" />
                <Text style={{color: 'white', marginTop: 10}}>
                  Procesando foto...
                </Text>
              </View>
            )}
          </>
        )}

        {/* Botón solo cuando no hay foto ni se está capturando */}
        {!photo && !isCapturing && <ScanButton onPress={takePhoto} />}
      </View>

      {/* Resultado */}
      {photo && (
        <ResultCard
          result={result}
          onNavigate={() => navigation.navigate('Gota')}
        />
      )}
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
    height: '95%',
    borderRadius: 10,
  },
  takePhotoButton: {
    width: 100,
    height: 100,
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 20,
    top: -10,
  },
  // ⏳ Estado cargando modelo
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary.dark,
  },
  // ⏳ Estado mientras se captura la foto
  capturingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
    borderRadius: 30,
  },
});
