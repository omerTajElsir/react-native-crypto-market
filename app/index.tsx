import React from "react";
import { Redirect } from "expo-router";

/**
 * Index screen that redirects to the appropriate screen based on authentication status
 * The actual navigation logic is handled by the Navigation component in app/navigation/index.tsx
 */
export default function Index() {
    // Redirect to the root of the app, which will be handled by our Navigation component
    return <Redirect href="/" />;
}
