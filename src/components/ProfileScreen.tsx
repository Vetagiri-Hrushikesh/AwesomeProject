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
import {launchImageLibrary} from 'react-native-image-picker';

const { width } = Dimensions.get('window');

interface ProfileScreenProps {
  isDarkMode: boolean;
  onAction: (action: string) => void;
  userData: {
    name: string;
    email: string;
    avatar: string;
    posts: number;
    followers: number;
    following: number;
    bio: string;
    location: string;
    website: string;
  };
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ isDarkMode, onAction, userData }) => {
  
  const handleChangeAvatar = () => {
    const options = {
      mediaType: 'photo' as const,
      quality: 0.8 as const,
      selectionLimit: 1,
      includeBase64: false,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled gallery pick');
      } else if (response.errorCode) {
        Alert.alert('Error', 'Gallery error: ' + response.errorMessage);
      } else if (response.assets && response.assets[0]) {
        const imageUri = response.assets[0].uri;
        Alert.alert('Success', `Profile picture updated: ${imageUri}`);
        onAction('Avatar Changed');
      }
    });
  };

  return (
    <ScrollView style={styles.screen}>
      {/* Profile Header */}
      <View style={[styles.profileHeader, { backgroundColor: isDarkMode ? '#1a1a1a' : '#f8f9fa' }]}>
        <Image source={{ uri: userData.avatar }} style={styles.profileAvatar} />
        <Text style={[styles.profileName, { color: isDarkMode ? '#fff' : '#333' }]}>
          {userData.name}
        </Text>
        <Text style={[styles.profileEmail, { color: isDarkMode ? '#ccc' : '#666' }]}>
          {userData.email}
        </Text>
        <Text style={[styles.profileBio, { color: isDarkMode ? '#ccc' : '#666' }]}>
          {userData.bio}
        </Text>
        <View style={styles.profileInfo}>
          <View style={styles.profileInfoItem}>
            <Text style={styles.profileInfoIcon}>📍</Text>
            <Text style={[styles.profileInfoText, { color: isDarkMode ? '#ccc' : '#666' }]}>
              {userData.location}
            </Text>
          </View>
          <View style={styles.profileInfoItem}>
            <Text style={styles.profileInfoIcon}>🌐</Text>
            <Text style={[styles.profileInfoText, { color: isDarkMode ? '#ccc' : '#666' }]}>
              {userData.website}
            </Text>
          </View>
        </View>
      </View>

      {/* Stats Section */}
      <View style={styles.statsSection}>
        <View style={[styles.statCard, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
          <Text style={[styles.statNumber, { color: isDarkMode ? '#fff' : '#333' }]}>
            {userData.posts}
          </Text>
          <Text style={[styles.statLabel, { color: isDarkMode ? '#ccc' : '#666' }]}>Posts</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
          <Text style={[styles.statNumber, { color: isDarkMode ? '#fff' : '#333' }]}>
            {userData.followers}
          </Text>
          <Text style={[styles.statLabel, { color: isDarkMode ? '#ccc' : '#666' }]}>Followers</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
          <Text style={[styles.statNumber, { color: isDarkMode ? '#fff' : '#333' }]}>
            {userData.following}
          </Text>
          <Text style={[styles.statLabel, { color: isDarkMode ? '#ccc' : '#666' }]}>Following</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsSection}>
        <Pressable
          style={[styles.actionButton, { backgroundColor: isDarkMode ? '#4CAF50' : '#4CAF50' }]}
          onPress={() => onAction('Edit Profile')}
        >
          <Text style={styles.actionButtonText}>✏️ Edit Profile</Text>
        </Pressable>
        <Pressable
          style={[styles.actionButton, { backgroundColor: isDarkMode ? '#FF9800' : '#FF9800' }]}
          onPress={handleChangeAvatar}
        >
          <Text style={styles.actionButtonText}>🖼️ Change Avatar (Gallery)</Text>
        </Pressable>
        <Pressable
          style={[styles.actionButton, { backgroundColor: isDarkMode ? '#2196F3' : '#2196F3' }]}
          onPress={() => onAction('Share Profile')}
        >
          <Text style={styles.actionButtonText}>📤 Share Profile</Text>
        </Pressable>
      </View>

      {/* Recent Activity */}
      <View style={styles.activitySection}>
        <Text style={[styles.sectionTitle, { color: isDarkMode ? '#fff' : '#333' }]}>
          Recent Activity
        </Text>
        <View style={styles.activityList}>
          {[1, 2, 3].map((activity) => (
            <View key={activity} style={[styles.activityItem, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
              <View style={styles.activityIcon}>
                <Text style={styles.activityIconText}>📸</Text>
              </View>
              <View style={styles.activityContent}>
                <Text style={[styles.activityTitle, { color: isDarkMode ? '#fff' : '#333' }]}>
                  Posted a new photo
                </Text>
                <Text style={[styles.activityTime, { color: isDarkMode ? '#ccc' : '#666' }]}>
                  {activity} hour{activity > 1 ? 's' : ''} ago
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Achievements */}
      <View style={styles.achievementsSection}>
        <Text style={[styles.sectionTitle, { color: isDarkMode ? '#fff' : '#333' }]}>
          Achievements
        </Text>
        <View style={styles.achievementsGrid}>
          {[
            { icon: '🏆', title: 'First Post', description: 'Posted your first content' },
            { icon: '👥', title: 'Social Butterfly', description: 'Reached 100 followers' },
            { icon: '📸', title: 'Photographer', description: 'Posted 10 photos' },
          ].map((achievement, index) => (
            <View key={index} style={[styles.achievementCard, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
              <Text style={styles.achievementIcon}>{achievement.icon}</Text>
              <Text style={[styles.achievementTitle, { color: isDarkMode ? '#fff' : '#333' }]}>
                {achievement.title}
              </Text>
              <Text style={[styles.achievementDescription, { color: isDarkMode ? '#ccc' : '#666' }]}>
                {achievement.description}
              </Text>
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
  profileHeader: {
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 4,
    borderColor: '#4CAF50',
  },
  profileName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
    marginBottom: 10,
  },
  profileBio: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 20,
  },
  profileInfo: {
    width: '100%',
  },
  profileInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  profileInfoIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  profileInfoText: {
    fontSize: 14,
  },
  statsSection: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-around',
  },
  statCard: {
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
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  actionsSection: {
    padding: 20,
  },
  actionButton: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  activitySection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  activityList: {
    // No specific styles for activityList, as it's a simple list of items
  },
  activityItem: {
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
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  activityIconText: {
    fontSize: 24,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
  },
  achievementsSection: {
    padding: 20,
    paddingBottom: 100,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementCard: {
    width: (width - 60) / 2,
    padding: 15,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  achievementIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  achievementDescription: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export default ProfileScreen; 