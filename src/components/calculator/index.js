import React, { Component, useState } from 'react'
import { SafeAreaView, View, Text, StyleSheet } from 'react-native'
import Display from './Display'
import Keyboard from './keyboard'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/FontAwesome5'

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
  valueMemory: 0,
}

export default class App extends Component {
  
  state = { ...initialState }

  addDigit = n => {
      const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
      
      if (n === '.' && !clearDisplay && this.state.displayValue.includes('.')){
          return
      }

      const currentValue = clearDisplay ? '' : this.state.displayValue
      const displayValue = currentValue + n
      this.setState({ displayValue, clearDisplay: false })

      if (n !== '.'){
          const newValue = parseFloat(displayValue)
          const values = [...this.state.values]
          values[this.state.current] = newValue
          this.setState({ values })
      }
  }

  clearMemory = () => {
      const memory = this.state.valueMemory
      this.setState({ ...initialState })
      this.setState({valueMemory: memory})
  }

  setPositiveNegative = () => {
    const currentValue = this.state.displayValue
    const operation = this.state.operation
    const values = [...this.state.values]

    let newValue = parseFloat(currentValue)

    if (currentValue > 0) {
      newValue = -currentValue
    } else if (currentValue < 0) {
      newValue = Math.abs(currentValue)
    }
    
    if (operation){
      values[1] = newValue
    } else {
      values[0] = newValue
    }

    this.setState({
      displayValue: `${newValue}`,
      values: values,
    })
  }

  setPercente = () => {

    const operation = this.state.operation

    if (!operation) {
      this.clearMemory() 
      return
    }

    const values = this.state.values
    const valuePercente = parseFloat(this.state.displayValue/100)
    const ctrlPercente = !operation ? 0 : 1
    const percentage = eval(`${values[0]} ${'*'} ${valuePercente}`)
    const calculus = ['+', '-'].includes(operation) ? percentage : valuePercente

    try {
      values[0] = parseFloat(eval(`${values[0]} ${operation} ${calculus}`).toFixed(3))
    } catch (e){
      values[0] = this.state.values[0]
    }

    values[1] = 0
    this.setState({
        displayValue: `${values[0]}`,
        operation: ctrlPercente ? null : operation,
        current: ctrlPercente ? 0 : 1,
        clearDisplay: true,
        values: values,
    })
  }

  setBackSpace = () => {
    const values = this.state.values
    const current = this.state.current
    const value = this.state.displayValue.slice(0, -1)
    const valueBack= value.length === 0 ? 0 : value
    
    values[current] = parseFloat(valueBack)
    this.setState({
      displayValue: `${valueBack}`,
      values: values,
    })
  }

  setMemory = operation => {
    
    const memValue = this.state.valueMemory
    const values = [...this.state.values]
    
    if (operation==='C'){
      this.setState({valueMemory: 0})
    } else if (operation === 'R'){
      if (this.state.operation !== null){
        values[1] = memValue
        this.setState({values: values})
      } else {
        values[0] = memValue
        values[1] = 0
      }
      this.setState({
        displayValue: memValue,
        operation: this.state.operation,
        current: 1,
        clearDisplay: true,
        values: values,
      })
    } else {
      this.setState({
        valueMemory: parseFloat(eval(`${memValue} ${operation} ${this.state.displayValue}`).toFixed(3)),
        clearDisplay: true,
      })
    }
  }

  setOperation = operation => {

    const memValue = this.state.valueMemory
    const values = [...this.state.values]

    if (this.state.current === 0){
      this.setState({ operation, current: 1, clearDisplay: true})
    } else {
      if (this.state.values[1] === 0 ){
        this.setState({ operation, current: 1, clearDisplay: true})
      } else {
        const equals = operation === '='
        const values = [...this.state.values]
        try {
          values[0] = parseFloat(eval(`${values[0]} ${this.state.operation} ${values[1]}`).toFixed(3))
        } catch (e) {
          values[0] = this.state.values[0]
        }
        values[1] = 0
        this.setState({
          displayValue: `${values[0]}`,
          operation: equals ? null : operation,
          current: equals ? 0 : 1,
          clearDisplay: true,
          values: values,
        })
      }
    }
  }

  render(){
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient style={styles.container} colors={['#082847', '#082e51', '#00368f']}>
          <View style={[styles.display]}>
            <Display value={this.state.displayValue} memory={this.state.valueMemory} />
          </View>
          <View style={styles.buttons}>
            <Keyboard label="C" keyboard="MC" operation onClick={this.setMemory} />
            <Keyboard label="R" keyboard="MR" operation onClick={this.setMemory} />
            <Keyboard label="+" keyboard="M+" operation onClick={this.setMemory} />
            <Keyboard label="-" keyboard="M-" operation onClick={this.setMemory} />
            <Keyboard label="AC" keyboard="C" onClick={this.clearMemory}/>
            <Keyboard label="+/-" keyboard='+/-' onClick={this.setPositiveNegative} />
            <Keyboard label="%" keyboard={<Icon name="percentage" size={25} />} onClick={this.setPercente} />
            <Keyboard label="/" keyboard={<Icon name="divide" size={25} />} operation onClick={this.setOperation} />
            <Keyboard label="7" onClick={this.addDigit} />
            <Keyboard label="8" onClick={this.addDigit} />
            <Keyboard label="9" onClick={this.addDigit} />
            <Keyboard label="*" keyboard={<Icon name="times" size={25} />} operation onClick={this.setOperation} />
            <Keyboard label="4" onClick={this.addDigit} />
            <Keyboard label="5" onClick={this.addDigit} />
            <Keyboard label="6" onClick={this.addDigit} />
            <Keyboard label="-" keyboard={<Icon name="minus" size={25} />} operation onClick={this.setOperation} />
            <Keyboard label="1" onClick={this.addDigit} />
            <Keyboard label="2" onClick={this.addDigit} />
            <Keyboard label="3" onClick={this.addDigit} />
            <Keyboard label="+" keyboard={<Icon name="plus" size={25} />} operation onClick={this.setOperation} />
            <Keyboard label="0" onClick={this.addDigit} />
            <Keyboard label="." keyboard='.' onClick={this.addDigit} />
            <Keyboard label="bs" keyboard={<Icon name="backspace" size={25} />} onClick={this.setBackSpace} />
            <Keyboard label="=" keyboard={<Icon name="equals" size={25} />} operation onClick={this.setOperation} />
          </View>
        </LinearGradient>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  display: {
    flex: 1,
    marginTop: 10,
  },
  buttons: {
      flexDirection: "row",
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginBottom: 40,
  },
})
