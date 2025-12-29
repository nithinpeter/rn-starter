import Constants from 'expo-constants';

export const ENV = {
  API_URL: Constants.expoConfig?.extra?.apiUrl ?? 'https://flow-kit-api.onrender.com',
};
