import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MenuButton from '../components/MenuButton';

export default class Settings extends React.Component {
  render() {
    return (
      <View style={styles.container}>
          <MenuButton onPress={() => { this.props.navigation.toggleDrawer(); }} />
        <Text style={styles.text}>Settings</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});