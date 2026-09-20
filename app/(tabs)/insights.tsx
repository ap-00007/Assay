import React, { useState, useMemo } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  GestureResponderEvent
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
  Circle,
  Line,
  Text as SvgText,
  Rect,
  Polygon,
  G
} from 'react-native-svg';
import { Typography } from '../../components/Typography';
import { Card } from '../../components/Card';
import { ScreenHeader } from '../../components/ui/ScreenHeader';
import { MerchantLogo } from '../../components/ui/MerchantLogo';
import { COLORS, SIZES, SPACING } from '../../constants/theme';
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  ArrowRight,
  Calendar,
  Zap,
  ArrowUpRight
} from 'lucide-react-native';

const TIMEFRAMES = ['30 Days', '60 Days', '90 Days'];

interface DayDataPoint {
  day: number;
  label: string;
  balance: number;
  pctX: number; // Visual distribution percentage matching Mock UI 7
  event?: string;
  eventType?: 'debit' | 'credit' | 'trough';
}

// 30-Day Data Model matching Mock UI 7.png milestone distribution
const FULL_MONTH_DATA: DayDataPoint[] = [
  { day: 1, label: '1 Sep', balance: 42850, pctX: 0.0 },
  { day: 7, label: '7 Sep', balance: 37400, pctX: 0.17 },
  { day: 14, label: '14 Sep', balance: 31000, pctX: 0.35 },
  { day: 21, label: '21 Sep', balance: 24000, pctX: 0.52 },
  { day: 22, label: '22 Sep', balance: 15600, pctX: 0.58, event: 'Axis Car Loan EMI (-₹8,400)', eventType: 'debit' },
  { day: 25, label: '25 Sep', balance: 3200, pctX: 0.70, event: 'Critical Minimum Liquidity Trough', eventType: 'trough' },
  { day: 28, label: '28 Sep', balance: 88200, pctX: 0.86, event: 'Monthly Salary Deposit (+₹85,000)', eventType: 'credit' },
  { day: 30, label: '30 Sep', balance: 82400, pctX: 1.0 },
];

// Zoomed Trough View (20-30 Sep)
const ZOOMED_DATA: DayDataPoint[] = [
  { day: 20, label: '20 Sep', balance: 25200, pctX: 0.0 },
  { day: 22, label: '22 Sep', balance: 15600, pctX: 0.22, event: 'Axis Car Loan EMI (-₹8,400)', eventType: 'debit' },
  { day: 24, label: '24 Sep', balance: 13000, pctX: 0.40, event: 'Adani Electricity (-₹2,100)', eventType: 'debit' },
  { day: 25, label: '25 Sep', balance: 3200, pctX: 0.56, event: 'Critical Trough (Lowest Balance)', eventType: 'trough' },
  { day: 28, label: '28 Sep', balance: 88200, pctX: 0.82, event: 'Monthly Salary Deposit (+₹85,000)', eventType: 'credit' },
  { day: 30, label: '30 Sep', balance: 82400, pctX: 1.0 },
];

