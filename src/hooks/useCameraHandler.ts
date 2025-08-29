import {useEffect, useState, useRef} from 'react';
import {Camera, useCameraDevice} from 'react-native-vision-camera';

export function useCameraHandler() {
  const camera = useRef<Camera>(null);
  const devices = useCameraDevice('back');
  const device = devices; // usar cámara trasera
  const [permission, setPermission] = useState<string>();

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setPermission(status);
    })();
  }, []);

  return {camera, device, permission};
}
