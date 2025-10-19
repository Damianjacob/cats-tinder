import { Colors } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

type TabSwitcherProps = {
    selectedTab: "tab1" | "tab2";
    setSelectedTab: (tab: "tab1" | "tab2") => void;
};

const TabSwitcher = ({ selectedTab, setSelectedTab }: TabSwitcherProps) => {
    // const [selectedTab, setSelectedTab] = useState("tab1");

    const handlePress = (tab: "tab1" | "tab2") => {
        setSelectedTab(tab);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.tab]}
                onPress={() => handlePress("tab1")}
            >
                <MaterialCommunityIcons
                    name="fire"
                    color={
                        selectedTab === "tab1"
                            ? Colors.light.tint
                            : Colors.light.textSecondary
                    }
                    size={24}
                    style={{ paddingHorizontal: 8 }}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.tab]}
                onPress={() => handlePress("tab2")}
            >
                <MaterialCommunityIcons
                    color={
                        selectedTab === "tab2"
                            ? Colors.light.tint
                            : Colors.light.textSecondary
                    }
                    name="star"
                    size={24}
                    style={{ paddingHorizontal: 8 }}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderRadius: 20,
        borderColor: "lightgray",
    },
    tab: {
        padding: 10,
        borderWidth: 1,
        // borderColor: "gray",
        borderRadius: 50,
    },
});

export default TabSwitcher;
