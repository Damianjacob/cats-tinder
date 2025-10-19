import { ActivityIndicator, StyleSheet } from "react-native";

import { useGetCatImages } from "@/api/useGetCatImages";
import ImageSwiper from "@/components/image-swiper";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function HomeScreen() {
    const { isPending, data, refetch } = useGetCatImages();
    // const [currentCatIndex, setCurrentCatIndex] = useState(0);

    // if (data && currentCatIndex > data.length - 1) {
    //     refetch();
    //     setCurrentCatIndex(0);
    // }
    console.log("ispending:", isPending);
    return (
        <ThemedView style={styles.mainContainer}>
            <ThemedView style={{ flex: 2 }}>
                <ThemedView style={{ flex: 1 }}>
                    <ThemedText>Placeholder for top switcher</ThemedText>
                </ThemedView>

                {isPending ? (
                    <ActivityIndicator size={40} />
                ) : (
                    <ImageSwiper
                        cats={data ? data : []}
                        isPending={isPending}
                        nextBatch={() => {
                            console.log("fetching next batch");
                            refetch();
                        }}
                    />
                )}
                {/* )} */}
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
