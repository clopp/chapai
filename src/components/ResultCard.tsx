import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type ResultCardProps = {
  result: {label: string; confidence: number}[];
  onReset: () => void;
};

export default function ResultCard({result, onReset}: ResultCardProps) {
  const navigation = useNavigation<any>();

  if (!result || result.length === 0) {
    return null;
  }

  const {label, confidence} = result[0];
  const confidencePct = Math.round(confidence * 100);

  // 👉 Semáforo según confianza y enfermedad
  let statusColor = 'green';
  let statusIcon = 'leaf';
  console.log('etiqueta de deteccion', label);

  if (
    label.toLowerCase().includes('Tardío') ||
    label.toLowerCase().includes('Paratrioza') ||
    label.toLowerCase().includes('Temprano')
  ) {
    statusColor = confidencePct > 70 ? 'red' : 'orange';
    statusIcon = 'alert-circle';
  }

  // 👉 Navegación a la enfermedad
  const handleNavigate = () => {
    const lower = label.toLowerCase();

    if (lower.includes('paratrioza')) {
      navigation.navigate('Paratrioza');
    } else if (
      lower.includes('tizón tardío') ||
      lower.includes('tizón temprano') ||
      lower.includes('gota')
    ) {
      navigation.navigate('Gota');
    }
  };

  return (
    <View style={styles.card}>
      {/* Header con semáforo */}
      <View style={styles.header}>
        <Icon name={statusIcon} size={32} color={statusColor} />
        <Text style={styles.title}>Resultado de análisis</Text>
      </View>

      {/* Enfermedad detectada */}
      <Text style={styles.result}>{label ?? 'Desconocido'}</Text>

      {/* Barra de confianza */}
      <View style={styles.confidenceContainer}>
        <View style={styles.barBackground}>
          <View
            style={[
              styles.barFill,
              {width: `${confidencePct}%`, backgroundColor: statusColor},
            ]}
          />
        </View>
        <Text style={styles.confidenceText}>{confidencePct}% confianza</Text>
      </View>

      {/* Botones de acción */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: '#555'}]}
          onPress={onReset}>
          <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>

        {!label.toLowerCase().includes('saludable') && (
          <TouchableOpacity
            style={[styles.button, {backgroundColor: statusColor}]}
            onPress={handleNavigate}>
            <Text style={styles.buttonText}>Ver más</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    padding: 20,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.85)',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 6,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  title: {color: 'white', fontSize: 18, fontWeight: 'bold'},
  result: {color: 'white', fontSize: 16, marginBottom: 10},
  confidenceContainer: {marginBottom: 15},
  barBackground: {
    width: '100%',
    height: 15,
    backgroundColor: '#444',
    borderRadius: 8,
    overflow: 'hidden',
  },
  barFill: {height: '100%'},
  confidenceText: {
    color: 'white',
    marginTop: 6,
    fontSize: 14,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {color: 'white', fontWeight: 'bold'},
});
