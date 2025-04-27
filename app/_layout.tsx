import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import "./globals.css";
import { AuthProvider } from "./contexts/AuthContext";
import Navigation from "./navigation";

export default function RootLayout() {
  return(
    <>
      <StatusBar hidden={true} />
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </>
  );
}
