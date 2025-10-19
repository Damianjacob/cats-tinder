import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import CatCard from "./cat-card";
import { ThemedView } from "./themed-view";
export interface ImageSwitchableProps {
    cats: CatData[];
    isPending: boolean;
    nextBatch?: () => void;
}

export interface CatData {
    id: string;
    url: string;
    breeds?: {
        name?: string;
        origin?: string;
        weight?: { metric: string; imperial: string };
    }[];
}

const ImageSwiper = ({ cats, isPending, nextBatch }: ImageSwitchableProps) => {
    if (isPending) {
        return (
            <ThemedView
                style={[styles.container, { justifyContent: "center" }]}
            >
                <ActivityIndicator size={40} />
            </ThemedView>
        );
    }
    return (
        <ThemedView style={styles.container}>
            {cats
                .map((cat, index) => {
                    return (
                        <CatCard
                            cat={cat}
                            index={index}
                            key={cat.id}
                            nextbatch={
                                index === cats.length - 1
                                    ? nextBatch
                                    : undefined
                            }
                        />
                    );
                })
                .reverse()}

            {/* <CatCard cat={cat} /> */}
        </ThemedView>
    );
};

export default ImageSwiper;

const styles = StyleSheet.create({
    container: {
        flex: 4,
        height: "100%",
        paddingHorizontal: 16,
        alignItems: "center",
    },
});
