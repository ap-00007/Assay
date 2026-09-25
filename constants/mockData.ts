// FinCopilot — Central Mock Data
// All demo financial data used across screens

export const MOCK_USER = {
  name: 'Harshal Bhonde',
  email: 'harshal@example.com',
  initials: 'HB',
  joinedDate: 'September 2026',
};

// ─── Financial Summary ────────────────────────────────────────────────────────

export const MOCK_SUMMARY = {
  totalBalance: 124500,
  monthlyIncome: 70000,
  monthlyExpenses: 48200,
  monthlySavings: 21800,
  savingsRate: 31,
  incomeTrend: 5,   // percent change
  expenseTrend: 12,
};

// ─── Health Score ─────────────────────────────────────────────────────────────

export const MOCK_HEALTH_SCORE = {
  overall: 82,
  label: 'Healthy',
  breakdown: {
    savings: { score: 85, label: 'Savings Health' },
    spending: { score: 74, label: 'Spending Health' },
    debt: { score: 88, label: 'Debt Health' },
    cashflow: { score: 80, label: 'Cash-Flow Health' },
  },
  change: { from: 84, to: 82, reason: 'Discretionary spending increased and projected cash buffer decreased.' },
};

// ─── Transactions ─────────────────────────────────────────────────────────────

export type Transaction = {
  id: string;
  name: string;
  category: string;
  date: string;
  time: string;
  amount: number;
  isIncome: boolean;
  method: 'UPI' | 'Card' | 'Cash' | 'Bank';
  merchant?: string;
};

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1', name: 'Starbucks', category: 'Food & Dining', date: 'Today', time: '9:38 AM', amount: -250, isIncome: false, method: 'UPI' },
  { id: '2', name: 'Uber', category: 'Transport', date: 'Today', time: '8:42 AM', amount: -120, isIncome: false, method: 'UPI' },
  { id: '3', name: 'Amazon', category: 'Shopping', date: 'Today', time: '11:15 AM', amount: -889, isIncome: false, method: 'Card' },
  { id: '4', name: 'Swiggy', category: 'Food & Dining', date: 'Yesterday', time: '8:12 PM', amount: -430, isIncome: false, method: 'UPI' },
  { id: '5', name: 'Netflix', category: 'Subscriptions', date: 'Yesterday', time: '8:32 PM', amount: -649, isIncome: false, method: 'Card' },
  { id: '6', name: 'Salary', category: 'Income', date: 'Yesterday', time: '9:00 AM', amount: 70000, isIncome: true, method: 'Bank' },
  { id: '7', name: 'Zomato', category: 'Food & Dining', date: '14 Sep', time: '1:22 PM', amount: -310, isIncome: false, method: 'UPI' },
  { id: '8', name: 'Myntra', category: 'Shopping', date: '14 Sep', time: '3:00 PM', amount: -1299, isIncome: false, method: 'Card' },
  { id: '9', name: 'Ola', category: 'Transport', date: '13 Sep', time: '7:45 PM', amount: -180, isIncome: false, method: 'Cash' },
  { id: '10', name: 'Big Bazaar', category: 'Groceries', date: '13 Sep', time: '11:30 AM', amount: -2100, isIncome: false, method: 'Card' },
  { id: '11', name: 'Spotify', category: 'Subscriptions', date: '12 Sep', time: '10:00 AM', amount: -299, isIncome: false, method: 'Card' },
  { id: '12', name: 'Freelance Payment', category: 'Income', date: '12 Sep', time: '2:00 PM', amount: 15000, isIncome: true, method: 'Bank' },
  { id: '13', name: 'Airtel Bill', category: 'Bills & Utilities', date: '11 Sep', time: '9:00 AM', amount: -599, isIncome: false, method: 'UPI' },
  { id: '14', name: 'Book My Show', category: 'Entertainment', date: '10 Sep', time: '6:30 PM', amount: -550, isIncome: false, method: 'Card' },
  { id: '15', name: 'D-Mart', category: 'Groceries', date: '10 Sep', time: '10:15 AM', amount: -1850, isIncome: false, method: 'Cash' },
];

// ─── Spending Categories ──────────────────────────────────────────────────────

