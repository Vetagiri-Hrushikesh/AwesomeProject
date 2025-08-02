import { PermissionsAndroid, Platform, Alert } from 'react-native';

export const requestCameraPermission = async (): Promise<boolean> => {
  if (Platform.OS !== 'android') {
    return true;
  }

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'This app needs access to your camera to take photos.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn('Camera permission request failed:', err);
    return false;
  }
};

export const requestStoragePermission = async (): Promise<boolean> => {
  if (Platform.OS !== 'android') {
    return true;
  }

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'This app needs access to your storage to access photos.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn('Storage permission request failed:', err);
    return false;
  }
};

export const testAllPermissions = async (): Promise<void> => {
  const cameraGranted = await requestCameraPermission();
  const storageGranted = await requestStoragePermission();

  Alert.alert(
    'Permissions Test Results',
    `Camera: ${cameraGranted ? '✅ Granted' : '❌ Denied'}\n` +
    `Storage: ${storageGranted ? '✅ Granted' : '❌ Denied'}`,
    [{ text: 'OK' }]
  );
}; 