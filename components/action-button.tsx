import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedView } from "./themed-view";

type ActionButtonProps = {
    iconName?: "window-close" | "cards-heart";
    color?: string;
    onPress?: () => void;
};

export default function ActionButton({
    iconName,
    color,
    onPress,
}: ActionButtonProps) {
    return (
        <TouchableOpacity onPress={onPress}>
            <ThemedView style={styles.buttonContainer}>
                <MaterialCommunityIcons
                    name={iconName}
                    size={40}
                    color={color}
                />
            </ThemedView>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        elevation: 4,
        borderRadius: 50,
        marginHorizontal: 24,
        padding: 4,
    },
});
