import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import {
    Login,
    Camera,
    Reviews
} from '@screens';
const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const AppStack = createStackNavigator();

const AuthScreens = () => (
    <AuthStack.Navigator>
        <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
        />
    </AuthStack.Navigator>
);

const AppScreens = () => (
    <AppStack.Navigator>
        <Stack.Screen
            name="Reviews"
            component={Reviews}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="Camera"
            component={Camera}
            options={{ headerShown: false }}
        />
    </AppStack.Navigator>
);

export const Route = () => {
    const token = useSelector((state) => state.userReducer.token);
    return (
        <NavigationContainer>
            {token ?
                (
                    <AppScreens options={{ animationEnabled: false }} />
                ) : (
                    <AuthScreens options={{ animationEnabled: false }} />
                )}
        </NavigationContainer>
    );
};