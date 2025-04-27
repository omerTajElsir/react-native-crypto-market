# React Native Crypto Market

A modern cryptocurrency market application built with React Native and Expo. This app allows users to track cryptocurrency prices, view detailed information about specific coins, and monitor market trends.

## App Demo

The following demo showcases the app's main features, including market overview, coin details, search functionality, and the hidden features like pull-to-refresh for updating data.

![App Demo Recording](screenshots/recording.gif)

### Screenshots

<div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">
  <img src="screenshots/Screenshot_20250427_152245_Expo Go.jpg" alt="Market Overview" width="200"/>
  <img src="screenshots/Screenshot_20250427_152255_Expo Go.jpg" alt="Featured Coins" width="200"/>
  <img src="screenshots/Screenshot_20250427_152647_Expo Go.jpg" alt="Coin Details" width="200"/>
  <img src="screenshots/Screenshot_20250427_152702_Expo Go.jpg" alt="Price Chart" width="200"/>
</div>

## Features

- **Authentication**: Secure login with biometric authentication
- **Market Overview**: View a comprehensive list of cryptocurrencies with key metrics
- **Featured Coins**: Quickly access trending and popular cryptocurrencies
- **Detailed Coin Information**: View in-depth data for each cryptocurrency including:
  - Price charts with multiple timeframes
  - Market statistics
  - Historical data
- **Search Functionality**: Easily find specific cryptocurrencies
- **Responsive UI**: Beautiful and consistent user interface across devices
- **Pull to Refresh**: Easily update data by pulling down on the screen
- **Unit Testing**: Comprehensive test suite to ensure app reliability

## Tech Stack

- **Framework**: [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/) (file-based routing)
- **Styling**: [NativeWind](https://www.nativewind.dev/) (TailwindCSS for React Native)
- **Authentication**: Expo Local Authentication for biometric login
- **Charts**: React Native SVG for data visualization
- **State Management**: React Context API and custom hooks

## Project Structure

```
/app
  /components        # Reusable UI components
  /contexts          # React Context providers
  /features          # Feature-based organization
    /auth            # Authentication related code
    /coin_details    # Coin detail screens and components
    /common          # Shared components and utilities
    /market          # Market overview screens and components
  /navigation        # Navigation configuration
  /theme             # Theme system (colors, typography, spacing)
```

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (optional for mobile testing)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/react-native-crypto-market.git
   cd react-native-crypto-market
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```bash
   npx expo start
   ```

4. Run on your preferred platform
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan the QR code with Expo Go app on your physical device

## Documentation

The project includes detailed documentation for various components:

- [Navigation Structure](/app/navigation/README.md)
- [UI Components](/app/components/ui/README.md)
- [Theme System](/app/theme/README.md)
- [Custom Hooks](/app/features/hooks.md)

## Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Start the app on Android emulator
- `npm run ios` - Start the app on iOS simulator
- `npm run web` - Start the app in a web browser
- `npm test` - Run tests
- `npm run lint` - Run linting

## Acknowledgments

- [CoinGecko API](https://www.coingecko.com/en/api) for cryptocurrency data
- [Expo](https://expo.dev/) for the amazing React Native tooling
- [NativeWind](https://www.nativewind.dev/) for the styling system
