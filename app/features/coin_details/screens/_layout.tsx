import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen
      name="coin_details_screen"
      options={{
        headerShown: false,
      }}
    />
  </Stack>;
}
