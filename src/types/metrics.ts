export type Currency = 'USD' | 'EUR' | 'GBP'

export interface FinancialKPIs {
  arr: number               // Annual Recurring Revenue
  mrr: number               // Monthly Recurring Revenue
  growthYoY: number         // Year over Year Growth percentage (e.g. 84 for 84%)
  magicNumber: number       // Net New ARR / Sales & Marketing spend
  ruleOf40: number          // Growth YoY + FCF Margin
  fcfMargin: number         // Free Cash Flow margin %
  nrr: number               // Net Revenue Retention %
  grossRetention: number    // Gross Retention %
  cacPaybackMonths: number  // Months to recover Customer Acquisition Cost
  ltvCacRatio: number       // LTV:CAC ratio
  cashInBank: number        // Cash balance
  monthlyNetBurn: number    // Monthly burn rate
  runwayMonths: number      // Cash / monthlyNetBurn
  grossMargin: number       // Gross margin %
}

export interface FinOpsMetrics {
  totalCloudSpend: number       // Monthly cloud + AI spend
  aiInferenceSpend: number      // Spend on LLM APIs & GPU clusters
  gpuUtilization: number        // % utilization of allocated GPUs
  costPerUser: number           // Average cloud cost per active user
  costPerMillionTokens: number  // Blended cost per 1M tokens
  grossMarginImpact: number     // % points cloud spend reduces gross margin
  infrastructureBreakdown: {
    category: string
    spend: number
    percentage: number
    trend: number               // WoW change %
  }[]
  anomalies: {
    id: string
    service: string
    severity: 'low' | 'medium' | 'high'
    message: string
    timestamp: string
    potentialSavings: number
  }[]
}

export interface MonthlyTrajectory {
  month: string
  newArr: number
  expansionArr: number
  contractionArr: number
  churnArr: number
  endingArr: number
  cloudCost: number
}

export interface CohortRow {
  cohort: string
  startingCustomers: number
  retention: number[] // Percentage retention at Month 0, 1, 2, ... 11
}

export interface ScenarioModifiers {
  growthTargetDelta: number       // -50% to +100%
  arpuAdjustment: number          // -30% to +50%
  churnReduction: number          // -5% to +5%
  headcountDelta: number          // -10 to +40 FTEs
  finOpsOptimizationPct: number   // 0% to 50% reduction in AI/Cloud spend
}

export interface CompanyPreset {
  id: string
  name: string
  badge: string
  description: string
  kpis: FinancialKPIs
  finOps: FinOpsMetrics
  monthlyData: MonthlyTrajectory[]
  cohorts: CohortRow[]
}
