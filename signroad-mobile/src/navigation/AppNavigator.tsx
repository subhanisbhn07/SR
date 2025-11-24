import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from '../screens/LoginScreen';
import JourneyScreen from '../screens/JourneyScreen';
import DayDetailScreen from '../screens/DayDetailScreen';
import TravelersLogScreen from '../screens/TravelersLogScreen';
import ProfileScreen from '../screens/ProfileScreen';

import { useAuthStore } from '../store/authStore';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Journey') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'TravelersLog') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#10b981',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: '#1f2937',
        },
        headerTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#1f2937',
        },
      })}
    >
      <Tab.Screen 
        name="Journey" 
        component={JourneyScreen}
        options={{ title: 'Your Journey' }}
      />
      <Tab.Screen 
        name="TravelersLog" 
        component={TravelersLogScreen}
        options={{ title: "Traveler's Log" }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { isAuthenticated } = useAuthStore();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1f2937',
          },
          headerTintColor: '#fff',
        }}
      >
        {!isAuthenticated ? (
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen 
              name="MainTabs" 
              component={MainTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="DayDetail" 
              component={DayDetailScreen}
              options={{ title: 'Day Detail' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
