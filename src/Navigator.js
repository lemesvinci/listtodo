import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { SafeAreaProvider } from "react-native-safe-area-context"; // Import SafeAreaProvider

import Auth from "./screens/Auth";
import TaskList from "./screens/TaskList";
import Menu from "./screens/Menu";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator({ route }) {
  const { nome, email } = route.params || {};

  return (
    <Drawer.Navigator
      initialRouteName="Today"
      drawerContent={(props) => <Menu {...props} nome={nome} email={email} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          paddingTop: 0,
          borderRightWidth: 0,
        },
      }}
    >
      <Drawer.Screen name="Today" options={{ title: "Hoje" }}>
        {(props) => <TaskList title="Hoje" daysAhead={0} {...props} />}
      </Drawer.Screen>

      <Drawer.Screen name="Tomorrow" options={{ title: "Amanhã" }}>
        {(props) => <TaskList title="Amanhã" daysAhead={1} {...props} />}
      </Drawer.Screen>

      <Drawer.Screen name="Week" options={{ title: "Semana" }}>
        {(props) => <TaskList title="Semana" daysAhead={7} {...props} />}
      </Drawer.Screen>

      <Drawer.Screen name="Month" options={{ title: "Mês" }}>
        {(props) => <TaskList title="Mês" daysAhead={30} {...props} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Auth"
        >
          <Stack.Screen
            name="Auth"
            component={Auth}
            options={{ title: "Autenticação" }}
          />
          <Stack.Screen
            name="Home"
            component={DrawerNavigator}
            options={{ title: "Lista de Tarefas" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
