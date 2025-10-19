import { Colors } from "@/constants/theme";
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
export interface ImageSwitchableProps {
    imageUrl: string;
    // age: string;
    // race: string;
    // country: string;
}

const ImageSwiper = ({
    imageUrl,
}: // race,
// age,
// country,
ImageSwitchableProps) => {
    const offset = useSharedValue({ x: 0 });

    const gesture = Gesture.Pan()
        .onUpdate((e) => {
            offset.value = {
                x: e.translationX,
            };
        })
        .onEnd(() => {
            // isPressed.value = false;
            if (offset.value.x < -20) {
                offset.value = { x: -500 };
            } else if (offset.value.x > 20) {
                offset.value = { x: 500 };
            } else {
                offset.value = { x: 0 };
            }
        })
        .onFinalize(() => {
            offset.value = { x: 0 };
        });
    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: withSpring(offset.value.x) }],
        };
    });

    return (
        <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.container, animatedStyles]}>
                <ThemedView style={styles.cardContainer}>
                    <Image
                        source={{ uri: imageUrl }}
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
                                {/* {race} */}
                                Race ph
                            </ThemedText>
                            <ThemedText style={styles.headerText}>
                                {/* {age} */}
                                age ph
                            </ThemedText>
                        </ThemedView>
                        <ThemedView style={styles.row}>
                            <ThemedText style={styles.descriptionText}>
                                {/* {country} */}
                                country ph
                            </ThemedText>
                        </ThemedView>
                    </ThemedView>
                </ThemedView>
            </Animated.View>
        </GestureDetector>
    );
};

export default ImageSwiper;

const styles = StyleSheet.create({
    container: {
        flex: 4,
        // backgroundColor: "red",
        // elevation: 4,
    },
    cardContainer: {
        margin: 16,
        backgroundColor: "blue",
        elevation: 4,
        borderRadius: 16,
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
