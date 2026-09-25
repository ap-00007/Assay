import { Redirect } from 'expo-router';

// Entry point: redirect immediately to the FinCopilot splash screen
export default function Index() {
  return <Redirect href="/splash" />;
}
