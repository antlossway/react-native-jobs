import { Stack } from "expo-router";
import { useCallback } from "react";
import { useFonts } from "expo-font"; //use custom fonts
import * as SplashScreen from "expo-splash-screen";

//splash screen is what displayed when device just switch on
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded] = useFonts({
    DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
  });

  // only hide the splash screen when fonts are loaded
  // it's similar as useEffect, if fontsLoaded does not change, the async function will not be called again when component re-render
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return <Stack onlayout={onLayoutRootView} />;
}
