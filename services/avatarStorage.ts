import { MEMOJI_ASSETS, TOTAL_MEMOJIS } from '../constants/memojis';

type AvatarListener = (customUri: string | null, avatarIndex: number) => void;

function getAvatarIndexForSeed(seed: string): number {
  if (!seed) return 24;
  const clean = seed.trim().toLowerCase();
  if (clean.includes('ashish')) return 24; // Default tech professional with glasses & smile (Ashish / Ashish Panda)
  
  let hash = 0;
  for (let i = 0; i < clean.length; i++) {
    hash = (hash << 5) - hash + clean.charCodeAt(i);
    hash |= 0;
  }
  return (Math.abs(hash) % TOTAL_MEMOJIS) + 1;
}

let currentCustomUri: string | null = null;
let currentAvatarIndex: number = 24;
const listeners: Set<AvatarListener> = new Set();

export const AvatarService = {
  getCustomUri(): string | null {
    return currentCustomUri;
  },

  getAvatarIndex(): number {
    return currentAvatarIndex;
  },

  setCustomUri(uri: string | null) {
    currentCustomUri = uri;
    listeners.forEach((listener) => listener(currentCustomUri, currentAvatarIndex));
  },

  setAvatarIndex(index: number) {
    currentAvatarIndex = Math.max(1, Math.min(TOTAL_MEMOJIS, index));
    listeners.forEach((listener) => listener(currentCustomUri, currentAvatarIndex));
  },

  setSeed(seed: string) {
    currentAvatarIndex = getAvatarIndexForSeed(seed);
    listeners.forEach((listener) => listener(currentCustomUri, currentAvatarIndex));
  },

  shuffle() {
    let nextIndex = Math.floor(Math.random() * TOTAL_MEMOJIS) + 1;
    if (nextIndex === currentAvatarIndex) {
      nextIndex = (currentAvatarIndex % TOTAL_MEMOJIS) + 1;
    }
    currentCustomUri = null; // Switching to mascot clears custom photo
    currentAvatarIndex = nextIndex;
    listeners.forEach((listener) => listener(currentCustomUri, currentAvatarIndex));
    return nextIndex;
  },

  resetDefault(seed: string = 'Ashish') {
    currentCustomUri = null;
    currentAvatarIndex = getAvatarIndexForSeed(seed);
    listeners.forEach((listener) => listener(currentCustomUri, currentAvatarIndex));
  },

  subscribe(listener: AvatarListener): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  getMemojiAsset(index: number = currentAvatarIndex) {
    const safeIndex = Math.max(1, Math.min(TOTAL_MEMOJIS, index));
    return MEMOJI_ASSETS[safeIndex] || MEMOJI_ASSETS[24];
  },

  getIndexForSeed(seed: string): number {
    return getAvatarIndexForSeed(seed);
  },
};
