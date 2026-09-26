import axios from 'axios';
import { Platform } from 'react-native';

// For Android emulator 10.0.2.2 points to host localhost; for iOS / web localhost works.
const DEFAULT_BASE_URL = Platform.select({
  android: 'http://10.0.2.2:8000/api/v1',
  ios: 'http://localhost:8000/api/v1',
  default: 'http://localhost:8000/api/v1',
});

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || DEFAULT_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    refresh: '/auth/refresh',
  },
  accounts: {
    list: '/accounts',
    demoConnect: '/accounts/demo-connect',
    sync: (id: string) => `/accounts/${id}/sync`,
  },
  transactions: {
    list: '/transactions',
    detail: (id: string) => `/transactions/${id}`,
    create: '/transactions',
  },
  financialHealth: {
    summary: '/financial-health',
    cashFlow: '/analytics/cash-flow',
    obligations: '/analytics/obligations',
    spending: '/analytics/spending',
  },
  copilot: {
    query: '/copilot/query',
  },
  recommendations: {
    list: '/recommendations',
    simulate: (id: string) => `/recommendations/${id}/simulate`,
  },
  uploads: {
    receipt: '/uploads/receipt',
    upi: '/uploads/upi',
    confirm: (id: string) => `/uploads/${id}/confirm`,
  },
};
