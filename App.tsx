import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ScrollView,
  Pressable,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import HomeScreen from './src/components/HomeScreen';
import ProfileScreen from './src/components/ProfileScreen';
import { testAllPermissions, requestCameraPermission, requestStoragePermission } from './src/utils/permissions';
import { requestCameraAccess, requestGalleryAccess, isPreviewMode } from './src/utils/bridge';

const { width } = Dimensions.get('window');

type Screen = 'home' | 'profile' | 'gallery' | 'settings';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@awesome.com',
    avatar: 'https://via.placeholder.com/120/4CAF50/FFFFFF?text=JD',
    posts: 42,
    followers: 1234,
    following: 567,
    bio: 'Passionate developer and content creator. Love sharing knowledge and building amazing experiences! 🚀',
    location: 'San Francisco, CA',
    website: 'johndoe.dev',
  });

  useEffect(() => {
    console.log('[AwesomeProject] App mounted, isDarkMode=', isDarkMode);
    if (isPreviewMode()) {
      console.log('[AwesomeProject] Running in preview mode');
    }
  }, [isDarkMode]);

  const handleScreenChange = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleCameraAccess = async () => {
    try {
      const granted = await requestCameraAccess();
      if (granted) {
        Alert.alert('Success', 'Camera access granted through bridge!');
      } else {
        Alert.alert('Permission Denied', 'Camera access denied');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to access camera: ' + error);
    }
  };

  const handleGalleryAccess = async () => {
    try {
      const granted = await requestGalleryAccess();
      if (granted) {
        Alert.alert('Success', 'Gallery access granted through bridge!');
      } else {
        Alert.alert('Permission Denied', 'Gallery access denied');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to access gallery: ' + error);
    }
  };

  const handleAction = async (action: string) => {
    if (action === 'Camera Test') {
      await handleCameraAccess();
    } else if (action === 'Gallery Test') {
      await handleGalleryAccess();
    } else if (action === 'Test Permissions') {
      await testAllPermissions();
    } else {
      Alert.alert('Action', `${action} action triggered!`);
    }
  };

  const renderGalleryScreen = () => (
    <ScrollView style={styles.screen}>
      <View style={styles.galleryHeader}>
        <Text style={[styles.galleryTitle, { color: isDarkMode ? '#fff' : '#333' }]}>
          Photo Gallery
        </Text>
        <Text style={[styles.gallerySubtitle, { color: isDarkMode ? '#ccc' : '#666' }]}>
          Your amazing photos and memories
        </Text>
      </View>

      <View style={styles.galleryGrid}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((photo) => (
          <View key={photo} style={styles.galleryItem}>
            <Image
              source={{ uri: `https://via.placeholder.com/150/4CAF50/FFFFFF?text=Photo+${photo}` }}
              style={styles.galleryImage}
            />
            <View style={styles.galleryOverlay}>
              <Text style={styles.galleryOverlayText}>Photo {photo}</Text>
            </View>
          </View>
        ))}
      </View>

      <Pressable
        style={[styles.galleryButton, { backgroundColor: isDarkMode ? '#4CAF50' : '#4CAF50' }]}
        onPress={() => handleAction('Add Photo')}
      >
        <Text style={styles.galleryButtonText}>📸 Add New Photo</Text>
      </Pressable>

      <Pressable
        style={[styles.galleryButton, { backgroundColor: isDarkMode ? '#2196F3' : '#2196F3', marginTop: 10 }]}
        onPress={() => handleAction('Camera Test')}
      >
        <Text style={styles.galleryButtonText}>📱 Test Camera Access</Text>
      </Pressable>

      <Pressable
        style={[styles.galleryButton, { backgroundColor: isDarkMode ? '#FF9800' : '#FF9800', marginTop: 10 }]}
        onPress={() => handleAction('Gallery Test')}
      >
        <Text style={styles.galleryButtonText}>🖼️ Test Gallery Access</Text>
      </Pressable>
    </ScrollView>
  );

  const renderSettingsScreen = () => (
    <ScrollView style={styles.screen}>
      <View style={styles.settingsHeader}>
        <Text style={[styles.settingsTitle, { color: isDarkMode ? '#fff' : '#333' }]}>
          Settings
        </Text>
        <Text style={[styles.settingsSubtitle, { color: isDarkMode ? '#ccc' : '#666' }]}>
          Customize your experience
        </Text>
      </View>

      <View style={styles.settingsList}>
        {[
          { icon: '🔔', title: 'Notifications', subtitle: 'Manage notification preferences', color: '#4CAF50' },
          { icon: '🔒', title: 'Privacy', subtitle: 'Control your privacy settings', color: '#2196F3' },
          { icon: '🌙', title: 'Dark Mode', subtitle: 'Toggle dark/light theme', color: '#9C27B0' },
          { icon: '🌍', title: 'Language', subtitle: 'Change app language', color: '#FF9800' },
          { icon: '💾', title: 'Storage', subtitle: 'Manage app storage', color: '#607D8B' },
          { icon: '❓', title: 'Help & Support', subtitle: 'Get help and contact support', color: '#795548' },
          { icon: '📱', title: 'About App', subtitle: 'Version 2.0.0', color: '#E91E63' },
          { icon: '🔐', title: 'Test Permissions', subtitle: 'Test camera, storage, and location access', color: '#FF5722' },
          { icon: '📊', title: 'Analytics', subtitle: 'View app usage statistics', color: '#3F51B5' },
          { icon: '🔄', title: 'Sync Settings', subtitle: 'Manage data synchronization', color: '#009688' },
          { icon: '🔋', title: 'Battery', subtitle: 'Optimize battery usage', color: '#FFC107' },
          { icon: '📡', title: 'Network', subtitle: 'Configure network settings', color: '#795548' },
          { icon: '🎵', title: 'Sound', subtitle: 'Adjust sound and vibration', color: '#E91E63' },
          { icon: '📱', title: 'Display', subtitle: 'Screen brightness and resolution', color: '#673AB7' },
          { icon: '🔒', title: 'Security', subtitle: 'App lock and security settings', color: '#F44336' },
        ].map((setting, index) => (
          <Pressable
            key={index}
            style={[styles.settingItem, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}
            onPress={() => handleAction(setting.title)}
          >
            <View style={[styles.settingIconContainer, { backgroundColor: setting.color + '20' }]}>
              <Text style={styles.settingIcon}>{setting.icon}</Text>
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: isDarkMode ? '#fff' : '#333' }]}>
                {setting.title}
              </Text>
              <Text style={[styles.settingSubtitle, { color: isDarkMode ? '#ccc' : '#666' }]}>
                {setting.subtitle}
              </Text>
            </View>
            <Text style={[styles.settingArrow, { color: isDarkMode ? '#ccc' : '#666' }]}>›</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );

  const renderBottomNavigation = () => (
    <View style={[styles.bottomNav, { backgroundColor: isDarkMode ? '#222' : '#fff' }]}>
      <Pressable
        style={[styles.navItem, currentScreen === 'home' && styles.navItemActive]}
        onPress={() => handleScreenChange('home')}
      >
        <Text style={[styles.navIcon, currentScreen === 'home' && styles.navIconActive]}>🏠</Text>
        <Text style={[styles.navLabel, currentScreen === 'home' && styles.navLabelActive]}>Home</Text>
      </Pressable>
      <Pressable
        style={[styles.navItem, currentScreen === 'profile' && styles.navItemActive]}
        onPress={() => handleScreenChange('profile')}
      >
        <Text style={[styles.navIcon, currentScreen === 'profile' && styles.navIconActive]}>👤</Text>
        <Text style={[styles.navLabel, currentScreen === 'profile' && styles.navLabelActive]}>Profile</Text>
      </Pressable>
      <Pressable
        style={[styles.navItem, currentScreen === 'gallery' && styles.navItemActive]}
        onPress={() => handleScreenChange('gallery')}
      >
        <Text style={[styles.navIcon, currentScreen === 'gallery' && styles.navIconActive]}>🖼️</Text>
        <Text style={[styles.navLabel, currentScreen === 'gallery' && styles.navLabelActive]}>Gallery</Text>
      </Pressable>
      <Pressable
        style={[styles.navItem, currentScreen === 'settings' && styles.navItemActive]}
        onPress={() => handleScreenChange('settings')}
      >
        <Text style={[styles.navIcon, currentScreen === 'settings' && styles.navIconActive]}>⚙️</Text>
        <Text style={[styles.navLabel, currentScreen === 'settings' && styles.navLabelActive]}>Settings</Text>
      </Pressable>
    </View>
  );

  return (
    <View
      testID="root"
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#111' : '#f5f5f5' },
      ]}
    >
      {currentScreen === 'home' && <HomeScreen isDarkMode={isDarkMode} onAction={handleAction} />}
      {currentScreen === 'profile' && <ProfileScreen isDarkMode={isDarkMode} onAction={handleAction} userData={userData} />}
      {currentScreen === 'gallery' && renderGalleryScreen()}
      {currentScreen === 'settings' && renderSettingsScreen()}
      {renderBottomNavigation()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screen: {
    flex: 1,
    paddingBottom: 80, // Space for bottom navigation
  },
  galleryHeader: {
    padding: 20,
    paddingTop: 40,
  },
  galleryTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  gallerySubtitle: {
    fontSize: 16,
  },
  galleryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
  },
  galleryItem: {
    width: (width - 60) / 3,
    margin: 5,
    position: 'relative',
  },
  galleryImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
  },
  galleryOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 8,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  galleryOverlayText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '600',
  },
  galleryButton: {
    margin: 20,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  galleryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  settingsHeader: {
    padding: 20,
    paddingTop: 40,
  },
  settingsTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  settingsSubtitle: {
    fontSize: 16,
  },
  settingsList: {
    paddingHorizontal: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  settingIcon: {
    fontSize: 24,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingSubtitle: {
    fontSize: 12,
  },
  settingArrow: {
    fontSize: 18,
    fontWeight: '600',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
  },
  navItemActive: {
    // Active state styling
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  navIconActive: {
    // Active icon styling
  },
  navLabel: {
    fontSize: 12,
    color: '#666',
  },
  navLabelActive: {
    color: '#4CAF50',
    fontWeight: '600',
  },
});

export default App;
