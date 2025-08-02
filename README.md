# AwesomeProject

A React Native application designed to be previewed within the PreVue platform. This project demonstrates how to create self-contained React Native apps that can be bundled and embedded in a preview environment.

## 🚀 Features

- **Multi-screen Navigation**: Home, Profile, Gallery, and Settings screens
- **Touch & Scroll Support**: Fully functional touch interactions and scrolling
- **Bridge Architecture**: Native module access through PreVue bridge
- **Responsive Design**: Adapts to different screen sizes and orientations
- **Dark/Light Mode**: Automatic theme switching based on system preferences

## 📱 Screens

### Home Screen
- Welcome message with user data
- Quick navigation to other screens
- Responsive layout with proper spacing

### Profile Screen
- User profile information display
- Avatar and user details
- Social media statistics (posts, followers, following)
- Bio and location information

### Gallery Screen
- Grid layout of sample images
- Camera and gallery access testing
- Permission testing functionality
- Scrollable content with proper touch handling

### Settings Screen
- App configuration options
- Permission management
- Camera and gallery access controls
- System information display

## 🛠️ Setup & Installation

### Prerequisites
- Node.js (v16 or higher)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Vetagiri-Hrushikesh/AwesomeProject.git
   cd AwesomeProject
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **iOS Setup (macOS only)**
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Run the app**
   ```bash
   # For Android
   npx react-native run-android
   
   # For iOS
   npx react-native run-ios
   ```

## 📦 Bundling for PreVue Integration

This project is designed to be bundled and embedded within the PreVue platform. Follow these steps to create the necessary bundles:

### 1. Create Bundles Directory
```bash
mkdir -p bundles/AwesomeProject
```

### 2. Bundle for Android
```bash
npx react-native bundle \
  --platform android \
  --dev false \
  --entry-file index.js \
  --bundle-output bundles/AwesomeProject/complete-app.bundle \
  --assets-dest bundles/AwesomeProject/
```

### 3. Copy Bundle to PreVue
```bash
cp bundles/AwesomeProject/complete-app.bundle /path/to/PreVue/android/app/src/main/assets/awesome/
```

### 4. Create App Manifest (Optional)
Create `bundles/AwesomeProject/app-manifest.json`:
```json
{
  "name": "AwesomeProject",
  "version": "1.0.0",
  "description": "A sample React Native app for PreVue preview",
  "main": "index.js",
  "bundlePath": "complete-app.bundle",
  "assets": [],
  "permissions": [
    "camera",
    "storage",
    "location"
  ]
}
```

## 🔧 Bridge Architecture

This project uses a bridge architecture to access native functionality when embedded in PreVue:

### Bridge Implementation
- **Location**: `src/utils/bridge.ts`
- **Purpose**: Provides native module access through PreVue's bridge
- **Fallback**: Graceful handling when native modules aren't available

### Usage Example
```typescript
import { requestCameraAccess, requestGalleryAccess } from './src/utils/bridge';

// Request camera access
const cameraGranted = await requestCameraAccess();

// Request gallery access
const galleryGranted = await requestGalleryAccess();
```

## 🏗️ Project Structure

```
AwesomeProject/
├── android/                 # Android-specific files
├── ios/                    # iOS-specific files
├── src/
│   ├── components/         # React components
│   │   ├── HomeScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   └── GalleryScreen.tsx
│   ├── utils/             # Utility functions
│   │   ├── bridge.ts      # Bridge for native modules
│   │   └── permissions.ts # Permission utilities
│   └── types/             # TypeScript type definitions
├── bundles/               # Generated bundles for PreVue
│   └── AwesomeProject/
│       ├── complete-app.bundle
│       └── app-manifest.json
├── App.tsx               # Main app component
├── index.js              # Entry point
├── package.json          # Dependencies and scripts
└── README.md            # This file
```

## 🔌 Dependencies

### Core Dependencies
- `react-native`: Core React Native framework
- `react-native-vector-icons`: Icon library
- `react-native-permissions`: Permission management
- `react-native-image-picker`: Camera and gallery access

### Development Dependencies
- `@types/react`: TypeScript definitions for React
- `@types/react-native`: TypeScript definitions for React Native

## 🧪 Testing

### Manual Testing
1. **Navigation**: Test all screen transitions
2. **Touch Interactions**: Verify buttons and scrollable content work
3. **Camera/Gallery**: Test bridge functionality in PreVue
4. **Responsive Design**: Test on different screen sizes

### PreVue Integration Testing
1. **Bundle Creation**: Ensure bundle is generated correctly
2. **PreVue Loading**: Verify app loads in PreVue without errors
3. **Touch Support**: Confirm touch and scroll work in embedded environment
4. **Bridge Functionality**: Test native module access through bridge

## 🚀 Deployment

### For PreVue Integration
1. Create the bundle using the commands above
2. Copy the bundle to PreVue's assets directory
3. Rebuild PreVue with the new bundle
4. Test the integration

### For Standalone App
1. Follow the setup instructions above
2. Run the app directly on device or simulator
3. Test all functionality independently

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Related Projects

- [PreVue](https://github.com/Vetagiri-Hrushikesh/PreVue.git) - The preview platform that embeds this app

## 📞 Support

For support and questions:
- Create an issue in this repository
- Contact the development team
- Check the PreVue documentation

---

**Note**: This project is designed to work seamlessly with the PreVue platform. When running standalone, all native functionality will work normally. When embedded in PreVue, native modules are accessed through the bridge architecture.
