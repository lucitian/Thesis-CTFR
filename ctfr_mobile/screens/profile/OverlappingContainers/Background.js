import { deviceHeight, deviceWidth } from '../helpers/constants';
import { StyleSheet, View, } from 'react-native';
import React from 'react';

const Background = (props) => {
    return (
        <View style={[styles.container]}>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#A18AFF',
      height: deviceHeight,
      width: deviceWidth,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
    },
  })
  
  export default Background;