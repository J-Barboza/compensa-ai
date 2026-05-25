// Mensagens padrão e textos reutilizáveis
export const MESSAGES = {
  DEFAULT: "Coloque as quantidades de valores para ver \nqual produto compensa comprar.",
  DISPLAY: "Compara Preço e Volume",
  LESS_THAN_THREE: "Deve ser informado pelo menos 3 valores.",
  PROD1_QTD_GT: "A quantidade do Produto 1 deve ser maior que",
  PROD1_VAL_LT: "O Valor do Produto 1 deve ser menor que",
  PROD2_QTD_GT: "A quantidade do Produto 2 deve ser maior que",
  PROD2_VAL_LT: "O valor do Produto 2 deve ser menor que",
  EQUAL_RATIO: "Relação de valores são iguais \n Os valores para esses produtos têm a mesma proporção",
  PROD1: "produto 1",
  PROD2: "produto 2",
  BEST_OPTION: "Melhor Opção",
  ECONOMY: "Economia",
  PROPORTIONAL: "Proporcional",
};

// Regra de três simples
export function calcRegra3(valor1, valor2, valor3) {
  return (valor1 * valor2) / valor3;
}

// Valida se pelo menos 3 valores foram preenchidos corretamente
export function checkFields(values) {
  const emptyCount = values.filter((v) => isNaN(v)).length;
  return emptyCount < 2;
}

// Compara dois valores numéricos e retorna -1, 0 ou 1
export function compareTo(val1, val2) {
  const num1 = parseFloat(val1);
  const num2 = parseFloat(val2);

  if (isNaN(num1) || isNaN(num2)) return 0;
  if (num1 < num2) return -1;
  if (num1 > num2) return 1;
  return 0;
}
