import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import commonStyles from "../commonStyles";
import { Gravatar } from "react-native-gravatar";

const Menu = ({ nome, email, ...props }) => {
  return (
    <DrawerContentScrollView {...props}>
      <SafeAreaView style={styles.headerSafeArea}>
        {/* Using a specific style for SafeAreaView */}
        <View style={styles.header}>
          <Text style={styles.title}>Tasks</Text>
          <Gravatar
            style={styles.avatar}
            options={{
              email: props.email,
              secure: true,
            }}
          />
          <Text style={styles.name}>{nome || "Guilherme"}</Text>
          <Text style={styles.email}>{email || "email@example.com"}</Text>
        </View>
      </SafeAreaView>
      <DrawerItem
        label="Hoje"
        onPress={() => props.navigation.navigate("Today")}
      />
      <DrawerItem
        label="Amanhã"
        onPress={() => props.navigation.navigate("Tomorrow")}
      />
      <DrawerItem
        label="Semana"
        onPress={() => props.navigation.navigate("Week")}
      />
      <DrawerItem
        label="Mês"
        onPress={() => props.navigation.navigate("Month")}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  headerSafeArea: {
    flex: 1,
  },
  header: {
    padding: 15,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
  },
  title: {
    color: "#000",
    fontFamily: commonStyles.fontFamily,
    fontSize: 30,
    paddingBottom: 10,
    padding: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderWidth: 3,
    borderRadius: 30,
    margin: 10,
    backgroundColor: "#222",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  email: {
    fontSize: 16,
    color: "#666",
  },
});

export default Menu;
