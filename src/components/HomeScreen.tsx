import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const { width } = Dimensions.get('window');

interface HomeScreenProps {
  isDarkMode: boolean;
  onAction: (action: string) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ isDarkMode, onAction }) => {
  
  const handleCameraCapture = () => {
    const options = {
      mediaType: 'photo' as const,
      cameraType: 'back' as const,
      quality: 0.8 as const,
      saveToPhotos: true,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        Alert.alert('Error', 'Camera error: ' + response.errorMessage);
      } else if (response.assets && response.assets[0]) {
        const imageUri = response.assets[0].uri;
        Alert.alert('Success', `Photo captured: ${imageUri}`);
        onAction('Photo Captured');
      }
    });
  };

  const handleGalleryPick = () => {
    const options = {
      mediaType: 'photo' as const,
      quality: 0.8 as const,
      selectionLimit: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled gallery pick');
      } else if (response.errorCode) {
        Alert.alert('Error', 'Gallery error: ' + response.errorMessage);
      } else if (response.assets && response.assets[0]) {
        const imageUri = response.assets[0].uri;
        Alert.alert('Success', `Photo selected: ${imageUri}`);
        onAction('Photo Selected');
      }
    });
  };

  return (
    <ScrollView style={styles.screen}>
      {/* Hero Section */}
      <View style={[styles.heroSection, { backgroundColor: isDarkMode ? '#1a1a1a' : '#f8f9fa' }]}>
        <Text style={[styles.heroTitle, { color: isDarkMode ? '#fff' : '#333' }]}>
          Welcome to AwesomeProject
        </Text>
        <Text style={[styles.heroSubtitle, { color: isDarkMode ? '#ccc' : '#666' }]}>
          Your ultimate social media experience
        </Text>
        <View style={styles.heroStats}>
          <View style={[styles.heroStat, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
            <Text style={[styles.heroStatNumber, { color: isDarkMode ? '#fff' : '#333' }]}>2.5K</Text>
            <Text style={[styles.heroStatLabel, { color: isDarkMode ? '#ccc' : '#666' }]}>Posts</Text>
          </View>
          <View style={[styles.heroStat, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
            <Text style={[styles.heroStatNumber, { color: isDarkMode ? '#fff' : '#333' }]}>15.2K</Text>
            <Text style={[styles.heroStatLabel, { color: isDarkMode ? '#ccc' : '#666' }]}>Followers</Text>
          </View>
          <View style={[styles.heroStat, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
            <Text style={[styles.heroStatNumber, { color: isDarkMode ? '#fff' : '#333' }]}>892</Text>
            <Text style={[styles.heroStatLabel, { color: isDarkMode ? '#ccc' : '#666' }]}>Following</Text>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsSection}>
        <Text style={[styles.sectionTitle, { color: isDarkMode ? '#fff' : '#333' }]}>
          Quick Actions
        </Text>
        <View style={styles.actionsGrid}>
          <Pressable
            style={[styles.actionCard, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}
            onPress={() => onAction('Create Post')}
          >
            <Text style={styles.actionIcon}>📝</Text>
            <Text style={[styles.actionTitle, { color: isDarkMode ? '#fff' : '#333' }]}>
              Create Post
            </Text>
            <Text style={[styles.actionSubtitle, { color: isDarkMode ? '#ccc' : '#666' }]}>
              Share your thoughts
            </Text>
          </Pressable>
          
          <Pressable
            style={[styles.actionCard, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}
            onPress={() => onAction('Share Story')}
          >
            <Text style={styles.actionIcon}>📱</Text>
            <Text style={[styles.actionTitle, { color: isDarkMode ? '#fff' : '#333' }]}>
              Share Story
            </Text>
            <Text style={[styles.actionSubtitle, { color: isDarkMode ? '#ccc' : '#666' }]}>
              Quick updates
            </Text>
          </Pressable>
          
          <Pressable
            style={[styles.actionCard, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}
            onPress={handleCameraCapture}
          >
            <Text style={styles.actionIcon}>📸</Text>
            <Text style={[styles.actionTitle, { color: isDarkMode ? '#fff' : '#333' }]}>
              Upload Photo
            </Text>
            <Text style={[styles.actionSubtitle, { color: isDarkMode ? '#ccc' : '#666' }]}>
              📷 Capture from camera
            </Text>
          </Pressable>
          
          <Pressable
            style={[styles.actionCard, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}
            onPress={() => onAction('Go Live')}
          >
            <Text style={styles.actionIcon}>🎥</Text>
            <Text style={[styles.actionTitle, { color: isDarkMode ? '#fff' : '#333' }]}>
              Go Live
            </Text>
            <Text style={[styles.actionSubtitle, { color: isDarkMode ? '#ccc' : '#666' }]}>
              Stream now
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Trending Posts */}
      <View style={styles.trendingSection}>
        <Text style={[styles.sectionTitle, { color: isDarkMode ? '#fff' : '#333' }]}>
          Trending Posts
        </Text>
        <View style={styles.trendingPosts}>
          {[1, 2, 3].map((post) => (
            <View key={post} style={[styles.trendingPost, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
              <Image
                source={{ uri: `https://via.placeholder.com/80/4CAF50/FFFFFF?text=Post+${post}` }}
                style={styles.trendingPostImage}
              />
              <View style={styles.trendingPostContent}>
                <Text style={[styles.trendingPostTitle, { color: isDarkMode ? '#fff' : '#333' }]}>
                  Trending Post {post}
                </Text>
                <Text style={[styles.trendingPostSubtitle, { color: isDarkMode ? '#ccc' : '#666' }]}>
                  This is a trending post with amazing content
                </Text>
                <View style={styles.trendingPostStats}>
                  <Text style={[styles.trendingPostStat, { color: isDarkMode ? '#ccc' : '#666' }]}>❤️ 1.2K</Text>
                  <Text style={[styles.trendingPostStat, { color: isDarkMode ? '#ccc' : '#666' }]}>💬 234</Text>
                  <Text style={[styles.trendingPostStat, { color: isDarkMode ? '#ccc' : '#666' }]}>🔄 56</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  heroSection: {
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  heroStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  heroStat: {
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    minWidth: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  heroStatNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  heroStatLabel: {
    fontSize: 12,
  },
  actionsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: (width - 60) / 2,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  actionSubtitle: {
    fontSize: 12,
    textAlign: 'center',
  },
  trendingSection: {
    padding: 20,
    paddingBottom: 100,
  },
  trendingPosts: {
    // Add styles for the trending posts container if needed
  },
  trendingPost: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  trendingPostImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 15,
  },
  trendingPostContent: {
    flex: 1,
  },
  trendingPostTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  trendingPostSubtitle: {
    fontSize: 14,
    marginBottom: 8,
  },
  trendingPostStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trendingPostStat: {
    fontSize: 13,
  },
});

export default HomeScreen; 