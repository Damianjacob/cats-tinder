import { ActivityIndicator, StyleSheet } from "react-native";

import { useAddCatToFavorites } from "@/api/useAddCatToFavorites";
import { useGetCatImages } from "@/api/useGetCatImages";
import { useGetFavorites } from "@/api/useGetFavorites";
import ActionButton from "@/components/action-button";
import ImageSwiper, { CatData } from "@/components/image-swiper";
import TabSwitcher from "@/components/tab-switcher";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useEffect, useState } from "react";

export default function HomeScreen() {
    const { isPending, data, refetch } = useGetCatImages();
    const { mutate } = useAddCatToFavorites();
    const [selectedTab, setSelectedTab] = useState<"tab1" | "tab2">("tab1");

    const { data: favorites } = useGetFavorites();

    const [cats, setCats] = useState<CatData[]>(data ? data : []);
    useEffect(() => {
        if (data) {
            setCats(data);
        }
    }, [data]);
    const removeFirstCat = () => {
        setCats((prevCats) => prevCats.slice(1));
    };

    const addToFavorites = (catID: string) => {
        mutate(catID);
    };

    return (
        <ThemedView style={styles.mainContainer}>
            <ThemedView style={{ flex: 2 }}>
                <ThemedView style={{ flex: 1 }}>
                    <TabSwitcher
                        selectedTab={selectedTab}
                        setSelectedTab={setSelectedTab}
                    />
                </ThemedView>

                {selectedTab === "tab1" ? (
                    isPending ? (
                        <ActivityIndicator size={40} />
                    ) : (
                        <ImageSwiper
                            cats={cats ? cats : []}
                            isPending={isPending}
                            nextBatch={() => {
                                console.log("fetching next batch");
                                refetch();
                            }}
                            addToFavorites={addToFavorites}
                            removeFirstCat={removeFirstCat}
                            currentCatIndex={0}
                        />
                    )
                ) : (
                    <ThemedView style={{ flex: 1, padding: 16 }}>
                        <ThemedText>
                            {favorites.map((favorite) => favorite.name)}
                        </ThemedText>
                    </ThemedView>
                )}
            </ThemedView>
            <ThemedView style={{ flex: 1 }}>
                <ThemedView
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        gap: 16,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <ActionButton
                        iconName="window-close"
                        color="#E16359"
                        onPress={() => {
                            removeFirstCat();
                        }}
                    />
                    <ActionButton
                        iconName="cards-heart"
                        color="#6BD88E"
                        onPress={() => {
                            if (cats.length > 0) {
                                console.log(cats[0].id);
                                addToFavorites(cats[0].id);
                                removeFirstCat();
                            }
                        }}
                    />
                </ThemedView>
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
});
