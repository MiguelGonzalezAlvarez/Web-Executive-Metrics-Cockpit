<script lang="ts">
  import { cockpit } from '../lib/state.svelte'
  import { Users, ShieldCheck, CheckCircle2 } from '@lucide/svelte'

  let preset = $derived(cockpit.currentPreset)
  let cohorts = $derived(preset.cohorts)

  // Color generator for retention %
  function getRetentionColor(pct: number): string {
    if (pct >= 98) return 'bg-emerald-600 text-white'
    if (pct >= 95) return 'bg-emerald-500 text-white'
    if (pct >= 90) return 'bg-teal-500 text-white'
    if (pct >= 85) return 'bg-sky-500 text-white'
    if (pct >= 80) return 'bg-indigo-500 text-white'
    if (pct >= 75) return 'bg-amber-500 text-white'
    return 'bg-rose-500 text-white'
  }
</script>

<div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm mb-6">
  <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-5 gap-2">
    <div>
      <h2 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
        <Users class="w-5 h-5 text-sky-500" />
        Customer Retention Cohort Heatmap
      </h2>
      <p class="text-xs text-slate-500 dark:text-slate-400">
        Percentage of active customer logos retained month-over-month.
      </p>
    </div>
    <div class="flex items-center gap-2 text-xs">
      <span class="px-2 py-1 rounded bg-emerald-600 text-white font-medium">98%+</span>
      <span class="px-2 py-1 rounded bg-teal-500 text-white font-medium">90-95%</span>
      <span class="px-2 py-1 rounded bg-sky-500 text-white font-medium">85-90%</span>
      <span class="px-2 py-1 rounded bg-amber-500 text-white font-medium">75-80%</span>
      <span class="px-2 py-1 rounded bg-rose-500 text-white font-medium">&lt;75%</span>
    </div>
  </div>

  <!-- Heatmap Grid -->
  <div class="overflow-x-auto pb-2">
    <table class="w-full text-center text-xs">
      <thead>
        <tr class="text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-100 dark:border-slate-800">
          <th class="py-2.5 px-3 text-left">Cohort</th>
          <th class="py-2.5 px-3 text-left">Logos</th>
          {#each Array.from({ length: 12 }) as _, i}
            <th class="py-2.5 px-1.5 min-w-[36px]">M{i}</th>
          {/each}
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60">
        {#each cohorts as row}
          <tr>
            <td class="py-2.5 px-3 text-left font-bold text-slate-900 dark:text-white">
              {row.cohort}
            </td>
            <td class="py-2.5 px-3 text-left text-slate-500 dark:text-slate-400">
              {row.startingCustomers}
            </td>
            {#each Array.from({ length: 12 }) as _, mIdx}
              <td class="py-1 px-1">
                {#if row.retention[mIdx] !== undefined}
                  <div
                    class="py-1.5 rounded-md font-semibold text-[11px] transition-transform hover:scale-105 {getRetentionColor(row.retention[mIdx])}"
                  >
                    {row.retention[mIdx]}%
                  </div>
                {:else}
                  <div class="py-1.5 rounded-md text-slate-300 dark:text-slate-700 font-mono text-[11px]">
                    -
                  </div>
                {/if}
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <!-- Executive Insights Footer -->
  <div class="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
    <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
      <span class="text-slate-500 dark:text-slate-400 block mb-1">Month-12 Retention Floor</span>
      <span class="text-base font-bold text-emerald-600 dark:text-emerald-400">
        {cohorts[0]?.retention[cohorts[0].retention.length - 1] ?? 91}% Logo Retention
      </span>
    </div>
    <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
      <span class="text-slate-500 dark:text-slate-400 block mb-1">Net Expansion Offset</span>
      <span class="text-base font-bold text-indigo-600 dark:text-indigo-400">
        +{cockpit.currentPreset.kpis.nrr - 100}% Net Expansion
      </span>
    </div>
    <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
      <span class="text-slate-500 dark:text-slate-400 block mb-1">Annual Churn Velocity</span>
      <span class="text-base font-bold text-slate-900 dark:text-white">
        {(100 - cockpit.currentPreset.kpis.grossRetention).toFixed(1)}% Gross Loss
      </span>
    </div>
  </div>
</div>
