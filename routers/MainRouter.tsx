import React from "react";
import Icon from "@expo/vector-icons/FontAwesome5";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import TasksScreen from "../screens/TasksScreen";
import NotesScreen from "../screens/NotesScreen";
import CalendarScreen from "../screens/CalendarScreen";
import MealsScreen from "../screens/MealsScreen";
import ShoppingListScreen from "../screens/ShoppingListScreen";
import { colors } from "../constants/colors";

export default function MainRouter() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='Tasks'
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconName;

            if (route.name === "Tasks") {
              iconName = "tasks";
            } else if (route.name === "Notes") {
              iconName = "sticky-note";
            } else if (route.name === "Calendar") {
              iconName = "calendar-alt";
            } else if (route.name === "Meals") {
              iconName = "utensils";
            } else if (route.name === "ShoppingList") {
              iconName = "shopping-cart";
            }

            return (
              <Icon
                name={iconName}
                size='24'
                color={focused ? colors.main : colors.white}
              />
            );
          },
          activeColor: colors.main,
          inactiveColor: colors.gray,
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.gray,
            borderTopWidth: 0,
            elevation: 0,
          },
        })}
      >
        <Tab.Screen name='Tasks' component={TasksScreen} />
        <Tab.Screen name='Notes' component={NotesScreen} />
        <Tab.Screen name='Calendar' component={CalendarScreen} />
        <Tab.Screen name='Meals' component={MealsScreen} />
        <Tab.Screen name='ShoppingList' component={ShoppingListScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
