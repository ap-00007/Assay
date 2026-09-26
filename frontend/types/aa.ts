export interface SandboxAccount {
  id: string;
  bankName: string;
  bankKey: string;
  accountType: string;
  accountNumber: string;
  maskedNumber: string;
  balance: number;
  formattedBalance: string;
  currency: string;
  fipId: string;
  institutionType: 'Bank' | 'NBFC' | 'Mutual Fund';
  selectedDefault: boolean;
}

export const SANDBOX_ACCOUNTS: SandboxAccount[] = [
  {
    id: 'acc-hdfc-4821',
    bankName: 'HDFC Bank',
    bankKey: 'hdfc',
    accountType: 'Savings Account',
    accountNumber: '4821',
    maskedNumber: 'Savings •••• 4821',
    balance: 42580,
    formattedBalance: '₹42,580',
    currency: 'INR',
    fipId: 'FIP-HDFC-001',
    institutionType: 'Bank',
    selectedDefault: true,
  },
  {
    id: 'acc-icici-7192',
    bankName: 'ICICI Bank',
    bankKey: 'icici',
    accountType: 'Salary Account',
    accountNumber: '7192',
    maskedNumber: 'Salary •••• 7192',
    balance: 124350,
    formattedBalance: '₹1,24,350',
    currency: 'INR',
    fipId: 'FIP-ICICI-002',
    institutionType: 'Bank',
    selectedDefault: false,
  },
  {
    id: 'acc-axis-3044',
    bankName: 'Axis Bank',
    bankKey: 'axis',
    accountType: 'Current Account',
    accountNumber: '3044',
    maskedNumber: 'Current •••• 3044',
    balance: 65200,
    formattedBalance: '₹65,200',
    currency: 'INR',
    fipId: 'FIP-AXIS-003',
    institutionType: 'Bank',
    selectedDefault: false,
  },
  {
    id: 'acc-sbi-9812',
    bankName: 'State Bank of India',
    bankKey: 'sbi',
    accountType: 'Savings Account',
    accountNumber: '9812',
    maskedNumber: 'Savings •••• 9812',
    balance: 18400,
    formattedBalance: '₹18,400',
    currency: 'INR',
    fipId: 'FIP-SBI-004',
    institutionType: 'Bank',
    selectedDefault: false,
  },
  {
    id: 'acc-kotak-5521',
    bankName: 'Kotak Mahindra Bank',
    bankKey: 'kotak',
    accountType: 'Savings Account',
    accountNumber: '5521',
    maskedNumber: 'ActiveMoney •••• 5521',
    balance: 89400,
    formattedBalance: '₹89,400',
    currency: 'INR',
    fipId: 'FIP-KOTAK-005',
    institutionType: 'Bank',
    selectedDefault: false,
  },
  {
    id: 'acc-pnb-1290',
    bankName: 'Punjab National Bank',
    bankKey: 'pnb',
    accountType: 'Savings Account',
    accountNumber: '1290',
    maskedNumber: 'Savings •••• 1290',
    balance: 31250,
    formattedBalance: '₹31,250',
    currency: 'INR',
    fipId: 'FIP-PNB-006',
    institutionType: 'Bank',
    selectedDefault: false,
  },
  {
    id: 'acc-zerodha-8819',
    bankName: 'Zerodha Broking',
    bankKey: 'zerodha',
    accountType: 'Demat & Trading',
    accountNumber: '8819',
    maskedNumber: 'Kite •••• 8819',
    balance: 215000,
    formattedBalance: '₹2,15,000',
    currency: 'INR',
    fipId: 'FIP-ZERODHA-007',
    institutionType: 'Mutual Fund',
    selectedDefault: false,
  },
  {
    id: 'acc-groww-3312',
    bankName: 'Groww Invest Tech',
    bankKey: 'groww',
    accountType: 'Mutual Funds Portfolio',
    accountNumber: '3312',
    maskedNumber: 'Folio •••• 3312',
    balance: 145800,
    formattedBalance: '₹1,45,800',
    currency: 'INR',
    fipId: 'FIP-GROWW-008',
    institutionType: 'Mutual Fund',
    selectedDefault: false,
  },
];
