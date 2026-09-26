import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera, User as UserIcon } from 'lucide-react-native';
import { COLORS } from '../../constants/theme';
import { AvatarService } from '../../services/avatarStorage';

interface ProfileAvatarProps {
  size?: number;
  seed?: string;
  editable?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function ProfileAvatar({
  size = 80,
  seed,
  editable = false,
  style,
}: ProfileAvatarProps) {
  const [customUri, setCustomUri] = useState<string | null>(AvatarService.getCustomUri());
  
  // Single source of truth: use global active index from AvatarService for current user
  const [avatarIndex, setAvatarIndex] = useState<number>(() => {
    if (seed && !seed.toLowerCase().includes('ashish')) {
      return AvatarService.getIndexForSeed(seed);
    }
    return AvatarService.getAvatarIndex();
  });

  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const unsubscribe = AvatarService.subscribe((uri, idx) => {
      setCustomUri(uri);
      // Only update index if this avatar instance tracks the global current user
      if (!seed || seed.toLowerCase().includes('ashish')) {
        setAvatarIndex(idx);
      }
      setImageError(false);
    });
    return unsubscribe;
  }, [seed]);

  const handlePickImage = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Permission Needed', 'Please allow photo access to upload a profile photo or brand logo.');
        return;
      }

      setLoading(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.9,
      });

      setLoading(false);
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        AvatarService.setCustomUri(uri);
        setImageError(false);
      }
    } catch (e) {
      setLoading(false);
      Alert.alert('Upload Error', 'Could not access device photos.');
    }
  };

  const handleTakePhoto = async () => {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Permission Needed', 'Please allow camera access to take a profile photo.');
        return;
      }

      setLoading(true);
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.9,
      });

      setLoading(false);
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        AvatarService.setCustomUri(uri);
        setImageError(false);
      }
    } catch (e) {
      setLoading(false);
      Alert.alert('Camera Error', 'Could not open camera.');
    }
  };

  const handleShuffleAvatar = () => {
    AvatarService.shuffle();
  };

  const handleResetDefault = () => {
    AvatarService.resetDefault(seed || 'Ashish');
  };

  const handleEditPress = () => {
    Alert.alert(
      'Profile Avatar & Logo',
      'Choose how you want your profile represented in Assay:',
      [
        {
          text: 'Upload Photo or Brand Logo',
          onPress: handlePickImage,
        },
        {
          text: 'Take a Photo',
          onPress: handleTakePhoto,
        },
        {
          text: 'Shuffle 3D Memoji',
          onPress: handleShuffleAvatar,
        },
        {
          text: 'Reset to Default Memoji',
          onPress: handleResetDefault,
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  const avatarSource = customUri
    ? { uri: customUri }
    : AvatarService.getMemojiAsset(avatarIndex);

  // Optical sizing:
  // - Custom uploaded photos/logos fill 100% of the circle (size)
  // - 3D Memojis have built-in transparent padding in raw assets, so 1.22x zoom perfectly balances
  //   the face within the frame without cutting off hair or chin.
  const innerImgSize = customUri ? size : Math.round(size * 1.22);

  return (
    <View style={[{ width: size, height: size }, style]}>
      <View
        style={[
          styles.container,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: '#F1F5F9',
          },
        ]}
      >
        {imageError ? (
          <View style={[styles.fallback, { width: size, height: size, borderRadius: size / 2 }]}>
            <UserIcon color="#64748B" size={Math.round(size * 0.45)} />
          </View>
        ) : (
          <Image
            source={avatarSource}
            style={{
              width: innerImgSize,
              height: innerImgSize,
              borderRadius: customUri ? size / 2 : 0,
            }}
            resizeMode="contain"
            onError={() => setImageError(true)}
          />
        )}

        {loading && (
          <View style={[styles.loadingOverlay, { borderRadius: size / 2 }]}>
            <ActivityIndicator size="small" color={COLORS.primary} />
          </View>
        )}
      </View>

      {editable && (
        <TouchableOpacity
          style={[
            styles.cameraPill,
            {
              width: Math.max(28, Math.round(size * 0.35)),
              height: Math.max(28, Math.round(size * 0.35)),
              borderRadius: Math.max(14, Math.round(size * 0.175)),
            },
          ]}
          activeOpacity={0.8}
          onPress={handleEditPress}
          accessibilityLabel="Edit profile avatar or upload logo"
        >
          <Camera color="#FFFFFF" size={Math.round(size * 0.18)} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  fallback: {
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraPill: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: COLORS.primary,
    borderWidth: 2.5,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 3,
    elevation: 3,
  },
});
