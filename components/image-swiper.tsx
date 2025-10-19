import { Colors } from "@/constants/theme";
import React from "react";
import { Image, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import { ThemedView } from "./themed-view";
export interface ImageSwitchableProps {
    imageUrl: string;
}

const ImageSwiper = ({ imageUrl }: ImageSwitchableProps) => {
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
                </ThemedView>
            </Animated.View>
        </GestureDetector>
    );
};

export default ImageSwiper;

const styles = StyleSheet.create({
    container: {
        flex: 4,
        backgroundColor: "red",
    },
    cardContainer: {
        margin: 16,
    },
});
