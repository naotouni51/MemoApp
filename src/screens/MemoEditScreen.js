import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

import firebase from 'firebase';

import CircleButton from '../elements/CircleButton';

class MemoEditScreen extends React.Component {

  state = {
    body: '',
    key: '',
  }

  componentWillMount() {
    console.log(this.props.navigation.state.params);
    const {params} = this.props.navigation.state;
    this.setState({ body: params.memo.body, key: params.memo.key })
  }

  handlePress() {
    const db = firebase.firestore()
    const newDate = firebase.firestore.Timestamp.now();
    const { currentUser } = firebase.auth()
    db.collection(`users/${currentUser.uid}/memos`).doc(this.state.key)
      .update({
        body: this.state.body,
        created_on: newDate,
      })
      .then(() => {
        const { navigation } = this.props;
        navigation.state.params.returnMemo({
          body: this.state.body,
          key: this.state.key,
          created_on: newDate,
        });
      navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return(
      <View style={styles.container}>
        <TextInput
          style={styles.memoEditInput}
          multiline
          value={this.state.body}
          onChangeText={(text) => {this.setState({body: text})}}
          underlineColorAndroid='transparent'
        />
        <CircleButton
          name="check"
          onPress={ () => {this.handlePress()} }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  memoEditInput: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    textAlignVertical: 'top',
    fontSize: 16,
  },
});

export default MemoEditScreen;
