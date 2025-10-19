import { ActivityIndicator, StyleSheet } from "react-native";

import { useAddCatToFavorites } from "@/api/useAddCatToFavorites";
import { useGetCatImages } from "@/api/useGetCatImages";
import ImageSwiper from "@/components/image-swiper";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function HomeScreen() {
    const { isPending, data, refetch } = useGetCatImages();
    const { mutate } = useAddCatToFavorites();
    // const [currentCatIndex, setCurrentCatIndex] = useState(0);

    const addToFavorites = (catID: string) => {
        mutate(catID);
    };

    // if (data && currentCatIndex > data.length - 1) {
    //     refetch();
    //     setCurrentCatIndex(0);
    // }
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
                        addToFavorites={addToFavorites}
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
