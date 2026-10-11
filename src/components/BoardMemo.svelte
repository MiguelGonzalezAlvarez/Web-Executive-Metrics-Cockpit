<script lang="ts">
  import { cockpit } from '../lib/state.svelte'
  import { FileText, Copy, Check, Download } from '@lucide/svelte'

  let copied = $state(false)
  let preset = $derived(cockpit.currentPreset)
  let kpis = $derived(preset.kpis)
  let sim = $derived(cockpit.simulated)

  let memoContent = $derived(`
# EXECUTIVE BOARD MEMORANDUM // Q4 FINANCIAL & FINOPS TELEMETRY
Target Entity: ${preset.name} (${preset.badge})
Generated: ${new Date().toLocaleDateString()}
Report Currency: ${cockpit.currency}

---

## 1. EXECUTIVE SUMMARY & REVENUE TRAJECTORY
* Ending Run-rate ARR: ${cockpit.formatMoney(sim.adjustedArr)} (Baseline: ${cockpit.formatMoney(kpis.arr)})
* Monthly Recurring Revenue (MRR): ${cockpit.formatMoney(sim.adjustedMrr)}
* Year-over-Year Growth: +${sim.effectiveGrowth.toFixed(1)}% YoY
* Net Revenue Retention (NRR): ${kpis.nrr}% (Gross Retention: ${kpis.grossRetention}%)
* Magic Number: ${kpis.magicNumber}x
* LTV to CAC Ratio: ${kpis.ltvCacRatio}x (CAC Payback: ${kpis.cacPaybackMonths} months)

## 2. FINOPS & CLOUD UNIT ECONOMICS
* Total Monthly Cloud Spend: ${cockpit.formatMoney(sim.simulatedMonthlyCloudSpend)}
* Monthly Optimization Savings: ${cockpit.formatMoney(sim.monthlyCloudSavings)}
* AI Inference Share: ${cockpit.formatMoney(preset.finOps.aiInferenceSpend)} (${Math.round((preset.finOps.aiInferenceSpend / preset.finOps.totalCloudSpend) * 100)}% of total cloud)
* Average GPU Cluster Utilization: ${preset.finOps.gpuUtilization}%
* Cost per Active User: ${cockpit.currencySymbol}${preset.finOps.costPerUser}/month
* Blended Token Cost: ${cockpit.currencySymbol}${preset.finOps.costPerMillionTokens} / 1M tokens

## 3. CAPITAL EFFICIENCY & VALUATION
* Cash Balance in Bank: ${cockpit.formatMoney(kpis.cashInBank)}
* Monthly Net Cash Burn: ${cockpit.formatMoney(sim.simulatedMonthlyNetBurn)}/month
* Operational Runway: ${sim.simulatedRunwayMonths >= 999 ? 'Cash Flow Positive / Infinite' : `${sim.simulatedRunwayMonths} months`}
* Rule of 40 Score: ${sim.simulatedRuleOf40}% (FCF Margin: ${sim.effectiveFcf}%)
* Market Comparable Multiple: ${sim.valuationMultiple}x ARR
* Implied Enterprise Valuation: ${cockpit.formatMoney(sim.projectedValuation)}

## 4. STRATEGIC RECOMMENDATIONS FOR THE BOARD
1. ${sim.simulatedRunwayMonths < 18 ? 'Execute immediate cost containment on GPU workloads and defer non-essential hiring.' : 'Maintain aggressive R&D cadence while locking in annual upfront customer commitments.'}
2. Capitalize on ${kpis.nrr}% NRR by introducing multi-seat enterprise tiers and usage-based token overages.
3. Resolve highlighted FinOps anomalies to capture ~${cockpit.formatMoney(sim.monthlyCloudSavings + 15000, true)} in annualized margin expansion.

---
Prepared by Executive Telemetry Cockpit · Portfolio of Miguel González Álvarez
`.trim())

  function copyMemo(): void {
    navigator.clipboard.writeText(memoContent)
    copied = true
    setTimeout(() => {
      copied = false
    }, 2000)
  }

  function downloadMemo(): void {
    const blob = new Blob([memoContent], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Board-Memo-${preset.id}.md`
    a.click()
    URL.revokeObjectURL(url)
  }
</script>

<div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm mb-6">
  <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-5 gap-2">
    <div>
      <h2 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
        <FileText class="w-5 h-5 text-indigo-500" />
        Automated Board Memorandum Generator
      </h2>
      <p class="text-xs text-slate-500 dark:text-slate-400">
        Board-ready executive summary generated directly from live telemetry and simulation parameters.
      </p>
    </div>
    <div class="flex items-center space-x-2">
      <button
        onclick={copyMemo}
        class="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-1.5 transition-colors"
      >
        {#if copied}
          <Check class="w-3.5 h-3.5 text-emerald-500" />
          <span>Copied!</span>
        {:else}
          <Copy class="w-3.5 h-3.5" />
          <span>Copy Markdown</span>
        {/if}
      </button>

      <button
        onclick={downloadMemo}
        class="text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 flex items-center gap-1.5 shadow-sm transition-colors"
      >
        <Download class="w-3.5 h-3.5" />
        <span>Export .md</span>
      </button>
    </div>
  </div>

  <div class="bg-slate-950 text-slate-200 rounded-xl p-5 font-mono text-xs overflow-x-auto whitespace-pre leading-relaxed border border-slate-800">
    {memoContent}
  </div>
</div>
