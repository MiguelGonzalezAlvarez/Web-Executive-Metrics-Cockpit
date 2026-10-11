<script lang="ts">
  import { cockpit } from '../lib/state.svelte'
  import {
    Server,
    Cpu,
    AlertTriangle,
    Zap,
    TrendingDown,
    ArrowUpRight,
    ArrowDownRight,
    ShieldAlert,
    CheckCircle2,
  } from '@lucide/svelte'

  let preset = $derived(cockpit.currentPreset)
  let finOps = $derived(preset.finOps)
  let sim = $derived(cockpit.simulated)
</script>

<div class="space-y-6 mb-6">
  <!-- Top FinOps Unit Metrics -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <!-- Total Cloud & AI Spend -->
    <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          Total Monthly Cloud Spend
        </span>
        <div class="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
          <Server class="w-4 h-4" />
        </div>
      </div>
      <div class="text-2xl font-black text-slate-900 dark:text-white">
        {cockpit.formatMoney(sim.simulatedMonthlyCloudSpend, true)}
      </div>
      {#if sim.monthlyCloudSavings > 0}
        <div class="mt-2 text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
          <TrendingDown class="w-3.5 h-3.5" />
          <span>Saving {cockpit.formatMoney(sim.monthlyCloudSavings, true)}/mo via FinOps</span>
        </div>
      {:else}
        <div class="mt-2 text-xs text-slate-500 dark:text-slate-400">
          Impact on COGS: <span class="font-semibold text-rose-500">-{finOps.grossMarginImpact}% GM</span>
        </div>
      {/if}
    </div>

    <!-- GPU Utilization -->
    <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          GPU Cluster Utilization
        </span>
        <div class="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
          <Cpu class="w-4 h-4" />
        </div>
      </div>
      <div class="text-2xl font-black text-slate-900 dark:text-white">
        {finOps.gpuUtilization}%
      </div>
      <div class="mt-2 flex items-center gap-2">
        <div class="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
          <div
            class="h-full rounded-full transition-all duration-500 {finOps.gpuUtilization > 85 ? 'bg-emerald-500' : finOps.gpuUtilization > 65 ? 'bg-sky-500' : 'bg-amber-500'}"
            style="width: {finOps.gpuUtilization}%"
          ></div>
        </div>
        <span class="text-xs font-medium text-slate-500">Target >85%</span>
      </div>
    </div>

    <!-- Cost per Active Tenant/User -->
    <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          Cloud Cost / Active User
        </span>
        <div class="p-2 rounded-xl bg-sky-500/10 text-sky-500">
          <Zap class="w-4 h-4" />
        </div>
      </div>
      <div class="text-2xl font-black text-slate-900 dark:text-white">
        {cockpit.currencySymbol}{finOps.costPerUser} <span class="text-xs font-normal text-slate-500">/mo</span>
      </div>
      <div class="mt-2 text-xs text-slate-500 dark:text-slate-400">
        Token Cost: <span class="font-semibold text-slate-700 dark:text-slate-300">{cockpit.currencySymbol}{finOps.costPerMillionTokens} / 1M tokens</span>
      </div>
    </div>

    <!-- AI Inference % of Cloud -->
    <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          AI Inference Allocation
        </span>
        <div class="p-2 rounded-xl bg-purple-500/10 text-purple-500">
          <Cpu class="w-4 h-4" />
        </div>
      </div>
      <div class="text-2xl font-black text-slate-900 dark:text-white">
        {cockpit.formatMoney(finOps.aiInferenceSpend, true)}
      </div>
      <div class="mt-2 text-xs text-slate-500 dark:text-slate-400">
        Share of Spend: <span class="font-semibold text-purple-600 dark:text-purple-400">{Math.round((finOps.aiInferenceSpend / finOps.totalCloudSpend) * 100)}%</span>
      </div>
    </div>
  </div>

  <!-- Breakdown List & Active Anomalies -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Category Breakdown (2 Cols) -->
    <div class="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
      <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
        <h3 class="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Server class="w-4 h-4 text-indigo-500" />
          Infrastructure Spend by Category
        </h3>
        <span class="text-xs text-slate-500 dark:text-slate-400">AWS · GCP · Azure · OCI</span>
      </div>

      <div class="space-y-4">
        {#each finOps.infrastructureBreakdown as item}
          <div class="space-y-1.5">
            <div class="flex items-center justify-between text-xs">
              <span class="font-semibold text-slate-800 dark:text-slate-200">{item.category}</span>
              <div class="flex items-center gap-3">
                <span class="font-bold text-slate-900 dark:text-white">{cockpit.formatMoney(item.spend, true)}</span>
                <span class="text-slate-400">({item.percentage}%)</span>
                {#if item.trend > 0}
                  <span class="text-rose-500 font-semibold flex items-center">
                    +{item.trend}%
                  </span>
                {:else}
                  <span class="text-emerald-500 font-semibold flex items-center">
                    {item.trend}%
                  </span>
                {/if}
              </div>
            </div>
            <!-- Progress Bar -->
            <div class="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                class="bg-indigo-500 h-full rounded-full transition-all duration-300"
                style="width: {item.percentage}%"
              ></div>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Active FinOps Anomalies & Savings -->
    <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
      <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
        <h3 class="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldAlert class="w-4 h-4 text-amber-500" />
          FinOps Anomaly Detection
        </h3>
        <span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400">
          {finOps.anomalies.length} Alerts
        </span>
      </div>

      <div class="space-y-3">
        {#each finOps.anomalies as anom}
          <div class="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <AlertTriangle class="w-3.5 h-3.5 text-amber-500" />
                {anom.service}
              </span>
              <span class="text-[10px] text-slate-400">{anom.timestamp}</span>
            </div>
            <p class="text-xs text-slate-600 dark:text-slate-300">
              {anom.message}
            </p>
            <div class="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs">
              <span class="text-slate-500">Est. Savings:</span>
              <span class="font-bold text-emerald-600 dark:text-emerald-400">
                +{cockpit.formatMoney(anom.potentialSavings, true)}/mo
              </span>
            </div>
          </div>
        {/each}

        <div class="pt-2">
          <div class="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
            <CheckCircle2 class="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span>Enable automated GPU scale-down to reclaim ~14% monthly cluster cost.</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
