import React, { useLayoutEffect } from "react"
import { createStackNavigator } from '@react-navigation/stack'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCalculator } from  '@fortawesome/free-solid-svg-icons/faCalculator'
import BestOption from '../components/bestoption/Display'
import Calculator from '../components/calculator'
import { StyleSheet, Text, TouchableOpacity } from "react-native"

const Stack = createStackNavigator()

function CallBestOption({navigation}){
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Calculadora')}>
                    <Text style={styles.iconCalc}>
                        <FontAwesomeIcon icon={ faCalculator } size={35} color='#1976d2' />
                    </Text>
                </TouchableOpacity>
            ),
            headerTitle: "Best Option",
            headerTitleAlign: 'left',
            headerStyle: {
                backgroundColor: '#032240',
            },
            headerTitleStyle: {
                fontFamily: 'Merienda-Regular',
                fontSize: 20,
                color: '#fff',
            }
        })
    }, [navigation])
    return (
        <BestOption />
    )
}

function CallCalculator({navigation}){
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Calculadora",
            headerStyle: {
                backgroundColor: '#032240',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontFamily: 'Merienda-Regular',
                fontSize: 20,
                color: '#fff',
            }
        })
    }, [navigation])
    return (
        <Calculator />
    )
}

function App () {
    return (
        <Stack.Navigator
            initialRouteName="BestOption" >
            <Stack.Screen
                name="BestOption"
                component={CallBestOption}
            />

            <Stack.Screen 
                name="Calculadora"
                component={CallCalculator}
            />
        </Stack.Navigator>

    )
}

export default App

const styles = StyleSheet.create({
    iconCalc: {
        marginRight: 10,
    },
})
