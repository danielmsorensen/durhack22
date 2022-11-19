import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {SafeAreaProvider} from "react-native-safe-area-context";

import Camera from "./app/screens/Camera";

const Stack = createNativeStackNavigator();

function Root() {
  return (
      <SafeAreaProvider>
          <NavigationContainer>
              <Stack.Navigator screenOptions={{
                headerShown: false
              }}>
                  <Stack.Screen name="Camera" component={Camera} />
              </Stack.Navigator>
          </NavigationContainer>
      </SafeAreaProvider>
  );
}

export default function App() {
  return (
      <Root />
  );
}
