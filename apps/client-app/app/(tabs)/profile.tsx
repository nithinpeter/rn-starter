import { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';

import { trpc } from '@starter/api-client';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/hooks/use-auth';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const { data: profile, isLoading, refetch } = trpc.user.getProfile.useQuery();
  const updateProfile = trpc.user.updateProfile.useMutation({
    onSuccess: () => refetch(),
  });

  const [name, setName] = useState('');

  useEffect(() => {
    if (profile) {
      setName(profile.name ?? '');
    }
  }, [profile]);

  const handleSave = async () => {
    await updateProfile.mutateAsync({ name: name || null });
  };

  const getInitials = (): string => {
    const displayName = profile?.name || user?.displayName || user?.email || '?';
    return displayName.charAt(0).toUpperCase();
  };

  if (isLoading) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.tint} />
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <ThemedText type="title">Profile</ThemedText>
          </View>

          <View style={styles.avatarSection}>
            {profile?.photoURL ? (
              <Image source={{ uri: profile.photoURL }} style={styles.avatar} contentFit="cover" />
            ) : (
              <View style={[styles.avatar, styles.avatarPlaceholder, { backgroundColor: colors.tint }]}>
                <ThemedText style={styles.avatarText}>{getInitials()}</ThemedText>
              </View>
            )}
          </View>

          <View style={styles.section}>
            <View style={styles.field}>
              <ThemedText style={styles.label}>Name</ThemedText>
              <TextInput
                style={[styles.input, { color: colors.text, borderColor: colors.border }]}
                value={name}
                onChangeText={setName}
                onBlur={handleSave}
                placeholder="Enter your name"
                placeholderTextColor={colors.icon}
              />
            </View>

            <View style={styles.field}>
              <ThemedText style={styles.label}>Email</ThemedText>
              <View style={[styles.readOnlyField, { borderColor: colors.border }]}>
                <ThemedText style={{ opacity: 0.7 }}>{profile?.email || 'No email'}</ThemedText>
              </View>
            </View>
          </View>

          <View style={styles.footer}>
            <Pressable
              style={[styles.logoutButton, { borderColor: colors.error }]}
              onPress={signOut}>
              <ThemedText style={[styles.logoutButtonText, { color: colors.error }]}>
                Log Out
              </ThemedText>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 16,
    gap: 20,
  },
  field: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.7,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
  },
  readOnlyField: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
  },
  footer: {
    padding: 16,
    paddingTop: 32,
    paddingBottom: 32,
  },
  logoutButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  logoutButtonText: {
    fontWeight: '600',
  },
});
