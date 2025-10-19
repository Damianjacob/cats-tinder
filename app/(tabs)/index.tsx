import { Button, StyleSheet } from "react-native";

import { useGetCatImages } from "@/api/useGetCatImages";
import ImageSwiper from "@/components/image-swiper";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useState } from "react";

export default function HomeScreen() {
    const { isPending, data, refetch } = useGetCatImages();
    const [currentCatIndex, setCurrentCatIndex] = useState(0);

    if (data && currentCatIndex > data.length - 1) {
        refetch();
        setCurrentCatIndex(0);
    }
    console.log("current cat index:", currentCatIndex);

    return (
        <ThemedView style={styles.mainContainer}>
            <ThemedView style={{ flex: 2 }}>
                <ThemedView style={{ flex: 1 }}>
                    <ThemedText>Placeholder for top switcher</ThemedText>
                </ThemedView>

                {data && data.length > 0 && (
                    <ImageSwiper
                        cats={data}
                        nextCat={() => {
                            console.log("next cat");
                            setCurrentCatIndex((prev) => prev + 1);
                        }}
                        isPending={isPending}
                    />
                )}
            </ThemedView>
            <ThemedView style={{ flex: 1 }}>
                <ThemedText>Placeholder for buttons</ThemedText>
            </ThemedView>
            <Button
                title="next cat "
                onPress={() => {
                    setCurrentCatIndex((prev) => prev + 1);
                }}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
});
