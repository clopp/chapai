// src/components/LoadingBar.tsx
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // ojo, instala react-native-linear-gradient

export function LoadingBar({progress}: {progress: number}) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.label}>Cargando modelo...</Text>

        <View style={styles.barBackground}>
          <LinearGradient
            colors={['#66bb6a', '#388e3c']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={[styles.barFill, {width: `${progress}%`}]}
          />
        </View>

        <Text style={styles.percent}>{progress}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.6)', // fondo translúcido
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 6,
    elevation: 6,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  label: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  barBackground: {
    width: 220,
    height: 30,
    backgroundColor: '#222',
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  barFill: {
    height: '100%',
    borderRadius: 15,
  },
  percent: {
    color: 'white',
    fontWeight: '500',
  },
});
