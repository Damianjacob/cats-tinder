import { StyleSheet } from "react-native";

import ImageSwiper from "@/components/image-swiper";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function HomeScreen() {
    return (
        <ThemedView style={styles.mainContainer}>
            <ThemedView style={{ flex: 2 }}>
                <ThemedView style={{ flex: 1 }}>
                    <ThemedText>Placeholder for top switcher</ThemedText>
                </ThemedView>
                <ImageSwiper imageUrl="https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg" />
            </ThemedView>
            <ThemedView style={{ flex: 1 }}>
                <ThemedText>Placeholder for buttons</ThemedText>
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
});
