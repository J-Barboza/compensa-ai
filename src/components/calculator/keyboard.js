// Keyboard.js atualizado com efeito visual
import React from 'react';
import { Text, View, Dimensions, StyleSheet, Pressable } from 'react-native';

export default props => {
  const digit = !isNaN(props.label) ? props.label : props.keyboard;

  return (
    <Pressable
      onPress={() => props.onClick(props.label)}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed
      ]}
    >
      <View>
        <Text style={props.operation ? styles.textOperationButton : styles.textButton}>
          {digit}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: (Dimensions.get("window").width - 100) / 4,
    width: (Dimensions.get("window").width - 20) / 4,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonPressed: {
    backgroundColor: '#294175',
    borderRadius: 6,
  },
  textButton: {
    fontSize: 30,
    fontWeight: "bold",
    color: '#fff',
  },
  textOperationButton: {
    color: '#fa8231',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
