import React, { Component } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import Stack from './Stack'

export default (props) => (
    <SafeAreaView style={styles.container}>
        <NavigationContainer>
            <Stack />
        </NavigationContainer>
    </SafeAreaView>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})