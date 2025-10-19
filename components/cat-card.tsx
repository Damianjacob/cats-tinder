import { Colors } from "@/constants/theme";
import { Cat } from "@/types/cat";
import React from "react";
import { Image, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

export interface CatCardProps {
    cat: Cat;
    index: number;
    // removeCatFromArray: (catId: string) => void;
}

const CatCard = ({ cat, index }: CatCardProps) => {
    const offset = useSharedValue({ x: 0 });
    const opacity = useSharedValue(1);
    const gesture = Gesture.Pan()
        .onUpdate((e) => {
            offset.value = {
                x: e.translationX,
            };
        })
        .onEnd(() => {
            // isPressed.value = false;
            if (offset.value.x < -20) {
                offset.value = { x: -1000 };
            } else if (offset.value.x > 20) {
                offset.value = { x: 1000 };
            }
        })
        .onFinalize(() => {
            // scheduleOnRN(goToNextCat);
            if (Math.abs(offset.value.x) > 20) {
                //add cat to favorites if swiped right
            }
        });
    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: withSpring(offset.value.x),
                },
            ],
            opacity: opacity.value,
        };
    });
    return (
        <GestureDetector gesture={gesture} key={cat.id}>
            <Animated.View style={[styles.container, animatedStyles]}>
                {/* <ThemedView style={[styles.cardContainer, { zIndex: index }]}> */}
                <Image
                    source={{ uri: cat.url }}
                    style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 16,
                        backgroundColor: Colors.light.background,
                    }}
                    resizeMode="cover"
                />
                <ThemedView style={styles.infoCard}>
                    <ThemedView
                        style={[
                            styles.row,
                            {
                                borderTopLeftRadius: 16,
                                borderTopRightRadius: 16,
                            },
                        ]}
                    >
                        <ThemedText style={styles.headerText}>
                            {cat.breeds?.[0]?.name ?? "Unknown"}
                        </ThemedText>
                        <ThemedText style={styles.headerText}>
                            {cat.breeds?.[0]?.weight?.metric ?? "Unknown"}
                        </ThemedText>
                    </ThemedView>
                    <ThemedView style={styles.row}>
                        <ThemedText style={styles.descriptionText}>
                            {cat.breeds?.[0]?.origin ?? "Unknown Origin"}
                        </ThemedText>
                    </ThemedView>
                </ThemedView>
            </Animated.View>
        </GestureDetector>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 4,
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    cardContainer: {
        margin: 16,
        backgroundColor: "blue",
        elevation: 4,
        borderRadius: 16,
        flex: 1,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 12,
        paddingVertical: 2,
    },
    headerText: {
        fontWeight: "bold",
        fontSize: 16,
    },
    descriptionText: {
        fontSize: 12,
        color: Colors.light.textSecondary,
    },

    infoCard: {
        position: "absolute",
        zIndex: 10,
        bottom: 0,
        left: 16,
        right: 16,
        borderRadius: 16,
    },
});

export default CatCard;
