// src/components/ResultCard.tsx
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function ResultCard({result, onNavigate, onReset}: any) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Enfermedad detectada</Text>
      <Text style={styles.result}>{result[0]?.label ?? 'Desconocido'}</Text>
      <Text style={styles.confidence}>
        Confianza: {Math.round(result[0]?.confidence * 100)}%
      </Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.button} onPress={onReset}>
          <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onNavigate}>
          <Text style={styles.buttonText}>Ver más</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  title: {color: 'white', fontSize: 18, fontWeight: 'bold'},
  result: {color: 'white', fontSize: 16, marginTop: 5},
  confidence: {color: 'lightgreen', marginTop: 5},
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#2E7D32',
  },
  buttonText: {color: 'white'},
});
