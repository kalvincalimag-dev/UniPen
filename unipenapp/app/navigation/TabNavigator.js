import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import AppNavigator from "./AppNavigator";
import Search from "../components/Search";
import { Image, Text, View } from "react-native";

const Tab = createBottomTabNavigator();

const LogoImage = () => (
  <Image
    source={require("../../assets/unipenlogogold.png")}
    style={{ width: 30, height: 30, resizeMode: "cover" }}
  />
);

const HeaderTitle = () => (
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    <LogoImage />
    <Text style={{ fontFamily:'System', color: "white", marginLeft: 10, fontSize: 20, fontWeight: "bold" }}>
      UniPen
    </Text>
  </View>
);

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#1A5D1A",
        },
        headerTintColor: "#EEEEEE",
        headerTitle: HeaderTitle, 
        headerTitleAlign: "center",
        tabBarStyle: {
          backgroundColor: "#1A5D1A",
          borderTopWidth: 0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        tabBarShadowStyle: {
          elevation: 5,
          shadowColor: "black",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
        },
      }}
    >
      <Tab.Screen
        name="Unipen"
        component={AppNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
