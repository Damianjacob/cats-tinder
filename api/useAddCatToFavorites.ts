import { SUB_ID } from "@/constants/api";
import { useMutation } from "@tanstack/react-query";

export const useAddCatToFavorites = () => {
    const mutation = useMutation({
        mutationFn: async (imageId: string) => {
            const response = await fetch(
                "https://api.thecatapi.com/v1/favourites",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": process.env.EXPO_PUBLIC_API_KEY ?? "",
                    },
                    body: JSON.stringify({
                        image_id: imageId,
                        sub_id: SUB_ID,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        },
    });
    return mutation;
};
