# How to Generate an APK for React Native Crypto Market

This guide provides instructions on how to generate an Android APK (Android Package) for the React Native Crypto Market application.

## Prerequisites

Before generating an APK, ensure you have the following:

1. Node.js (v14 or newer)
2. npm or yarn
3. Expo CLI installed globally: `npm install -g expo-cli`
4. An Expo account (create one at [expo.dev](https://expo.dev/signup))
5. Android Studio (for testing the APK)

## Option 1: Using EAS Build (Recommended)

Expo Application Services (EAS) is the recommended way to build APKs for Expo projects.

### Step 1: Install EAS CLI

```bash
npm install -g eas-cli
```

### Step 2: Log in to your Expo account

```bash
eas login
```

### Step 3: Configure EAS Build

Create an eas.json file in the root of your project:

```bash
eas build:configure
```

Or manually create an eas.json file with the following content:

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    }
  }
}
```

### Step 4: Build the APK

For a development or preview build (APK):

```bash
eas build --platform android --profile preview
```

For a production build (AAB - Android App Bundle):

```bash
eas build --platform android --profile production
```

### Step 5: Download the APK

After the build completes, EAS will provide a URL where you can download the APK.

## Option 2: Using Classic Expo Build (Legacy)

This approach uses the older `expo build:android` command.

### Step 1: Start the build process

```bash
expo build:android -t apk
```

### Step 2: Follow the prompts

- If you don't have a keystore, let Expo handle it for you by selecting "Let Expo handle the process!"
- If you have your own keystore, select "I want to upload my own keystore"

### Step 3: Wait for the build to complete

The build process may take several minutes. Once completed, you'll receive a URL to download the APK.

## Testing the APK

1. Transfer the APK to your Android device
2. Enable "Install from Unknown Sources" in your device settings
3. Install the APK by tapping on it in your file manager
4. Launch the app

## Troubleshooting

If you encounter issues during the build process:

1. Ensure your app.json has the correct Android configuration:
   - Valid package name (android.package)
   - Version code (android.versionCode)
   - Required permissions

2. Check that all native dependencies are properly configured

3. For EAS Build issues, refer to the [EAS Build documentation](https://docs.expo.dev/build/introduction/)

## Additional Resources

- [Expo Application Services (EAS) Documentation](https://docs.expo.dev/eas/)
- [Expo Building Android APKs Documentation](https://docs.expo.dev/build-reference/apk/)
- [Android App Signing](https://developer.android.com/studio/publish/app-signing)