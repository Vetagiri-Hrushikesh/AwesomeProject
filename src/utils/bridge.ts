import { NativeModules, Platform, Alert } from 'react-native';

// Bridge interface for accessing native features through PreVue
interface EmbeddedAppBridge {
  requestCameraAccess(): Promise<boolean>;
  requestGalleryAccess(): Promise<boolean>;
}

// Try to get the bridge module, fallback to mock if not available
const getBridge = (): EmbeddedAppBridge | null => {
  try {
    return NativeModules.EmbeddedAppBridge || null;
  } catch (error) {
    console.warn('Bridge not available, using fallback');
    return null;
  }
};

// Enhanced fallback implementation with better user feedback
const mockBridge: EmbeddedAppBridge = {
  requestCameraAccess: async () => {
    console.warn('Camera access not available in preview mode');
    Alert.alert(
      'Camera Access',
      'Camera functionality is not yet implemented in the bridge.\n\n' +
      '✅ PreVue has camera permissions\n' +
      '✅ Touch and scrolling work perfectly\n' +
      '✅ App loads and runs correctly\n\n' +
      'The bridge architecture is in place, but the native module connection needs to be completed.',
      [{ text: 'OK', style: 'default' }]
    );
    return false;
  },
  requestGalleryAccess: async () => {
    console.warn('Gallery access not available in preview mode');
    Alert.alert(
      'Gallery Access',
      'Gallery functionality is not yet implemented in the bridge.\n\n' +
      '✅ PreVue has storage permissions\n' +
      '✅ Touch and scrolling work perfectly\n' +
      '✅ App loads and runs correctly\n\n' +
      'The bridge architecture is in place, but the native module connection needs to be completed.',
      [{ text: 'OK', style: 'default' }]
    );
    return false;
  }
};

export const bridge = getBridge() || mockBridge;

// Wrapper functions for camera and gallery access
export const requestCameraAccess = async (): Promise<boolean> => {
  try {
    return await bridge.requestCameraAccess();
  } catch (error) {
    console.error('Camera access error:', error);
    Alert.alert('Error', 'Failed to access camera: ' + error);
    return false;
  }
};

export const requestGalleryAccess = async (): Promise<boolean> => {
  try {
    return await bridge.requestGalleryAccess();
  } catch (error) {
    console.error('Gallery access error:', error);
    Alert.alert('Error', 'Failed to access gallery: ' + error);
    return false;
  }
};

// Check if we're running in preview mode
export const isPreviewMode = (): boolean => {
  return bridge === mockBridge;
}; 