export default function InsightsScreen() {
  const router = useRouter();
  const [timeframe, setTimeframe] = useState('30 Days');
  const [viewMode, setViewMode] = useState<'full' | 'zoom'>('full');
  const [activeFocus, setActiveFocus] = useState<'all' | 'trough' | 'salary'>('all');
  const [cardWidth, setCardWidth] = useState<number>(0);
  const [activeScrubPoint, setActiveScrubPoint] = useState<DayDataPoint | null>(null);

  const screenWidth = Dimensions.get('window').width;
  const fallbackWidth = Math.min(screenWidth - 40, 420);
  const actualWidth = cardWidth > 0 ? cardWidth : fallbackWidth;

  const chartHeight = 205;
  const paddingLeft = 40; // Compact Y-axis margin saving 12px for chart curve
  const paddingRight = 16;
  const paddingTop = 32;
  const paddingBottom = 24;

  const plotWidth = Math.max(actualWidth - paddingLeft - paddingRight, 160);
  const plotHeight = chartHeight - paddingTop - paddingBottom;
  const bottomZeroY = paddingTop + plotHeight;

  const activeDataSet = viewMode === 'full' ? FULL_MONTH_DATA : ZOOMED_DATA;
  const maxVal = 100000;

  // Coordinate mapping using milestone visual distribution
  const getX = (d: DayDataPoint) => {
    return paddingLeft + d.pctX * plotWidth;
  };

  const getY = (val: number) => {
    const fraction = Math.max(0, Math.min(val / maxVal, 1));
    // Enforce at least 8px above bottomZeroY so line NEVER touches or dips below X-axis
    const maxAllowedY = bottomZeroY - 8;
    const computedY = paddingTop + (1 - fraction) * plotHeight;
    return Math.min(computedY, maxAllowedY);
  };

  // Monotonic cubic spline calculation with strict zero-overshoot clamp
  const { linePath, areaPath } = useMemo(() => {
    if (activeDataSet.length < 2) return { linePath: '', areaPath: '' };

    const points = activeDataSet.map(d => ({
      x: getX(d),
      y: getY(d.balance),
      isTrough: d.balance <= 3500,
      isPeak: d.balance >= 80000
    }));

    let path = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;

    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];

      const dx = p2.x - p1.x;
      let cp1x = p1.x + dx * 0.38;
      let cp1y = p1.y;
      let cp2x = p2.x - dx * 0.38;
      let cp2y = p2.y;

      // When approaching or leaving the local minimum (Trough at 25 Sep), force tangent to be strictly horizontal
      // This mathematically prevents cubic overshoot below the minimum and X-axis
      if (p2.isTrough) {
        cp2y = p2.y; // Flat tangent approaching minimum
        cp1y = p1.y + (p2.y - p1.y) * 0.3;
      } else if (p1.isTrough) {
        cp1y = p1.y; // Flat tangent leaving minimum
        cp2y = p2.y - (p2.y - p1.y) * 0.2;
      } else if (p2.isPeak) {
        cp2y = p2.y; // Flat tangent approaching peak
        cp1y = p1.y + (p2.y - p1.y) * 0.5;
      } else {
        cp1y = p1.y + (p2.y - p1.y) * 0.25;
        cp2y = p2.y - (p2.y - p1.y) * 0.25;
      }

      // Hard clamp on control points: strictly above bottom zero axis
      cp1y = Math.min(cp1y, bottomZeroY - 6);
      cp2y = Math.min(cp2y, bottomZeroY - 6);

      path += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }

    const firstPt = points[0];
    const lastPt = points[points.length - 1];
    const bottomYStr = bottomZeroY.toFixed(1);

    const area = `${path} L ${lastPt.x.toFixed(1)} ${bottomYStr} L ${firstPt.x.toFixed(1)} ${bottomYStr} Z`;

    return { linePath: path, areaPath: area };
  }, [activeDataSet, actualWidth]);

  // Touch scrubber along chart
  const handleTouch = (evt: GestureResponderEvent) => {
    const touchX = evt.nativeEvent.locationX;
    let closestPt = activeDataSet[0];
    let minDiff = Infinity;

    activeDataSet.forEach((pt) => {
      const px = getX(pt);
      const diff = Math.abs(px - touchX);
      if (diff < minDiff) {
        minDiff = diff;
        closestPt = pt;
      }
    });

    setActiveScrubPoint(closestPt);
  };

  // Milestone points
  const troughPoint = activeDataSet.find(d => d.day === 25);
  const salaryPoint = activeDataSet.find(d => d.day === 28);
  const startPoint = activeDataSet.find(d => d.day === (viewMode === 'full' ? 1 : 20));

  const yTicks = [
    { val: 100000, label: '₹100k' },
    { val: 75000, label: '₹75k' },
    { val: 50000, label: '₹50k' },
    { val: 25000, label: '₹25k' },
    { val: 0, label: '₹0' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with clean left title and calendar action on right */}
      <ScreenHeader
        title="Cash-Flow Forecast"
        subtitle="Predictive Solvency & Buffer Analytics"
        showNotification={false}
        rightAction={
          <TouchableOpacity
            style={styles.calendarBtn}
            onPress={() => { }}
            activeOpacity={0.7}
          >
            <Calendar color={COLORS.text} size={18} strokeWidth={1.8} />
          </TouchableOpacity>
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Timeframe Filter Pills (30 Days, 60 Days, 90 Days) */}
        <View style={styles.timeframeRow}>
          {TIMEFRAMES.map((tf) => {
            const isActive = timeframe === tf;
            return (
              <TouchableOpacity
                key={tf}
                style={[styles.tfPill, isActive && styles.tfPillActive]}
                onPress={() => setTimeframe(tf)}
                activeOpacity={0.75}
              >
                <Typography
                  variant="caption"
                  style={[styles.tfText, isActive && styles.tfTextActive]}
                >
                  {tf}
                </Typography>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Hero Cash-Flow Forecast Dark Card */}
        <View
          style={styles.forecastCard}
          onLayout={(e) => {
            const width = e.nativeEvent.layout.width;
            if (width > 0 && Math.abs(width - cardWidth) > 2) {
              setCardWidth(width);
            }
          }}
        >
          {/* Card Top Row: Title never truncated + Compact Floor Tag */}
          <View style={styles.forecastHeader}>
            <View style={styles.titleRow}>
              <Typography variant="bodyBold" color="#FFFFFF" style={styles.cardTitle}>
                Projected Minimum Liquidity
              </Typography>
              <View style={styles.floorMiniTag}>
                <Typography variant="caption" style={styles.floorMiniTagText}>
                  ₹3,200 Floor
                </Typography>
              </View>
            </View>
            <Typography variant="caption" color="rgba(255, 255, 255, 0.55)" style={styles.cardSubtitle}>
              Trajectory hits lowest buffer on 25 Sep after ₹8,400 Car EMI
            </Typography>
          </View>

          {/* Tier 1: View Scale Segmented Track (30-Day vs Trough Zoom) */}
          <View style={styles.segmentedTrackPrimary}>
            <TouchableOpacity
              style={[styles.segmentBtn, viewMode === 'full' && styles.segmentBtnActive]}
              onPress={() => {
                setViewMode('full');
                setActiveScrubPoint(null);
              }}
              activeOpacity={0.75}
            >
              <Typography
                variant="caption"
                numberOfLines={1}
                style={[styles.segmentText, viewMode === 'full' && styles.segmentTextActive]}
              >
                30-Day Trajectory
              </Typography>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.segmentBtn, viewMode === 'zoom' && styles.segmentBtnActive]}
              onPress={() => {
                setViewMode('zoom');
                setActiveScrubPoint(null);
              }}
              activeOpacity={0.75}
            >
              <Typography
                variant="caption"
                numberOfLines={1}
                style={[styles.segmentText, viewMode === 'zoom' && styles.segmentTextActive]}
              >
                Trough Zoom (10D)
              </Typography>
            </TouchableOpacity>
          </View>

          {/* Tier 2: Milestone Focus Track (Matching Segmented Design, Zero Bloat) */}
          <View style={styles.segmentedTrackSecondary}>
            <TouchableOpacity
              style={[styles.segmentSubBtn, activeFocus === 'all' && styles.segmentSubBtnActiveGold]}
              onPress={() => setActiveFocus('all')}
              activeOpacity={0.75}
            >
              <Typography
                variant="caption"
                numberOfLines={1}
                style={[styles.segmentSubText, activeFocus === 'all' && styles.segmentSubTextActiveGold]}
              >
                All Milestones
              </Typography>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.segmentSubBtn, activeFocus === 'trough' && styles.segmentSubBtnActiveRed]}
              onPress={() => setActiveFocus('trough')}
              activeOpacity={0.75}
            >
              <Typography
                variant="caption"
                numberOfLines={1}
                style={[styles.segmentSubText, activeFocus === 'trough' && styles.segmentSubTextActiveRed]}
              >
                Lowest (₹3.2k)
              </Typography>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.segmentSubBtn, activeFocus === 'salary' && styles.segmentSubBtnActiveGreen]}
              onPress={() => setActiveFocus('salary')}
              activeOpacity={0.75}
            >
              <Typography
                variant="caption"
                numberOfLines={1}
                style={[styles.segmentSubText, activeFocus === 'salary' && styles.segmentSubTextActiveGreen]}
              >
                Salary (₹88.2k)
              </Typography>
            </TouchableOpacity>
          </View>

          {/* Live Scrubber Inspection Banner */}
          {activeScrubPoint && (
            <View style={styles.activeScrubBanner}>
              <View style={styles.scrubIndicatorDot} />
              <Typography variant="caption" color="#FFFFFF" style={{ fontWeight: '600', fontSize: 11 }}>
                {activeScrubPoint.label}: <Typography variant="caption" color="#D6A928" style={{ fontWeight: '700' }}>₹{activeScrubPoint.balance.toLocaleString('en-IN')}</Typography>
                {activeScrubPoint.event ? ` • ${activeScrubPoint.event}` : ''}
              </Typography>
            </View>
          )}

          {/* Pure, Clamped SVG Canvas */}
          <View
            style={styles.svgWrapper}
            onTouchStart={handleTouch}
            onTouchMove={handleTouch}
            onTouchEnd={() => { }}
          >
            <Svg width={actualWidth} height={chartHeight}>
              <Defs>
                <LinearGradient id="assayGoldGradient" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0%" stopColor="#D6A928" stopOpacity="0.4" />
                  <Stop offset="65%" stopColor="#D6A928" stopOpacity="0.1" />
                  <Stop offset="100%" stopColor="#D6A928" stopOpacity="0.0" />
                </LinearGradient>
              </Defs>

              {/* Horizontal Reference Gridlines & Y-Axis Labels */}
              {yTicks.map(({ val, label }) => {
                const yPos = getY(val);
                const isZero = val === 0;

                return (
                  <G key={`ytick-${val}`}>
                    <Line
                      x1={paddingLeft}
                      y1={yPos}
                      x2={actualWidth - paddingRight}
                      y2={yPos}
                      stroke={isZero ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.07)'}
                      strokeDasharray={isZero ? undefined : '3 3'}
                      strokeWidth={isZero ? 1.2 : 1}
                    />
                    <SvgText
                      x={paddingLeft - 6}
                      y={yPos + 3.5}
                      fill="rgba(255, 255, 255, 0.45)"
                      fontSize="8.5"
                      fontWeight="500"
                      textAnchor="end"
                    >
                      {label}
                    </SvgText>
                  </G>
                );
              })}

              {/* Area Fill */}
              {areaPath ? (
                <Path d={areaPath} fill="url(#assayGoldGradient)" />
              ) : null}

              {/* Spline Line */}
              {linePath ? (
                <Path
                  d={linePath}
                  fill="none"
                  stroke="#D6A928"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : null}

              {/* X-Axis Date Labels aligned under milestone points */}
              {activeDataSet.map((pt) => {
                const xPos = getX(pt);
                const yPos = bottomZeroY + 16;
                const isTrough = pt.day === 25;
                const isSalary = pt.day === 28;

                return (
                  <SvgText
                    key={`xtick-${pt.day}`}
                    x={xPos}
                    y={yPos}
                    fill={isTrough ? '#FCA5A5' : isSalary ? '#86EFAC' : 'rgba(255,255,255,0.45)'}
                    fontSize={isTrough || isSalary ? '9' : '8'}
                    fontWeight={isTrough || isSalary ? '700' : '500'}
                    textAnchor="middle"
                  >
                    {pt.label}
                  </SvgText>
                );
              })}

              {/* 1 Sep Starting Point */}
              {startPoint && (
                <G>
                  <Circle
                    cx={getX(startPoint)}
                    cy={getY(startPoint.balance)}
                    r="4"
                    fill="#D6A928"
                  />
                  <SvgText
                    x={getX(startPoint) + 6}
                    y={getY(startPoint.balance) - 8}
                    fill="#FFFFFF"
                    fontSize="9.5"
                    fontWeight="700"
                  >
                    ₹42,850
                  </SvgText>
                </G>
              )}

              {/* 25 Sep Trough Callout Badge - Strictly separated, self-contained, no overlapping text */}
              {troughPoint && (activeFocus === 'all' || activeFocus === 'trough') && (
                <G>
                  {/* Vertical Guide Line */}
                  <Line
                    x1={getX(troughPoint)}
                    y1={getY(3200) - 10}
                    x2={getX(troughPoint)}
                    y2={bottomZeroY}
                    stroke="#EF4444"
                    strokeDasharray="2 2"
                    strokeWidth="1.2"
                  />

                  {/* Red Callout Tooltip Badge */}
                  <G transform={`translate(${getX(troughPoint) - 38}, ${getY(3200) - 40})`}>
                    <Rect
                      x="0"
                      y="0"
                      width="76"
                      height="26"
                      rx="5"
                      fill="#DC2626"
                    />
                    <Polygon
                      points="33,26 43,26 38,30"
                      fill="#DC2626"
                    />
                    <SvgText
                      x="38"
                      y="11"
                      fill="#FFFFFF"
                      fontSize="7.5"
                      fontWeight="700"
                      textAnchor="middle"
                    >
                      Lowest: ₹3,200
                    </SvgText>
                    <SvgText
                      x="38"
                      y="20"
                      fill="rgba(255,255,255,0.85)"
                      fontSize="7"
                      fontWeight="600"
                      textAnchor="middle"
                    >
                      25 Sep
                    </SvgText>
                  </G>

                  {/* Red Trough Marker */}
                  <Circle
                    cx={getX(troughPoint)}
                    cy={getY(3200)}
                    r="7"
                    fill="rgba(239, 68, 68, 0.25)"
                  />
                  <Circle
                    cx={getX(troughPoint)}
                    cy={getY(3200)}
                    r="4.5"
                    fill="#EF4444"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />
                </G>
              )}

              {/* 28 Sep Salary Callout Badge - Positioned in the upper quadrant, zero collision */}
              {salaryPoint && (activeFocus === 'all' || activeFocus === 'salary') && (
                <G>
                  {/* Vertical Guide Line */}
                  <Line
                    x1={getX(salaryPoint)}
                    y1={getY(88200) + 8}
                    x2={getX(salaryPoint)}
                    y2={bottomZeroY}
                    stroke="#22C55E"
                    strokeDasharray="2 2"
                    strokeWidth="1.2"
                  />

                  {/* Green Callout Tooltip Badge */}
                  <G transform={`translate(${Math.min(getX(salaryPoint) - 38, actualWidth - paddingRight - 80)}, ${Math.max(getY(88200) - 32, 2)})`}>
                    <Rect
                      x="0"
                      y="0"
                      width="80"
                      height="26"
                      rx="5"
                      fill="#16A34A"
                    />
                    <Polygon
                      points="35,26 45,26 40,30"
                      fill="#16A34A"
                    />
                    <SvgText
                      x="40"
                      y="11"
                      fill="#FFFFFF"
                      fontSize="7.5"
                      fontWeight="700"
                      textAnchor="middle"
                    >
                      Salary: ₹88,200
                    </SvgText>
                    <SvgText
                      x="40"
                      y="20"
                      fill="rgba(255,255,255,0.85)"
                      fontSize="7"
                      fontWeight="600"
                      textAnchor="middle"
                    >
                      28 Sep Inflow
                    </SvgText>
                  </G>

                  {/* Green Salary Marker */}
                  <Circle
                    cx={getX(salaryPoint)}
                    cy={getY(88200)}
                    r="7"
                    fill="rgba(34, 197, 94, 0.25)"
                  />
                  <Circle
                    cx={getX(salaryPoint)}
                    cy={getY(88200)}
                    r="4.5"
                    fill="#22C55E"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />
                </G>
              )}

              {/* Scrubber Cursor */}
              {activeScrubPoint && (
                <G>
                  <Line
                    x1={getX(activeScrubPoint)}
                    y1={paddingTop}
                    x2={getX(activeScrubPoint)}
                    y2={bottomZeroY}
                    stroke="#D6A928"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                  />
                  <Circle
                    cx={getX(activeScrubPoint)}
                    cy={getY(activeScrubPoint.balance)}
                    r="5.5"
                    fill="#D6A928"
                    stroke="#0F172A"
                    strokeWidth="2"
                  />
                </G>
              )}
            </Svg>
          </View>
        </View>

        {/* Solvency Warning Alert Card */}
        <View style={styles.warningCard}>
          <View style={styles.warningIconWrapper}>
            <AlertTriangle color="#D97706" size={24} />
          </View>
          <View style={{ flex: 1 }}>
            <Typography variant="body" color="#92400E" style={styles.warningText}>
              <Typography variant="bodyBold" color="#92400E">Solvency Warning:</Typography> Account dips to <Typography variant="bodyBold" color="#92400E">₹3,200</Typography> on 25 Sep after your ₹8,400 Car Loan EMI auto-debits, leaving a razor-thin buffer before payday on 28 Sep.
            </Typography>
            <TouchableOpacity
              style={styles.warningActionBtn}
              onPress={() => router.push('/simulator')}
              activeOpacity={0.8}
            >
              <Typography variant="caption" style={styles.warningActionText}>
                Simulate in What-If to Prevent Trough →
              </Typography>
            </TouchableOpacity>
          </View>
        </View>

        {/* Colliding Obligations (Next 10 Days) */}
        <Typography variant="cardHeading" style={styles.sectionHeader}>
          Colliding Obligations (Next 10 Days)
        </Typography>

        <View style={styles.obligationsList}>
          {/* Axis Car Loan EMI */}
          <TouchableOpacity
            style={styles.obligationCard}
            onPress={() => router.push('/debt')}
            activeOpacity={0.75}
          >
            <MerchantLogo name="axis" size={42} style={{ marginRight: 12 }} />
            <View style={styles.obligationDetails}>
              <Typography variant="bodyBold" style={{ fontSize: 15 }}>
                Axis Car Loan EMI
              </Typography>
              <View style={styles.obligationSubRow}>
                <Typography variant="caption" color={COLORS.textSecondary}>
                  Due 22 Sep •
                </Typography>
                <View style={[styles.tagBadge, { backgroundColor: '#FEF3C7' }]}>
                  <Typography variant="caption" color="#B45309" style={{ fontSize: 11, fontWeight: '600' }}>
                    Auto-debit
                  </Typography>
                </View>
              </View>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Typography variant="financial" style={{ fontSize: 16, color: '#DC2626' }}>
                -₹8,400
              </Typography>
              <ArrowRight color={COLORS.textSecondary} size={16} style={{ marginTop: 2 }} />
            </View>
          </TouchableOpacity>

          {/* Adani Power Bill */}
          <View style={styles.obligationCard}>
            <View style={[styles.obligationIcon, { backgroundColor: '#FEF3C7' }]}>
              <Zap color="#D97706" size={18} />
            </View>
            <View style={styles.obligationDetails}>
              <Typography variant="bodyBold" style={{ fontSize: 15 }}>
                Adani Power Electricity
              </Typography>
              <View style={styles.obligationSubRow}>
                <Typography variant="caption" color={COLORS.textSecondary}>
                  Due 24 Sep •
                </Typography>
                <View style={[styles.tagBadge, { backgroundColor: '#EFF6FF' }]}>
                  <Typography variant="caption" color="#1D4ED8" style={{ fontSize: 11, fontWeight: '600' }}>
                    Bill Payment
                  </Typography>
                </View>
              </View>
            </View>
            <Typography variant="financial" style={{ fontSize: 16, color: '#DC2626' }}>
              -₹2,100
            </Typography>
          </View>

          {/* Monthly Salary Deposit */}
          <View style={styles.obligationCard}>
            <View style={[styles.obligationIcon, { backgroundColor: '#DCFCE7' }]}>
              <ArrowUpRight color="#16A34A" size={20} />
            </View>
            <View style={styles.obligationDetails}>
              <Typography variant="bodyBold" style={{ fontSize: 15 }}>
                Monthly Salary Deposit
              </Typography>
              <View style={styles.obligationSubRow}>
                <Typography variant="caption" color={COLORS.textSecondary}>
                  Expected 28 Sep •
                </Typography>
                <View style={[styles.tagBadge, { backgroundColor: '#DCFCE7' }]}>
                  <Typography variant="caption" color="#15803D" style={{ fontSize: 11, fontWeight: '600' }}>
                    Incoming
                  </Typography>
                </View>
              </View>
            </View>
            <Typography variant="financial" style={{ fontSize: 16, color: '#16A34A' }}>
              +₹85,000
            </Typography>
          </View>
        </View>

        {/* Financial Action & Intelligence Hub */}
        <Typography variant="cardHeading" style={{ marginTop: 24, marginBottom: 12 }}>
          Financial Intelligence Hub
        </Typography>

        <TouchableOpacity
          style={styles.hubCard}
          onPress={() => router.push('/debt')}
          activeOpacity={0.75}
        >
          <View style={[styles.hubIcon, { backgroundColor: '#EFF6FF' }]}>
            <TrendingDown color="#2563EB" size={20} />
          </View>
          <View style={{ flex: 1 }}>
            <Typography variant="bodyBold">Debt & Liabilities</Typography>
            <Typography variant="caption" color={COLORS.textSecondary}>
              Active credit lines, DTI 28%, and avalanche payoff plan.
            </Typography>
          </View>
          <ArrowRight color={COLORS.textSecondary} size={18} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.hubCard}
          onPress={() => router.push('/simulator')}
          activeOpacity={0.75}
        >
          <View style={[styles.hubIcon, { backgroundColor: '#FEF3C7' }]}>
            <Zap color="#B45309" size={20} />
          </View>
          <View style={{ flex: 1 }}>
            <Typography variant="bodyBold">What-If Simulator</Typography>
            <Typography variant="caption" color={COLORS.textSecondary}>
              Adjust spending and loan levers to forecast 12-month impact.
            </Typography>
          </View>
          <ArrowRight color={COLORS.textSecondary} size={18} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.hubCard}
          onPress={() => router.push('/copilot/affordability')}
          activeOpacity={0.75}
        >
          <View style={[styles.hubIcon, { backgroundColor: '#FEE2E2' }]}>
            <AlertTriangle color="#DC2626" size={20} />
          </View>
          <View style={{ flex: 1 }}>
            <Typography variant="bodyBold">Affordability Check</Typography>
            <Typography variant="caption" color={COLORS.textSecondary}>
              Cash shortfall warning and No-Cost EMI options.
            </Typography>
          </View>
          <ArrowRight color={COLORS.textSecondary} size={18} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.hubCard}
          onPress={() => router.push('/copilot/analysis')}
          activeOpacity={0.75}
        >
          <View style={[styles.hubIcon, { backgroundColor: '#F0FDF4' }]}>
            <TrendingUp color="#16A34A" size={20} />
          </View>
          <View style={{ flex: 1 }}>
            <Typography variant="bodyBold">Copilot Audited Intelligence</Typography>
            <Typography variant="caption" color={COLORS.textSecondary}>
              Observed facts, predictive risk, and actionable spending caps.
            </Typography>
          </View>
          <ArrowRight color={COLORS.textSecondary} size={18} />
        </TouchableOpacity>

        <View style={{ height: 110 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 4,
  },
  calendarBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeframeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  tfPill: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tfPillActive: {
    backgroundColor: '#0F172A',
    borderColor: '#0F172A',
  },
  tfText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  tfTextActive: {
    color: '#FFFFFF',
  },
  forecastCard: {
    backgroundColor: '#0F172A',
    borderRadius: 24,
    paddingTop: 14,
    paddingBottom: 14,
    paddingHorizontal: 14,
    marginBottom: 16,
    overflow: 'hidden',
  },
  forecastHeader: {
    marginBottom: 10,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  cardTitle: {
    fontSize: 14.5,
    letterSpacing: 0.2,
    flexShrink: 1,
  },
  cardSubtitle: {
    fontSize: 11.5,
    marginTop: 2,
    lineHeight: 16,
  },
  floorMiniTag: {
    backgroundColor: 'rgba(214, 169, 40, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(214, 169, 40, 0.45)',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    marginLeft: 8,
  },
  floorMiniTagText: {
    color: '#F59E0B',
    fontSize: 10.5,
    fontWeight: '700',
  },
  segmentedTrackPrimary: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 11,
    padding: 2.5,
    marginBottom: 6,
    height: 30,
  },
  segmentBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
  },
  segmentBtnActive: {
    backgroundColor: 'rgba(214, 169, 40, 0.28)',
    borderWidth: 1,
    borderColor: 'rgba(214, 169, 40, 0.55)',
  },
  segmentText: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.65)',
  },
  segmentTextActive: {
    color: '#D6A928',
    fontWeight: '700',
  },
  segmentedTrackSecondary: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 10,
    padding: 2,
    marginBottom: 6,
    height: 27,
  },
  segmentSubBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  segmentSubBtnActiveGold: {
    backgroundColor: 'rgba(214, 169, 40, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(214, 169, 40, 0.45)',
  },
  segmentSubBtnActiveRed: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  segmentSubBtnActiveGreen: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    borderWidth: 1,
    borderColor: '#22C55E',
  },
  segmentSubText: {
    fontSize: 10,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  segmentSubTextActiveGold: {
    color: '#D6A928',
    fontWeight: '700',
  },
  segmentSubTextActiveRed: {
    color: '#F87171',
    fontWeight: '700',
  },
  segmentSubTextActiveGreen: {
    color: '#4ADE80',
    fontWeight: '700',
  },
  activeScrubBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(214, 169, 40, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(214, 169, 40, 0.3)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4.5,
    marginBottom: 4,
  },
  scrubIndicatorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D6A928',
    marginRight: 8,
  },
  svgWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  warningCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FDE68A',
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
  },
  warningIconWrapper: {
    marginRight: 12,
    marginTop: 2,
  },
  warningText: {
    fontSize: 13.5,
    lineHeight: 20,
  },
  warningActionBtn: {
    marginTop: 8,
  },
  warningActionText: {
    color: '#B45309',
    fontWeight: '700',
    fontSize: 12.5,
  },
  sectionHeader: {
    fontSize: 18,
    marginBottom: 12,
    color: COLORS.text,
  },
  obligationsList: {
    gap: 10,
    marginBottom: 12,
  },
  obligationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
  },
  obligationIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  obligationDetails: {
    flex: 1,
  },
  obligationSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
    gap: 6,
  },
  tagBadge: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  hubCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 10,
  },
  hubIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
});
