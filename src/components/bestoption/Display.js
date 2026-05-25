import React, { useState, useCallback } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Dimensions,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { calcRegra3, checkFields, compareTo } from './Calcular';
import { useNavigation } from '@react-navigation/native';

const colorUnderline = '#0043e3';
const colorPlaceholder = '#656eff';

const textCentral = 'Coloque as quantidades e valores para ver \nqual produto compensa comprar.';
const eline1 = 'Melhor Opção';
const eline2 = 'Economia';
const eline3 = 'Qto Custaria';
const less3 = 'Deve ser informado pelo menos 3 valores.';
const msgEqu = 'Relação de valores são iguais \n Os valores para esses produtos tem a mesma proporção';

export default function Comparador() {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('');
  const [rline1, setRline1] = useState('');
  const [rline2, setRline2] = useState('');
  const [rline3, setRline3] = useState('');
  const [msgPrincipal, setMsgPrincipal] = useState(textCentral);
  const [showBox, setShowBox] = useState(true);
  const [showBoxes, setShowBoxes] = useState(false);
  const navigation = useNavigation();

  const cleaner = useCallback(() => {
    setValue1('');
    setValue2('');
    setValue3('');
    setValue4('');
    setMsgPrincipal(textCentral);
    setShowBox(true);
    setShowBoxes(false);
  }, []);

  const calcular = useCallback(() => {
    Keyboard.dismiss();
    const v1 = parseFloat(value1);
    const v2 = parseFloat(value2);
    const v3 = parseFloat(value3);
    const v4 = parseFloat(value4);

    const valueList = [v1, v2, v3, v4];

    if (!checkFields(valueList)) {
      setShowBox(true);
      setShowBoxes(false);
      setMsgPrincipal(less3);
      return;
    }

    let r3result = 0;
    if (isNaN(v1)) {
      r3result = calcRegra3(v2, v3, v4);
      setValue1(r3result.toFixed(3).toString());
    } else if (isNaN(v2)) {
      r3result = calcRegra3(v1, v4, v3);
      setValue2(r3result.toFixed(3).toString());
    } else if (isNaN(v3)) {
      r3result = calcRegra3(v1, v4, v2);
      setValue3(r3result.toFixed(3).toString());
    } else if (isNaN(v4)) {
      r3result = calcRegra3(v2, v3, v1);
      setValue4(r3result.toFixed(3).toString());
    } else {
      r3result = calcRegra3(v2, v3, v1);
      const valueP1 = v2 / v1;
      const valueP2 = v4 / v3;
      const bestResult = compareTo(valueP1.toString(), valueP2.toString());

      if (bestResult < 0) {
        setShowBoxes(true);
        setShowBox(false);
        setRline1('Produto 1');
        setRline2(Math.abs((valueP1 - valueP2) * v3).toFixed(2));
      } else if (bestResult > 0) {
        setShowBoxes(true);
        setShowBox(false);
        setRline1('Produto 2');
        setRline2(Math.abs((valueP1 - valueP2) * v1).toFixed(2));
      } else {
        setShowBoxes(false);
        setShowBox(true);
        setMsgPrincipal(msgEqu);
      }
      setRline3(r3result.toFixed(2));
    }
  }, [value1, value2, value3, value4]);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient style={styles.container} colors={['#082847', '#082e51', '#00368f']}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Compara Preço e Volume</Text>
          <Text style={styles.textHeader}>de dois produtos</Text>
        </View>

        <View style={styles.body}>
          {[{ value: value1, setValue: setValue1, placeholder: 'Volume' },
            { value: value2, setValue: setValue2, placeholder: 'Preço' },
            { value: value3, setValue: setValue3, placeholder: 'Volume' },
            { value: value4, setValue: setValue4, placeholder: 'Preço' }].map((input, index) => (
            index % 2 === 0 ? (
              <View style={styles.inputValue} key={index}>
                <TextInput
                  style={styles.textBody}
                  placeholder={input.placeholder}
                  keyboardType="decimal-pad"
                  underlineColorAndroid={colorUnderline}
                  placeholderTextColor={colorPlaceholder}
                  onChangeText={input.setValue}
                  value={input.value}
                />
                <TextInput
                  style={styles.textBody}
                  placeholder={input.placeholder === 'Volume' ? 'Preço' : 'Volume'}
                  keyboardType="decimal-pad"
                  underlineColorAndroid={colorUnderline}
                  placeholderTextColor={colorPlaceholder}
                  onChangeText={index === 0 ? setValue2 : setValue4}
                  value={index === 0 ? value2 : value4}
                />
              </View>
            ) : null
          ))}

          <View style={styles.resultValue}>
            {showBoxes && (
              <>
                <View style={styles.boxResult}>
                  <Text style={styles.textResult}>{eline1}</Text>
                  <Text style={styles.textResult}>{eline2}</Text>
                  <Text style={styles.textResult}>{eline3}</Text>
                </View>
                <View style={styles.boxResult}>
                  <Text style={styles.textResult}>{rline1}</Text>
                  <Text style={styles.textResult}>{rline2}</Text>
                  <Text style={styles.textResult}>{rline3}</Text>
                </View>
              </>
            )}
            {showBox && (
              <View style={styles.boxResultEqu}>
                <Text style={styles.textResult}>{msgPrincipal}</Text>
              </View>
            )}
          </View>

          <View style={styles.inputValue}>
            <TouchableOpacity style={styles.button} onPress={cleaner} accessibilityLabel="Botão para limpar os campos">
              <Text style={styles.textButton}>Limpar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={calcular} accessibilityLabel="Botão para calcular melhor opção">
              <Text style={styles.textButton}>Calcular</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { marginVertical: 20 },
  textHeader: {
    fontSize: 20,
    fontFamily: 'Merienda-Regular',
    textAlign: 'center',
    color: '#fff',
  },
  body: {},
  textBody: {
    fontSize: 16,
    fontFamily: 'Merienda-Regular',
    width: 80,
    color: '#fff',
  },
  inputValue: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 5,
    marginBottom: 10,
  },
  button: {
    width: Dimensions.get('window').width / 3,
    backgroundColor: '#001133',
    borderRadius: 7,
  },
  textButton: {
    fontSize: 20,
    fontFamily: 'Merienda-Regular',
    textAlign: 'center',
    color: '#fff',
  },
  textResult: {
    fontSize: 14,
    fontFamily: 'Merienda-Regular',
    textAlign: 'left',
    color: '#fff',
    padding: 2,
  },
  boxResult: {
    flex: 0.3,
    marginTop: 5,
    padding: 1,
  },
  boxResultEqu: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 20,
    padding: 1,
  },
  resultValue: {
    flexDirection: 'row',
    height: 95,
    justifyContent: 'space-around',
    padding: 5,
  },
});
