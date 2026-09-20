import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { SANDBOX_ACCOUNTS, SandboxAccount } from '../types/aa';

export type AAConsentStatus = 'ACTIVE' | 'REVOKED' | 'EXPIRED' | 'NONE';

export interface AAConsentDetails {
  consentId: string;
  purpose: string;
  dataRange: string;
  fetchFrequency: string;
  expiryDate: string;
  fiuName: string;
}

export interface AAState {
  aa_onboarding_completed: boolean;
  aa_consent_status: AAConsentStatus;
  aa_connected: boolean;
  aa_last_synced: string | null;
  connected_account_count: number;
  connected_accounts: SandboxAccount[];
  consent_details: AAConsentDetails;
}

const STORAGE_KEY = 'assay_aa_state_v1';

const DEFAULT_STATE: AAState = {
  aa_onboarding_completed: false,
  aa_consent_status: 'NONE',
  aa_connected: false,
  aa_last_synced: null,
  connected_account_count: 0,
  connected_accounts: [],
  consent_details: {
    consentId: 'AA-2026-9812-CONSENT',
    purpose: 'Personal Financial Management',
    dataRange: 'Last 6 months',
    fetchFrequency: 'Daily / On-demand',
    expiryDate: '20 Sep 2027',
    fiuName: 'ASSAY Financial Intelligence',
  },
};

// In-memory runtime state
let memoryState: AAState = { ...DEFAULT_STATE };

// Initialize from localStorage if on web
if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      memoryState = { ...DEFAULT_STATE, ...JSON.parse(raw) };
    }
  } catch (e) {
    // Ignore storage parse errors
  }
}

type AAListener = (state: AAState) => void;
const listeners: Set<AAListener> = new Set();

function persistState(state: AAState) {
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      // Ignore
    }
  }
}

function notifyListeners() {
  persistState(memoryState);
  listeners.forEach((listener) => listener({ ...memoryState }));
}

export const AAService = {
  getState(): AAState {
    return { ...memoryState };
  },

  setState(updates: Partial<AAState>) {
    memoryState = {
      ...memoryState,
      ...updates,
    };
    notifyListeners();
  },

  completeOnboarding(selectedAccounts: SandboxAccount[] = [SANDBOX_ACCOUNTS[0]]) {
    const now = new Date();
    const formattedTime = `Today, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    
    memoryState = {
      ...memoryState,
      aa_onboarding_completed: true,
      aa_consent_status: 'ACTIVE',
      aa_connected: true,
      aa_last_synced: formattedTime,
      connected_account_count: selectedAccounts.length,
      connected_accounts: selectedAccounts,
    };
    notifyListeners();
  },

  skipOnboarding() {
    memoryState = {
      ...memoryState,
      aa_onboarding_completed: true,
      aa_consent_status: 'NONE',
      aa_connected: false,
      aa_last_synced: null,
      connected_account_count: 0,
      connected_accounts: [],
    };
    notifyListeners();
  },

  disconnectAccount() {
    memoryState = {
      ...memoryState,
      aa_connected: false,
      aa_consent_status: 'REVOKED',
      // Note: aa_onboarding_completed remains true!
    };
    notifyListeners();
  },

  reconnectAccount(accounts: SandboxAccount[] = [SANDBOX_ACCOUNTS[0]]) {
    const now = new Date();
    const formattedTime = `Today, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    memoryState = {
      ...memoryState,
      aa_consent_status: 'ACTIVE',
      aa_connected: true,
      aa_last_synced: formattedTime,
      connected_account_count: accounts.length,
      connected_accounts: accounts,
    };
    notifyListeners();
  },

  syncNow(): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const now = new Date();
        const formattedTime = `Today, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        memoryState = {
          ...memoryState,
          aa_last_synced: formattedTime,
        };
        notifyListeners();
        resolve(formattedTime);
      }, 900);
    });
  },

  resetState() {
    memoryState = { ...DEFAULT_STATE };
    notifyListeners();
  },

  subscribe(listener: AAListener): () => void {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};

/**
 * Custom React hook for reactive AA state across components
 */
export function useAAState(): AAState {
  const [state, setState] = useState<AAState>(() => AAService.getState());

  useEffect(() => {
    const unsubscribe = AAService.subscribe((newState) => {
      setState(newState);
    });
    return unsubscribe;
  }, []);

  return state;
}
