import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function ResultCard({
  result,
  onNavigate,
}: {
  result: any;
  onNavigate: () => void;
}) {
  if (!result) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enfermedad Detectada:</Text>
      {result.label === 'Tizón tardío de la papa' ? (
        <TouchableOpacity style={styles.button} onPress={onNavigate}>
          <Text style={styles.text}>{result.label}</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.text}>{result.label}</Text>
      )}
      <Text style={styles.confidence}>
        Confianza: {(result.confidence * 100).toFixed(2)}%
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {alignItems: 'center', marginTop: 20},
  title: {fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: 'white'},
  button: {backgroundColor: '#4CAF50', padding: 10, borderRadius: 8},
  text: {color: 'white', fontSize: 16},
  confidence: {color: 'white', marginTop: 5},
});
