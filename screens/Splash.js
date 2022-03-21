import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Image, StyleSheet } from 'react-native-web'
import Home from './Home';

const styles = StyleSheet.create({
    tinyLogo: {
        width: '100%',
        height: '926px',
    },
});
export default function Splash({ navigation }) {


    const myTimeout = setTimeout(ChangeScreens, 500);

    function ChangeScreens() {
        navigation.navigate('Home')
    }

    return (
        <View>

            <Image
                style={styles.tinyLogo}
                source={require('../assets/splash.png')}
            />
        </View>
    )

}