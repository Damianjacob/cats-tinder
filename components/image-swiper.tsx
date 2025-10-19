import React from "react";
import { StyleSheet } from "react-native";
import CatCard from "./cat-card";
export interface ImageSwitchableProps {
    cats: CatData[];
    nextCat: () => void;
    isPending: boolean;
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

const ImageSwiper = ({ cats, nextCat, isPending }: ImageSwitchableProps) => {
    // const [remainingCats, setRemainingCats] = useState<CatData[]>([...cats]);

    // const removeCatFromArray = (catId: string) => {
    //     setRemainingCats((current) =>
    //         current.filter((cat) => cat.id !== catId)
    //     );
    //     nextCat(); // Call the parent's nextCat function to fetch more data if needed
    // };
    return (
        <>
            {cats
                .map((cat, index) => {
                    return <CatCard cat={cat} index={index} key={cat.id} />;
                })
                .reverse()}

            {/* <CatCard cat={cat} /> */}
        </>
    );
};

export default ImageSwiper;

const styles = StyleSheet.create({
    container: {
        flex: 4,
        position: "absolute",
        width: "100%",
        height: "100%",
    },
});
