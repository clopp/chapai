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
    borderRadius: 999,
    overflow: 'hidden',
    elevation: 5,
    top: 70,
  },
  icon: {width: '100%', height: '100%'},
});
