import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { PropsWithChildren } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
interface Props extends PropsWithChildren {}
const queryClient = new QueryClient();

export default function Providers({ children }: Props) {
    return (
        <GestureHandlerRootView>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </GestureHandlerRootView>
    );
}
