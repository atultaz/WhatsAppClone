/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  Octicons,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
} from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, View } from 'react-native';

import Colors from '../constants/Colors';
import ContactsScreen from '../screens/ContactsScreen';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import ChatsScreen from '../screens/ChatsScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import {
  RootStackParamList,
  MainTabParamList,
  RootTabScreenProps,
} from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.light.tint,
          shadowOpacity: 0,
          elevation: 0,
        },
        headerTintColor: Colors.light.background,
        headerTitleAlign: 'left',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name='Root'
        component={MainTabNavigator}
        options={{
          title: 'WhatsApp',
          headerRight: () => (
            <View
              style={{
                flexDirection: 'row',
                width: 60,
                justifyContent: 'space-between',
                marginRight: 10,
              }}
            >
              <Octicons name='search' size={22} color={'white'} />
              <MaterialCommunityIcons
                name='dots-vertical'
                size={22}
                color={'white'}
              />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name='ChatRoom'
        component={ChatRoomScreen}
        options={({ route }) => ({
          title: route.params.name,
          headerRight: () => (
            <View
              style={{
                flexDirection: 'row',
                width: 100,
                justifyContent: 'space-between',
                marginRight: 10,
              }}
            >
              <FontAwesome5 name='video' size={22} color={'white'} />
              <MaterialIcons name='call' size={22} color={'white'} />
              <MaterialCommunityIcons
                name='dots-vertical'
                size={22}
                color={'white'}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen name='Contacts' component={ContactsScreen} />
      <Stack.Screen
        name='NotFound'
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const MainTab = createMaterialTopTabNavigator<MainTabParamList>();

function MainTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <MainTab.Navigator
      initialRouteName='Chats'
      screenOptions={{
        tabBarActiveTintColor: '#fff',
        tabBarShowIcon: true,
        tabBarLabelStyle: {
          fontWeight: 'bold',
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#fff',
          height: 4,
        },
        tabBarStyle: {
          backgroundColor: '#0C6157',
        },
      }}
      // tabBarOptions={{
      //   activeTintColor: Colors[colorScheme].background,
      //   style: {
      //     backgroundColor: Colors[colorScheme].tint,
      //   },
      //   indicatorStyle: {
      //     backgroundColor: Colors[colorScheme].background,
      //     height: 4,
      //   },
      //   labelStyle: {
      //     fontWeight: 'bold',
      //   },
      //   showIcon: true,
      // }}
    >
      <MainTab.Screen
        name='Camera'
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Fontisto name='camera' color={color} size={18} />
          ),
          tabBarLabel: () => null,
        }}
      />
      <MainTab.Screen name='Chats' component={ChatsScreen} />
      <MainTab.Screen name='Status' component={TabTwoNavigator} />
      <MainTab.Screen name='Calls' component={TabTwoNavigator} />
    </MainTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createNativeStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name='TabOneScreen'
        component={ChatsScreen}
        options={{ headerTitle: 'Tab One Title' }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createNativeStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name='TabTwoScreen'
        component={TabTwoScreen}
        options={{ headerTitle: 'Tab Two Title' }}
      />
    </TabTwoStack.Navigator>
  );
}
