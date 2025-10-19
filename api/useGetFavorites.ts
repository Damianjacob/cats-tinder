import { SUB_ID } from "@/constants/api";
import { useQuery } from "@tanstack/react-query";

export const useGetCatImages = () => {
    const query = useQuery({
        queryKey: getCatImagesQueryKey(),
        queryFn: async () => {
            const response = await fetch(
                `https://api.thecatapi.com/v1/favourites?sub_id=${SUB_ID}`,
                {
                    headers: {
                        "x-api-key": process.env.EXPO_PUBLIC_API_KEY ?? "",
                    },
                }
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        },
    });
    return query;
};

export const getCatImagesQueryKey = () => {
    return ["get-favorites"];
};
