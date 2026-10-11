<script lang="ts">
  import { cockpit } from '../lib/state.svelte'
  import { DollarSign, ArrowUpRight, ArrowDownRight, Layers } from '@lucide/svelte'

  let preset = $derived(cockpit.currentPreset)
  let monthlyData = $derived(preset.monthlyData)

  // Max ARR for SVG chart scaling
  let maxArr = $derived(Math.max(...monthlyData.map((d) => d.endingArr)) * 1.1)
  let chartHeight = 220
  let chartWidth = 650
</script>

<div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm mb-6">
  <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-5 gap-2">
    <div>
      <h2 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
        <DollarSign class="w-5 h-5 text-indigo-500" />
        Revenue Waterfall & Growth Trajectory
      </h2>
      <p class="text-xs text-slate-500 dark:text-slate-400">
        Monthly ARR expansion, new logos, contraction, and churn dynamics.
      </p>
    </div>
    <div class="flex items-center gap-3 text-xs">
      <span class="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
        <span class="w-2.5 h-2.5 rounded-sm bg-indigo-500"></span> New & Expansion
      </span>
      <span class="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
        <span class="w-2.5 h-2.5 rounded-sm bg-rose-500"></span> Churn & Contraction
      </span>
      <span class="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-emerald-600"></span> Total Ending ARR
      </span>
    </div>
  </div>

  <!-- SVG Interactive Chart -->
  <div class="w-full overflow-x-auto pb-2">
    <div class="min-w-[600px] h-[260px] relative">
      <svg viewBox="0 0 {chartWidth} {chartHeight}" class="w-full h-full overflow-visible">
        <!-- Grid lines -->
        {#each [0.25, 0.5, 0.75, 1] as tick}
          <line
            x1="40"
            y1={chartHeight - tick * 180}
            x2={chartWidth - 20}
            y2={chartHeight - tick * 180}
            stroke="currentColor"
            class="text-slate-100 dark:text-slate-800/80"
            stroke-dasharray="3 3"
          />
          <text
            x="35"
            y={chartHeight - tick * 180 + 4}
            text-anchor="end"
            class="text-[9px] fill-slate-400 dark:fill-slate-500"
          >
            {cockpit.formatMoney((maxArr * tick), true)}
          </text>
        {/each}

        <!-- Bars & Line Points -->
        {#each monthlyData as item, idx}
          {@const x = 70 + idx * ((chartWidth - 100) / (monthlyData.length - 1 || 1))}
          {@const barY = chartHeight - (item.endingArr / maxArr) * 180}
          {@const barH = (item.endingArr / maxArr) * 180}

          <!-- Stacked bar: Ending ARR background column -->
          <rect
            x={x - 18}
            y={barY}
            width="36"
            height={barH}
            rx="6"
            class="fill-indigo-500/20 dark:fill-indigo-500/10 hover:fill-indigo-500/30 transition-all cursor-pointer"
          />

          <!-- Line to next point -->
          {#if idx < monthlyData.length - 1}
            {@const nextItem = monthlyData[idx + 1]}
            {@const nextX = 70 + (idx + 1) * ((chartWidth - 100) / (monthlyData.length - 1 || 1))}
            {@const nextY = chartHeight - (nextItem.endingArr / maxArr) * 180}
            <line
              x1={x}
              y1={barY}
              x2={nextX}
              y2={nextY}
              stroke="#10b981"
              stroke-width="2.5"
            />
          {/if}

          <!-- Data point dot -->
          <circle
            cx={x}
            cy={barY}
            r="4.5"
            class="fill-emerald-500 stroke-2 stroke-white dark:stroke-slate-900"
          />

          <!-- Net addition label above dot -->
          <text
            x={x}
            y={barY - 9}
            text-anchor="middle"
            class="text-[10px] font-bold fill-slate-800 dark:fill-slate-200"
          >
            {cockpit.formatMoney(item.endingArr, true)}
          </text>

          <!-- Month Label -->
          <text
            x={x}
            y={chartHeight + 14}
            text-anchor="middle"
            class="text-[10px] font-medium fill-slate-500 dark:fill-slate-400"
          >
            {item.month}
          </text>
        {/each}
      </svg>
    </div>
  </div>

  <!-- Detailed Monthly Table -->
  <div class="mt-4 overflow-x-auto border border-slate-100 dark:border-slate-800 rounded-xl">
    <table class="w-full text-left text-xs">
      <thead class="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-100 dark:border-slate-800">
        <tr>
          <th class="py-2.5 px-3">Month</th>
          <th class="py-2.5 px-3">New ARR</th>
          <th class="py-2.5 px-3">Expansion ARR</th>
          <th class="py-2.5 px-3">Churn & Contraction</th>
          <th class="py-2.5 px-3">Net New ARR</th>
          <th class="py-2.5 px-3">Total Ending ARR</th>
          <th class="py-2.5 px-3">Cloud COGS</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
        {#each monthlyData as row}
          {@const netNew = row.newArr + row.expansionArr - row.contractionArr - row.churnArr}
          <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
            <td class="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">{row.month}</td>
            <td class="py-2.5 px-3 text-emerald-600 dark:text-emerald-400">+{cockpit.formatMoney(row.newArr, true)}</td>
            <td class="py-2.5 px-3 text-sky-600 dark:text-sky-400">+{cockpit.formatMoney(row.expansionArr, true)}</td>
            <td class="py-2.5 px-3 text-rose-600 dark:text-rose-400">-{cockpit.formatMoney(row.contractionArr + row.churnArr, true)}</td>
            <td class="py-2.5 px-3 font-semibold text-emerald-600 dark:text-emerald-400">+{cockpit.formatMoney(netNew, true)}</td>
            <td class="py-2.5 px-3 font-bold text-slate-900 dark:text-white">{cockpit.formatMoney(row.endingArr, true)}</td>
            <td class="py-2.5 px-3 text-slate-500 dark:text-slate-400">{cockpit.formatMoney(row.cloudCost, true)}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
