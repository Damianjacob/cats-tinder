import { Tabs } from "expo-router";
import React from "react";

import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <GestureHandlerRootView>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
                    headerShown: false,
                    tabBarStyle: {
                        marginBottom: 24,
                        marginHorizontal: 64,
                        borderRadius: 50,
                        position: "absolute",
                        bottom: 20,
                        elevation: 4,
                        height: 60,
                    },
                    tabBarItemStyle: {
                        marginBottom: 0,
                        paddingBottom: 0,
                        elevation: 0,
                    },
                    tabBarIconStyle: {
                        marginTop: 8,
                    },
                    tabBarShowLabel: false,
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: "Home",
                        tabBarIcon: ({ color, focused }) => (
                            <MaterialCommunityIcons
                                name={focused ? "paw" : "paw-outline"}
                                size={28}
                                color={color}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="chats"
                    options={{
                        title: "Chats",
                        tabBarIcon: ({ color, focused }) => (
                            <MaterialCommunityIcons
                                name={focused ? "chat" : "chat-outline"}
                                size={28}
                                color={color}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: "Profile",
                        tabBarIcon: ({ color, focused }) => (
                            <MaterialCommunityIcons
                                name={focused ? "account" : "account-outline"}
                                size={28}
                                color={color}
                            />
                        ),
                    }}
                />
            </Tabs>
        </GestureHandlerRootView>
    );
}
