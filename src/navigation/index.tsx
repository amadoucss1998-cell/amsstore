import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '../store/useAuthStore';
import { AuthNavigator } from './AuthNavigator';
import { AppNavigator } from './AppNavigator';
import { RootStackParamList } from '../types';
import { Colors } from '../theme/colors';

const Stack = createNativeStackNavigator<RootStackParamList>();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.background,
    card: Colors.cardBackground,
    text: Colors.textPrimary,
    border: Colors.border,
    primary: Colors.primary,
    notification: Colors.primary,
  },
};

export const RootNavigator: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
        {isAuthenticated ? (
          <Stack.Screen name="App" component={AppNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
