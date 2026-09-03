import { Stack } from 'expo-router';
import { useFonts, AnticDidone_400Regular } from '@expo-google-fonts/antic-didone';
import { 
  DMSans_400Regular, 
  DMSans_500Medium, 
  DMSans_600SemiBold, 
  DMSans_700Bold 
} from '@expo-google-fonts/dm-sans';
import { Inter_400Regular, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { COLORS } from '../constants/theme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    AnticDidone_400Regular,
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_600SemiBold,
    DMSans_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="transaction/[id]" options={{ presentation: 'modal' }} />
      <Stack.Screen name="split/index" options={{ presentation: 'modal' }} />
      <Stack.Screen name="ai/index" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
