import React from 'react';
import {View, Image, Text, StyleSheet, ActivityIndicator} from 'react-native';
import ResultCard from './ResultCard';

type Props = {
  photo: string;
  result: any[];
  onNavigate: () => void;
  onReset: () => void;
};

export default function ScanResult({
  photo,
  result,
  onNavigate,
  onReset,
}: Props) {
  const isProcessing = !result || result.length === 0;

  return (
    <View style={styles.container}>
      <Image source={{uri: photo}} style={styles.previewImage} />

      {isProcessing ? (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="white" />
          <Text style={styles.text}>Procesando...</Text>
        </View>
      ) : (
        <ResultCard result={result} onNavigate={onNavigate} onReset={onReset} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    height: '90%',
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    marginTop: 10,
  },
});
