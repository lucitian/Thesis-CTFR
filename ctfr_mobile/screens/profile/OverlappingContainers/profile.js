import React, { useContext, useEffect, useState } from 'react';
import { Animated, SafeAreaView, StatusBar, StyleSheet, View, Text } from 'react-native';
import { deviceHeight } from '../helpers/constants';
import BottomContainer from './BottomContainer';
import ImageContainer from './ImageContainer';
import { NavigationEvents } from 'react-navigation'

const OverlappingContainers = (props) => {
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const imageSource = 'https://www.netclipart.com/pp/m/254-2544184_transparent-smile-emoji-png-funny-emoji-faces-png.png'
  const placeHolderContent = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  return (
    <View style={[styles.container]}>
      <StatusBar barStyle='light-content' />
      <SafeAreaView>
        <ImageContainer
          scrollY={scrollY}
          imageHeight={450}
          navigation={props.navigation}
          
        />
        <BottomContainer
          scrollY={scrollY}
          imageHeight={640}
          navigation={props.navigation}
        >
        </BottomContainer>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    display: 'flex',
    flex: 1,
    height: deviceHeight,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
})

export default OverlappingContainers;