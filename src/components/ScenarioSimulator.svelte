<script lang="ts">
  import { cockpit } from '../lib/state.svelte'
  import {
    Sliders,
    RefreshCw,
    TrendingUp,
    Flame,
    Zap,
    DollarSign,
    Lightbulb,
    ArrowRight,
  } from '@lucide/svelte'

  let sim = $derived(cockpit.simulated)
  let kpis = $derived(cockpit.currentPreset.kpis)
</script>

<div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm mb-6">
  <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6 gap-2">
    <div>
      <h2 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
        <Sliders class="w-5 h-5 text-indigo-500" />
        Executive What-If Scenario Simulator
      </h2>
      <p class="text-xs text-slate-500 dark:text-slate-400">
        Adjust strategic growth levers, hiring budgets, and FinOps optimizations in real-time.
      </p>
    </div>
    <button
      onclick={() => cockpit.resetModifiers()}
      class="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-1.5 transition-colors"
    >
      <RefreshCw class="w-3.5 h-3.5" />
      <span>Reset Levers</span>
    </button>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <!-- Levers Column (7 Cols) -->
    <div class="lg:col-span-7 space-y-5">
      <!-- Lever 1: Growth Target Delta -->
      <div class="space-y-2">
        <div class="flex justify-between text-xs font-medium">
          <span class="text-slate-700 dark:text-slate-300 font-semibold">Growth Acceleration Target</span>
          <span class="text-indigo-600 dark:text-indigo-400 font-bold">
            {cockpit.modifiers.growthTargetDelta > 0 ? '+' : ''}{cockpit.modifiers.growthTargetDelta}% YoY
          </span>
        </div>
        <input
          type="range"
          min="-30"
          max="80"
          step="5"
          bind:value={cockpit.modifiers.growthTargetDelta}
          class="w-full accent-indigo-600 cursor-pointer"
        />
        <div class="flex justify-between text-[10px] text-slate-400">
          <span>-30% (Conservative)</span>
          <span>Baseline</span>
          <span>+80% (Aggressive)</span>
        </div>
      </div>

      <!-- Lever 2: Pricing / ARPU Change -->
      <div class="space-y-2">
        <div class="flex justify-between text-xs font-medium">
          <span class="text-slate-700 dark:text-slate-300 font-semibold">Pricing & ARPU Expansion</span>
          <span class="text-emerald-600 dark:text-emerald-400 font-bold">
            {cockpit.modifiers.arpuAdjustment > 0 ? '+' : ''}{cockpit.modifiers.arpuAdjustment}%
          </span>
        </div>
        <input
          type="range"
          min="-20"
          max="40"
          step="5"
          bind:value={cockpit.modifiers.arpuAdjustment}
          class="w-full accent-emerald-500 cursor-pointer"
        />
        <div class="flex justify-between text-[10px] text-slate-400">
          <span>-20% Discounting</span>
          <span>Current Pricing</span>
          <span>+40% Value Tiering</span>
        </div>
      </div>

      <!-- Lever 3: Churn Reduction -->
      <div class="space-y-2">
        <div class="flex justify-between text-xs font-medium">
          <span class="text-slate-700 dark:text-slate-300 font-semibold">Churn Mitigation Effort</span>
          <span class="text-sky-600 dark:text-sky-400 font-bold">
            {cockpit.modifiers.churnReduction > 0 ? '+' : ''}{cockpit.modifiers.churnReduction}% Churn Delta
          </span>
        </div>
        <input
          type="range"
          min="-5"
          max="5"
          step="1"
          bind:value={cockpit.modifiers.churnReduction}
          class="w-full accent-sky-500 cursor-pointer"
        />
        <div class="flex justify-between text-[10px] text-slate-400">
          <span>-5% Worse Churn</span>
          <span>Baseline</span>
          <span>+5% Retention Boost</span>
        </div>
      </div>

      <!-- Lever 4: Headcount FTE Hiring -->
      <div class="space-y-2">
        <div class="flex justify-between text-xs font-medium">
          <span class="text-slate-700 dark:text-slate-300 font-semibold">Net Headcount Expansion</span>
          <span class="text-amber-600 dark:text-amber-400 font-bold">
            {cockpit.modifiers.headcountDelta > 0 ? '+' : ''}{cockpit.modifiers.headcountDelta} FTEs ({cockpit.formatMoney(cockpit.modifiers.headcountDelta * 15000, true)}/mo)
          </span>
        </div>
        <input
          type="range"
          min="-10"
          max="35"
          step="1"
          bind:value={cockpit.modifiers.headcountDelta}
          class="w-full accent-amber-500 cursor-pointer"
        />
        <div class="flex justify-between text-[10px] text-slate-400">
          <span>-10 FTEs (Reduction)</span>
          <span>0 (Freeze)</span>
          <span>+35 FTEs (Scaleup)</span>
        </div>
      </div>

      <!-- Lever 5: FinOps AI/Cloud Optimization -->
      <div class="space-y-2">
        <div class="flex justify-between text-xs font-medium">
          <span class="text-slate-700 dark:text-slate-300 font-semibold">FinOps & AI GPU Optimization</span>
          <span class="text-purple-600 dark:text-purple-400 font-bold">
            -{cockpit.modifiers.finOpsOptimizationPct}% Cloud Spend
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="45"
          step="5"
          bind:value={cockpit.modifiers.finOpsOptimizationPct}
          class="w-full accent-purple-500 cursor-pointer"
        />
        <div class="flex justify-between text-[10px] text-slate-400">
          <span>0% (As-is)</span>
          <span>20% (Spot/Cache)</span>
          <span>45% (Model Distillation)</span>
        </div>
      </div>
    </div>

    <!-- Projected Impact Output Column (5 Cols) -->
    <div class="lg:col-span-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between">
      <div>
        <h3 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
          Simulation Output & Valuation
        </h3>

        <div class="space-y-4">
          <!-- Projected ARR -->
          <div class="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-slate-700/60">
            <span class="text-xs text-slate-600 dark:text-slate-300">Projected Run-rate ARR</span>
            <div class="text-right">
              <span class="text-lg font-black text-slate-900 dark:text-white">
                {cockpit.formatMoney(sim.adjustedArr, true)}
              </span>
              <span class="block text-[10px] font-medium text-slate-500">
                vs base {cockpit.formatMoney(kpis.arr, true)}
              </span>
            </div>
          </div>

          <!-- Projected Runway -->
          <div class="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-slate-700/60">
            <span class="text-xs text-slate-600 dark:text-slate-300">Simulated Runway</span>
            <div class="text-right">
              <span class="text-lg font-black text-slate-900 dark:text-white">
                {#if sim.simulatedRunwayMonths >= 999}
                  <span class="text-emerald-500">Profitable</span>
                {:else}
                  {sim.simulatedRunwayMonths} mo
                {/if}
              </span>
              <span class="block text-[10px] font-medium text-slate-500">
                Net Burn: {cockpit.formatMoney(sim.simulatedMonthlyNetBurn, true)}/mo
              </span>
            </div>
          </div>

          <!-- Rule of 40 Output -->
          <div class="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-slate-700/60">
            <span class="text-xs text-slate-600 dark:text-slate-300">New Rule of 40</span>
            <div class="text-right">
              <span class="text-lg font-black {sim.simulatedRuleOf40 >= 40 ? 'text-emerald-500' : 'text-amber-500'}">
                {sim.simulatedRuleOf40}%
              </span>
              <span class="block text-[10px] font-medium text-slate-500">
                Multiple: {sim.valuationMultiple}x ARR
              </span>
            </div>
          </div>

          <!-- Estimated Enterprise Valuation -->
          <div class="p-3.5 rounded-xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-emerald-500/10 border border-indigo-500/20">
            <span class="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-0.5">
              Implied Enterprise Valuation
            </span>
            <span class="text-2xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
              {cockpit.formatMoney(sim.projectedValuation, true)}
            </span>
            <span class="block text-[10px] text-slate-500 dark:text-slate-400 mt-1">
              Based on {sim.valuationMultiple}x ARR multiple under current market comps.
            </span>
          </div>
        </div>
      </div>

      <!-- Strategic Advisor Note -->
      <div class="mt-4 pt-4 border-t border-slate-200/60 dark:border-slate-700/60">
        <div class="flex items-start gap-2 text-xs">
          <Lightbulb class="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <p class="text-slate-600 dark:text-slate-300">
            {#if sim.simulatedRunwayMonths < 18}
              <strong class="text-rose-500">Runway alert:</strong> Runway is below the 18-month benchmark. Prioritize the FinOps optimization slider or ARPU increase to extend cash duration.
            {:else if sim.simulatedRuleOf40 >= 60}
              <strong class="text-emerald-500">Top Decile Performance:</strong> Premium valuation multiple unlocked. Ideal profile for a growth round or strategic acquisition.
            {:else}
              <strong class="text-indigo-500">Balanced Growth:</strong> Healthy risk profile with sustainable burn and solid expansion capacity.
            {/if}
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
