import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen
      name="market_screen"
      options={{
        headerShown: false,
      }}
    />
  </Stack>;
}
