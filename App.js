import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';

import Appbar from './src/components/Appbar';
import MemoEditScreen from './src/screens/MemoEditScreen';


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Appbar />
        <MemoEditScreen />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 78,
    backgroundColor: '#FFFDF6',
  },
});
