import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';

export default function ScanButton({onPress}: {onPress: () => void}) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image
        source={require('../assets/images/scan_button.png')}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 100,
    borderRadius: 50, // círculo perfecto
    backgroundColor: '#00a706ff', // verde claro
    borderWidth: 8,
    borderColor: '#04b90dff', // verde más oscuro
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#bdcb6fff',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.7,
    shadowRadius: 5,
    top: 30,
  },
  icon: {
    width: '98%',
    height: '98%',
    resizeMode: 'contain',
  },
});
