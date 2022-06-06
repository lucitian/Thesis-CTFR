import React, { useContext, useEffect, useState } from 'react';
import { Animated, SafeAreaView, StatusBar, StyleSheet, View, Text, Dimensions } from 'react-native';
import { deviceHeight, deviceWidth } from '../helpers/constants';
import BottomContainer from './BottomContainer';
import ImageContainer from './ImageContainer';
import Background from './Background';
import { Context as AuthContext } from '../../../context/UserContext'

const OverlappingContainers = (props) => {
  const [scrollY, setScrollY] = useState(new Animated.Value(0));

  return (
    <View style={[styles.container]}>
      <StatusBar barStyle='light-content' />
      <SafeAreaView>
        <Background>
        </Background>
        <ImageContainer
          scrollY={scrollY}
          imageHeight={450}
          navigation={props.navigation}
          
        />
        <BottomContainer
          scrollY={scrollY}
          imageHeight={600}
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