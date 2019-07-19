import { createStackNavigator, createAppContainer } from 'react-navigation';
import firebase from 'firebase';
import { Platform } from 'react-native';

import MemoListScreen from './src/screens/MemoListScreen';
import MemoCreateScreen from './src/screens/MemoCreateScreen';
import MemoDetailScreen from './src/screens/MemoDetailScreen';
import MemoEditScreen from './src/screens/MemoEditScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';

require("firebase/firestore");

import ENV from './env.json';

const firebaseConfig = {
  apiKey: ENV.FIREBASE_API_KEY,
  authDomain: ENV.FIREBASE_AUTH_DOMAIN,
  databaseURL: ENV.FIREBASE_DB_URL,
  projectId: ENV.FIREBASE_PRJ_ID,
  storageBucket: ENV.FIREBASE_STRAGE,
  messagingSenderId: ENV.FIREBASE_SENDER_ID,
  appId: ENV.FIREBASE_APP_ID,
};
firebase.initializeApp(firebaseConfig);

const App = createStackNavigator({
  Login:      { screen: LoginScreen },
  Signup:     { screen: SignupScreen },
  Home:       { screen: MemoListScreen },
  MemoDetail: { screen: MemoDetailScreen },
  MemoEdit:   { screen: MemoEditScreen },
  MemoCreate: { screen: MemoCreateScreen },
}, {
  defaultNavigationOptions: {
    headerTitle: 'Memot',
    headerTintColor: '#fff',
    headerBackTitle: null,
    headerStyle: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.5,
      shadowRadius: 3,
      zIndex: 10,
      backgroundColor: '#265366',
      ...Platform.select({
        android: {
          height: 60,
          paddingtop: 16,
        },
      }),
    },
    headerTitleStyle: {
      flex: 1,
      color: '#fff',
      textAlign: 'center',
    },

  },
});

export default createAppContainer(App);
