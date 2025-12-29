import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { trpc } from '@starter/api-client';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/hooks/use-auth';

export default function HomeScreen() {
  const { user } = useAuth();
  const { data: profile } = trpc.user.getProfile.useQuery();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.content}>
        <View style={styles.header}>
          <ThemedText type="title">Welcome{profile?.name ? `, ${profile.name}` : ''}!</ThemedText>
          <ThemedText style={styles.subtitle}>
            Your React Native + tRPC + Firebase starter is ready.
          </ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle">What's included:</ThemedText>
          <View style={styles.list}>
            <ThemedText style={styles.listItem}>• Firebase Authentication (Google & Apple)</ThemedText>
            <ThemedText style={styles.listItem}>• Firestore database integration</ThemedText>
            <ThemedText style={styles.listItem}>• tRPC API with type-safe endpoints</ThemedText>
            <ThemedText style={styles.listItem}>• Expo Router navigation</ThemedText>
            <ThemedText style={styles.listItem}>• Dark/Light theme support</ThemedText>
            <ThemedText style={styles.listItem}>• Monorepo with Turborepo</ThemedText>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle">Get started:</ThemedText>
          <ThemedText style={styles.hint}>
            Edit app/(tabs)/index.tsx to customize this screen and start building your app.
          </ThemedText>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  header: {
    marginBottom: 32,
    paddingTop: 24,
  },
  subtitle: {
    marginTop: 8,
    opacity: 0.7,
  },
  section: {
    marginBottom: 24,
  },
  list: {
    marginTop: 12,
    gap: 8,
  },
  listItem: {
    opacity: 0.8,
  },
  hint: {
    marginTop: 8,
    opacity: 0.7,
    fontStyle: 'italic',
  },
});
