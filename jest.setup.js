import 'react-native-gesture-handler/jestSetup';

// Silence native animated warnings and provide mocks
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

// Light stubs for icon libraries to avoid native lookups
jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: 'FontAwesomeIcon',
}));
