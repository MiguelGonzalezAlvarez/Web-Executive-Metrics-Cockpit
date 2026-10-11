import { PRESETS } from '../data/presets'
import type { CompanyPreset, Currency, ScenarioModifiers } from '../types/metrics'

class CockpitStore {
  presetId = $state<string>('hypergrowth-ai')
  currency = $state<Currency>('USD')
  isDark = $state<boolean>(true)
  activeTab = $state<'overview' | 'revenue' | 'finops' | 'cohorts' | 'simulator' | 'memo'>('overview')

  modifiers = $state<ScenarioModifiers>({
    growthTargetDelta: 0,
    arpuAdjustment: 0,
    churnReduction: 0,
    headcountDelta: 0,
    finOpsOptimizationPct: 0,
  })

  // Selected Preset
  currentPreset = $derived.by<CompanyPreset>(() => {
    const found = PRESETS.find((p) => p.id === this.presetId)
    return found || PRESETS[0]
  })

  currencySymbol = $derived.by<string>(() => {
    switch (this.currency) {
      case 'EUR': return '€'
      case 'GBP': return '£'
      default: return '$'
    }
  })

  currencyRate = $derived.by<number>(() => {
    switch (this.currency) {
      case 'EUR': return 0.92
      case 'GBP': return 0.79
      default: return 1.0
    }
  })

  // Simulated Derived Financials
  simulated = $derived.by(() => {
    const base = this.currentPreset.kpis
    const fin = this.currentPreset.finOps
    const m = this.modifiers

    // 1. ARR Adjustment
    const growthMult = 1 + m.growthTargetDelta / 100
    const arpuMult = 1 + m.arpuAdjustment / 100
    const churnBonus = 1 + (m.churnReduction * 0.5) / 100

    const adjustedArr = Math.round(base.arr * growthMult * arpuMult * churnBonus)
    const adjustedMrr = Math.round(adjustedArr / 12)

    // 2. FinOps Cloud Savings
    const cloudEfficiencyFactor = 1 - m.finOpsOptimizationPct / 100
    const cloudVolumeGrowth = 1 + (m.growthTargetDelta * 0.4) / 100
    const simulatedMonthlyCloudSpend = Math.round(fin.totalCloudSpend * cloudEfficiencyFactor * cloudVolumeGrowth)
    const monthlyCloudSavings = Math.round(fin.totalCloudSpend - simulatedMonthlyCloudSpend)

    // 3. Headcount cost (Average $15k/month loaded per FTE)
    const monthlyHeadcountCost = m.headcountDelta * 15000

    // 4. Monthly Revenue Delta
    const monthlyRevenueDelta = adjustedMrr - base.mrr

    // 5. Net Burn & Runway
    // Base Burn + Headcount cost - Additional Revenue - Cloud Savings
    const simulatedMonthlyNetBurn = Math.round(
      base.monthlyNetBurn + monthlyHeadcountCost - monthlyRevenueDelta - monthlyCloudSavings
    )

    let simulatedRunwayMonths: number
    if (simulatedMonthlyNetBurn <= 0) {
      simulatedRunwayMonths = 999 // Infinite / Cash flow positive
    } else {
      simulatedRunwayMonths = Number((base.cashInBank / simulatedMonthlyNetBurn).toFixed(1))
    }

    // 6. Rule of 40 Calculation
    const effectiveGrowth = base.growthYoY + m.growthTargetDelta + (m.arpuAdjustment * 0.5)
    const effectiveFcf = Number((-(simulatedMonthlyNetBurn * 12) / adjustedArr * 100).toFixed(1))
    const simulatedRuleOf40 = Math.round(effectiveGrowth + effectiveFcf)

    // 7. Valuation Multiple Estimator
    let valuationMultiple = 5.0
    if (simulatedRuleOf40 >= 60) {
      valuationMultiple = 14.5
    } else if (simulatedRuleOf40 >= 40) {
      valuationMultiple = 10.0
    } else if (simulatedRuleOf40 >= 20) {
      valuationMultiple = 6.5
    } else {
      valuationMultiple = 3.5
    }
    const projectedValuation = Math.round(adjustedArr * valuationMultiple)

    return {
      adjustedArr,
      adjustedMrr,
      simulatedMonthlyCloudSpend,
      monthlyCloudSavings,
      simulatedMonthlyNetBurn,
      simulatedRunwayMonths,
      simulatedRuleOf40,
      effectiveGrowth,
      effectiveFcf,
      valuationMultiple,
      projectedValuation,
    }
  })

  // Format currency helper
  formatMoney(amount: number, compact = false): string {
    const val = amount * this.currencyRate
    const sym = this.currencySymbol

    if (compact) {
      if (Math.abs(val) >= 1_000_000_000) {
        return `${sym}${(val / 1_000_000_000).toFixed(1)}B`
      }
      if (Math.abs(val) >= 1_000_000) {
        return `${sym}${(val / 1_000_000).toFixed(1)}M`
      }
      if (Math.abs(val) >= 1_000) {
        return `${sym}${(val / 1_000).toFixed(0)}K`
      }
      return `${sym}${Math.round(val)}`
    }

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: this.currency,
      maximumFractionDigits: 0,
    }).format(val)
  }

  resetModifiers(): void {
    this.modifiers = {
      growthTargetDelta: 0,
      arpuAdjustment: 0,
      churnReduction: 0,
      headcountDelta: 0,
      finOpsOptimizationPct: 0,
    }
  }

  setPreset(id: string): void {
    this.presetId = id
    this.resetModifiers()
  }

  toggleTheme(): void {
    this.isDark = !this.isDark
    if (typeof document !== 'undefined') {
      if (this.isDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }
}

export const cockpit = new CockpitStore()
