import { NativeModules, Platform } from 'react-native';

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

// Fallback implementation when bridge is not available
const mockBridge: EmbeddedAppBridge = {
  requestCameraAccess: async () => {
    console.warn('Camera access not available in preview mode');
    return false;
  },
  requestGalleryAccess: async () => {
    console.warn('Gallery access not available in preview mode');
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
    return false;
  }
};

export const requestGalleryAccess = async (): Promise<boolean> => {
  try {
    return await bridge.requestGalleryAccess();
  } catch (error) {
    console.error('Gallery access error:', error);
    return false;
  }
};

// Check if we're running in preview mode
export const isPreviewMode = (): boolean => {
  return bridge === mockBridge;
}; 