import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import firebase from 'firebase';

import MemoList from '../components/MemoList';
import CircleButton from '../elements/CircleButton';

class MemoListScreen extends React.Component {

  constructor(props) {
  super(props)

  global.__old_console_warn = global.__old_console_warn || console.warn;
  global.console.warn = (...args) => {
    let tst = (args[0] || '') + '';
    if (tst.startsWith('Setting a timer')) {
      return;
    }
    return global.__old_console_warn.apply(console, args);
  };
}

  state = {
    memoList: [],
  }

  componentWillMount() {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    db.collection(`users/${currentUser.uid}/memos`)
      .get()
      .then((snapshot) => {
        const memoList = [];
        snapshot.forEach((doc) => {
          memoList.push({ ...doc.data(), key: doc.id });
        });
        this.setState({ memoList });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handlePress() {
    this.props.navigation.navigate('MemoCreate')
  }

  render() {
    return (
      <View style={styles.container}>
        <MemoList memoList={this.state.memoList} navigation={this.props.navigation} />
        <CircleButton name="plus" onPress={() => {this.handlePress()}} />
      </View>
    );
  }
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFFDF6',
  },
});

export default MemoListScreen;
