<script lang="ts">
  import { cockpit } from '../lib/state.svelte'
  import {
    TrendingUp,
    ShieldCheck,
    Zap,
    Clock,
    Flame,
    Cpu,
    ArrowUpRight,
    ArrowDownRight,
  } from '@lucide/svelte'

  let preset = $derived(cockpit.currentPreset)
  let kpis = $derived(preset.kpis)
  let sim = $derived(cockpit.simulated)
</script>

<section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
  <!-- Card 1: ARR & Growth -->
  <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm relative overflow-hidden group hover:border-indigo-500/50 transition-colors">
    <div class="flex items-center justify-between mb-3">
      <span class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        Annual Recurring Revenue
      </span>
      <div class="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
        <TrendingUp class="w-4 h-4" />
      </div>
    </div>
    <div class="flex items-baseline space-x-2">
      <span class="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        {cockpit.formatMoney(sim.adjustedArr, true)}
      </span>
      <span class="text-xs font-medium text-slate-500 dark:text-slate-400">
        MRR: {cockpit.formatMoney(sim.adjustedMrr, true)}
      </span>
    </div>
    <div class="mt-3 flex items-center justify-between text-xs pt-3 border-t border-slate-100 dark:border-slate-800/80">
      <div class="flex items-center text-emerald-600 dark:text-emerald-400 font-semibold">
        <ArrowUpRight class="w-3.5 h-3.5 mr-0.5" />
        <span>+{sim.effectiveGrowth.toFixed(1)}% YoY</span>
      </div>
      <span class="text-slate-500 dark:text-slate-400">
        Magic No: <span class="font-semibold text-slate-700 dark:text-slate-300">{kpis.magicNumber}x</span>
      </span>
    </div>
  </div>

  <!-- Card 2: Rule of 40 -->
  <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
    <div class="flex items-center justify-between mb-3">
      <span class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        Rule of 40 Score
      </span>
      <div class="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
        <Zap class="w-4 h-4" />
      </div>
    </div>
    <div class="flex items-baseline space-x-2">
      <span class="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        {sim.simulatedRuleOf40}%
      </span>
      {#if sim.simulatedRuleOf40 >= 50}
        <span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          Elite Tier
        </span>
      {:else if sim.simulatedRuleOf40 >= 40}
        <span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
          Above Par (>40)
        </span>
      {:else}
        <span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
          Sub-optimal
        </span>
      {/if}
    </div>
    <div class="mt-3 flex items-center justify-between text-xs pt-3 border-t border-slate-100 dark:border-slate-800/80">
      <span class="text-slate-500 dark:text-slate-400">
        FCF Margin: <span class="font-semibold text-slate-700 dark:text-slate-300">{sim.effectiveFcf}%</span>
      </span>
      <span class="text-slate-500 dark:text-slate-400">
        Growth: <span class="font-semibold text-slate-700 dark:text-slate-300">{sim.effectiveGrowth.toFixed(0)}%</span>
      </span>
    </div>
  </div>

  <!-- Card 3: Net Revenue Retention (NRR) & Retention -->
  <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm relative overflow-hidden group hover:border-sky-500/50 transition-colors">
    <div class="flex items-center justify-between mb-3">
      <span class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        Net Revenue Retention (NRR)
      </span>
      <div class="p-2 rounded-xl bg-sky-500/10 text-sky-500">
        <ShieldCheck class="w-4 h-4" />
      </div>
    </div>
    <div class="flex items-baseline space-x-2">
      <span class="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        {kpis.nrr}%
      </span>
      <span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
        Gross: {kpis.grossRetention}%
      </span>
    </div>
    <div class="mt-3 flex items-center justify-between text-xs pt-3 border-t border-slate-100 dark:border-slate-800/80">
      <span class="text-slate-500 dark:text-slate-400">
        LTV / CAC: <span class="font-semibold text-emerald-600 dark:text-emerald-400">{kpis.ltvCacRatio}x</span>
      </span>
      <span class="text-slate-500 dark:text-slate-400">
        Payback: <span class="font-semibold text-slate-700 dark:text-slate-300">{kpis.cacPaybackMonths} mo</span>
      </span>
    </div>
  </div>

  <!-- Card 4: Runway & FinOps Spend -->
  <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm relative overflow-hidden group hover:border-amber-500/50 transition-colors">
    <div class="flex items-center justify-between mb-3">
      <span class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        Runway & Net Burn
      </span>
      <div class="p-2 rounded-xl bg-amber-500/10 text-amber-500">
        <Flame class="w-4 h-4" />
      </div>
    </div>
    <div class="flex items-baseline space-x-2">
      <span class="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        {#if sim.simulatedRunwayMonths >= 999}
          Infinite
        {:else}
          {sim.simulatedRunwayMonths} <span class="text-base font-medium text-slate-500">mo</span>
        {/if}
      </span>
      <span class="text-xs font-medium text-slate-500 dark:text-slate-400">
        Cash: {cockpit.formatMoney(kpis.cashInBank, true)}
      </span>
    </div>
    <div class="mt-3 flex items-center justify-between text-xs pt-3 border-t border-slate-100 dark:border-slate-800/80">
      <span class="text-slate-500 dark:text-slate-400">
        Net Burn: <span class="font-semibold text-rose-600 dark:text-rose-400">{cockpit.formatMoney(sim.simulatedMonthlyNetBurn, true)}/mo</span>
      </span>
      <span class="text-slate-500 dark:text-slate-400">
        Gross Margin: <span class="font-semibold text-slate-700 dark:text-slate-300">{kpis.grossMargin}%</span>
      </span>
    </div>
  </div>
</section>