export const MOCK_CATEGORIES = [
  { name: 'Food & Dining', amount: 13500, percent: 28, color: '#D6A928' },
  { name: 'Shopping', amount: 10700, percent: 22, color: '#111827' },
  { name: 'Transport', amount: 7200, percent: 15, color: '#16A34A' },
  { name: 'Bills & Utilities', amount: 5800, percent: 12, color: '#2563EB' },
  { name: 'Subscriptions', amount: 3900, percent: 8, color: '#7C3AED' },
  { name: 'Others', amount: 7100, percent: 15, color: '#9CA3AF' },
];

// ─── Cash Flow Forecast ───────────────────────────────────────────────────────

export const MOCK_CASHFLOW_POINTS = [
  { month: 'Apr', balance: 95000 },
  { month: 'May', balance: 88000 },
  { month: 'Jun', balance: 102000 },
  { month: 'Jul', balance: 91000 },
  { month: 'Aug', balance: 118000 },
  { month: 'Sep', balance: 124500 },
];

export const MOCK_FORECAST_POINTS = [
  { date: '16 Sep', balance: 124500, type: 'current' as const },
  { date: '15 Sep', label: 'Rent', amount: -15000, type: 'outflow' as const },
  { date: '18 Sep', label: 'EMI', amount: -12000, type: 'outflow' as const },
  { date: '21 Sep', label: 'SIP', amount: -5000, type: 'outflow' as const },
  { date: '25 Sep', label: 'Credit Card Bill', amount: -7200, type: 'outflow' as const },
  { date: '28 Sep', label: 'Salary', amount: 70000, type: 'inflow' as const },
];

export const MOCK_PROJECTED_BALANCE = 32400;
export const MOCK_CASHFLOW_PRESSURE_DATE = '25 September';

// ─── Recurring Payments ───────────────────────────────────────────────────────

export const MOCK_RECURRING = [
  { id: '1', name: 'Rent', frequency: 'Monthly • 5th', amount: 15000, icon: '🏠', color: '#111827' },
  { id: '2', name: 'EMI (Car Loan)', frequency: 'Monthly • 18th', amount: 12000, icon: '🚗', color: '#DC2626' },
  { id: '3', name: 'Netflix', frequency: 'Monthly • 1st', amount: 649, icon: '🎬', color: '#DC2626' },
  { id: '4', name: 'SIP Investment', frequency: 'Monthly • 12th', amount: 5000, icon: '📈', color: '#16A34A' },
  { id: '5', name: 'Insurance', frequency: 'Monthly • 25th', amount: 2500, icon: '🛡️', color: '#2563EB' },
  { id: '6', name: 'Spotify', frequency: 'Monthly • 1st', amount: 299, icon: '🎵', color: '#16A34A' },
];

export const MOCK_TOTAL_RECURRING = 35200;

// ─── Debt & Loans ─────────────────────────────────────────────────────────────

export const MOCK_LOANS = [
  {
    id: '1',
    name: 'Home Loan',
    icon: '🏠',
    totalAmount: 5000000,
    outstandingAmount: 3200000,
    emi: 42000,
    interestRate: 8.5,
    dueDate: '5th every month',
    remainingMonths: 156,
    repaidPercent: 36,
  },
  {
    id: '2',
    name: 'Car Loan',
    icon: '🚗',
    totalAmount: 800000,
    outstandingAmount: 365000,
    emi: 12000,
    interestRate: 9.2,
    dueDate: '18th every month',
    remainingMonths: 30,
    repaidPercent: 54,
  },
  {
    id: '3',
    name: 'Credit Card',
    icon: '💳',
    totalAmount: 85000,
    outstandingAmount: 58500,
    emi: 5000,
    interestRate: 36.0,
    dueDate: 'Min. due ₹5,000',
    remainingMonths: 12,
    repaidPercent: 31,
  },
];

export const MOCK_DEBT_SUMMARY = {
  totalOutstanding: 485000,
  debtToIncomeRatio: 28,
  monthlyBurden: 59000,
  repaidPercent: 43,
  riskLevel: 'Moderate' as 'Low' | 'Moderate' | 'High',
};

// ─── Financial Goals ──────────────────────────────────────────────────────────

