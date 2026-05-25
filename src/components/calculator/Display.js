import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function Display({ memory, value }) {
  return (
    <View style={styles.display}>
      <View style={styles.viewMemory}>
        {memory !== '0' && (
          <Text style={styles.displayMemory}>
            M: {memory}
          </Text>
        )}
      </View>
      <View style={styles.viewDigit}>
        <Text style={styles.displayText} numberOfLines={1}>
          {value}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  display: {
    marginTop: 10,
    marginHorizontal: 20,
    backgroundColor: '#1565C0',
    borderColor: '#002f6c',
    borderWidth: 1,
    borderRadius: 8,
  },
  displayText: {
    fontSize: 40,
    color: '#fff',
    textAlign: 'right',
    marginRight: 18,
    fontFamily: 'Merienda-Regular',
  },
  displayMemory: {
    color: '#f5f5f5',
    fontSize: 14,
    fontStyle: 'italic',
  },
  viewMemory: {
    paddingHorizontal: 10,
    paddingTop: 4,
  },
  viewDigit: {
    padding: 10,
  },
});
