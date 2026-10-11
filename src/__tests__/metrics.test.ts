import { describe, it, expect, beforeEach } from 'vitest'
import { cockpit } from '../lib/state.svelte'
import { PRESETS } from '../data/presets'

describe('Executive Cockpit State & Math Engine', () => {
  beforeEach(() => {
    cockpit.setPreset('hypergrowth-ai')
    cockpit.currency = 'USD'
  })

  it('loads valid initial company presets', () => {
    expect(PRESETS.length).toBeGreaterThanOrEqual(3)
    const preset = cockpit.currentPreset
    expect(preset.id).toBe('hypergrowth-ai')
    expect(preset.kpis.arr).toBe(14800000)
    expect(preset.kpis.growthYoY).toBe(94)
  })

  it('calculates baseline simulation metrics correctly', () => {
    const sim = cockpit.simulated
    expect(sim.adjustedArr).toBe(14800000)
    expect(sim.adjustedMrr).toBe(Math.round(14800000 / 12))
    expect(sim.simulatedRuleOf40).toBe(72)
    expect(sim.valuationMultiple).toBe(14.5)
    expect(sim.projectedValuation).toBe(Math.round(14800000 * 14.5))
  })

  it('reacts dynamically to growth and pricing modifiers', () => {
    cockpit.modifiers.growthTargetDelta = 20
    cockpit.modifiers.arpuAdjustment = 10

    const sim = cockpit.simulated
    // Growth multiplier = 1.2, ARPU = 1.1 -> 14.8M * 1.32 = ~19.536M
    expect(sim.adjustedArr).toBeGreaterThan(14800000)
    expect(sim.effectiveGrowth).toBe(119) // 94 + 20 + 5
  })

  it('calculates FinOps cloud optimizations and net burn impact', () => {
    const baseCloudSpend = cockpit.currentPreset.finOps.totalCloudSpend
    cockpit.modifiers.finOpsOptimizationPct = 25 // 25% savings

    const sim = cockpit.simulated
    expect(sim.monthlyCloudSavings).toBeGreaterThan(0)
    expect(sim.simulatedMonthlyCloudSpend).toBeLessThan(baseCloudSpend)
  })

  it('adjusts runway for headcount changes', () => {
    cockpit.modifiers.headcountDelta = 10 // +10 FTEs = +$150k/month cost
    const sim = cockpit.simulated
    expect(sim.simulatedMonthlyNetBurn).toBeGreaterThan(cockpit.currentPreset.kpis.monthlyNetBurn)
  })

  it('handles infinite runway correctly for profitable presets', () => {
    cockpit.setPreset('bootstrapped-b2b')
    const sim = cockpit.simulated
    expect(sim.simulatedRunwayMonths).toBe(999)
  })

  it('formats currencies with appropriate symbols and rates', () => {
    cockpit.currency = 'USD'
    expect(cockpit.formatMoney(1000000, true)).toBe('$1.0M')

    cockpit.currency = 'EUR'
    expect(cockpit.currencySymbol).toBe('€')
    expect(cockpit.formatMoney(1000000, true)).toBe('€920K')

    cockpit.currency = 'GBP'
    expect(cockpit.currencySymbol).toBe('£')
    expect(cockpit.formatMoney(1000000, true)).toBe('£790K')
  })
})