export const MOCK_GOALS = [
  {
    id: '1',
    name: 'Emergency Fund',
    icon: '🛡️',
    color: '#2563EB',
    current: 80000,
    target: 136000,
    percent: 59,
    estimatedDate: 'Mar 2027',
  },
  {
    id: '2',
    name: 'New Laptop',
    icon: '💻',
    color: '#7C3AED',
    current: 28000,
    target: 90000,
    percent: 31,
    estimatedDate: 'Jan 2027',
  },
  {
    id: '3',
    name: 'Travel',
    icon: '✈️',
    color: '#D97706',
    current: 18000,
    target: 50000,
    percent: 36,
    estimatedDate: 'Feb 2027',
  },
  {
    id: '4',
    name: 'House Down Payment',
    icon: '🏠',
    color: '#16A34A',
    current: 200000,
    target: 1000000,
    percent: 20,
    estimatedDate: 'Dec 2029',
  },
];

// ─── Recommendations ──────────────────────────────────────────────────────────

export const MOCK_RECOMMENDATIONS = [
  {
    id: '1',
    icon: '🛍️',
    title: 'Reduce shopping by ₹3,000/month',
    subtitle: 'Potential savings ₹36,000/year',
    impact: '+₹36,000/yr',
    impactColor: '#16A34A',
    category: 'spending',
  },
  {
    id: '2',
    icon: '📺',
    title: 'Review 2 recurring subscriptions',
    subtitle: 'Save ₹1,500/month',
    impact: '+₹18,000/yr',
    impactColor: '#16A34A',
    category: 'subscriptions',
  },
  {
    id: '3',
    icon: '🛡️',
    title: 'Increase emergency fund',
    subtitle: 'Aim for 3–6 months of expenses',
    impact: 'Risk ↓',
    impactColor: '#2563EB',
    category: 'savings',
  },
  {
    id: '4',
    icon: '💸',
    title: 'Consider extra loan payment',
    subtitle: 'Save interest and reduce tenure',
    impact: 'Save ₹45,000',
    impactColor: '#16A34A',
    category: 'debt',
  },
  {
    id: '5',
    icon: '💰',
    title: 'Optimize your cash balance',
    subtitle: 'Keep 20% as safety buffer',
    impact: 'Score +4',
    impactColor: '#D6A928',
    category: 'cashflow',
  },
];

// ─── What-If Scenarios ────────────────────────────────────────────────────────

export const MOCK_WHATIF_SCENARIOS = [
  { id: '1', label: 'Reduce Shopping', defaultCurrent: 7000, defaultNew: 4000 },
  { id: '2', label: 'Buy a Laptop (₹50,000)', defaultCurrent: 124500, defaultNew: 74500 },
  { id: '3', label: 'Increase SIP', defaultCurrent: 5000, defaultNew: 10000 },
  { id: '4', label: 'Extra Loan Payment', defaultCurrent: 12000, defaultNew: 20000 },
];

// ─── Chat Messages ────────────────────────────────────────────────────────────

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  type?: 'observed' | 'predicted' | 'recommendation' | 'normal';
  confidence?: number;
};

export const MOCK_QUICK_QUESTIONS = [
  'Can I afford a ₹30,000 phone?',
  'Where am I overspending?',
  'How to save ₹10,000?',
  'Will I have enough for my EMI?',
  'What happens if I increase my SIP?',
];

export const MOCK_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Hi Harshal! 👋 How can I help you today? I can answer questions about your spending, savings, loans, or future cash flow.',
    type: 'normal',
  },
];

// ─── Onboarding Slides ────────────────────────────────────────────────────────

export const MOCK_ONBOARDING_SLIDES = [
  {
    id: '1',
    emoji: '🏦',
    title: 'All your finances in one place',
    subtitle: 'Connect bank accounts, credit cards, loans, and investments. See everything in a single unified dashboard.',
  },
  {
    id: '2',
    emoji: '🔮',
    title: 'Predict future cash flow',
    subtitle: 'Know when your money might run low before it happens. Get ahead of EMIs, rent, and unexpected expenses.',
  },
  {
    id: '3',
    emoji: '🤖',
    title: 'AI-powered recommendations',
    subtitle: 'Ask your AI Copilot anything about your finances. Get personalized advice based on your actual data.',
  },
];
