<script lang="ts">
  import { onMount } from 'svelte'
  import { cockpit } from './lib/state.svelte'
  import Header from './components/Header.svelte'
  import KpiRibbon from './components/KpiRibbon.svelte'
  import RevenueWaterfall from './components/RevenueWaterfall.svelte'
  import FinOpsBreakdown from './components/FinOpsBreakdown.svelte'
  import CohortHeatmap from './components/CohortHeatmap.svelte'
  import ScenarioSimulator from './components/ScenarioSimulator.svelte'
  import BoardMemo from './components/BoardMemo.svelte'
  import Footer from './components/Footer.svelte'
  import { Sparkles, ArrowRight, ShieldCheck, Cpu } from '@lucide/svelte'

  let preset = $derived(cockpit.currentPreset)

  onMount(() => {
    // Default to dark mode
    if (cockpit.isDark) {
      document.documentElement.classList.add('dark')
    }
  })
</script>

<div class="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
  <Header />

  <main class="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <!-- Context Banner -->
    <div class="mb-6 p-4 rounded-2xl bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-slate-900/40 border border-indigo-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <div class="flex items-center gap-2">
          <span class="text-xs font-bold uppercase tracking-wider text-indigo-400">Active Profile</span>
          <span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            {preset.badge}
          </span>
        </div>
        <h2 class="text-base sm:text-lg font-bold text-white mt-0.5">
          {preset.name}
        </h2>
        <p class="text-xs text-slate-300 max-w-2xl mt-0.5">
          {preset.description}
        </p>
      </div>

      <div class="flex items-center gap-2 self-start sm:self-auto">
        <button
          onclick={() => (cockpit.activeTab = 'simulator')}
          class="text-xs font-semibold px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 shadow-md shadow-indigo-600/20 transition-all"
        >
          <Sparkles class="w-3.5 h-3.5" />
          <span>Launch Simulator</span>
          <ArrowRight class="w-3.5 h-3.5" />
        </button>
      </div>
    </div>

    <!-- Executive KPI Ribbon (Always visible on all tabs) -->
    <KpiRibbon />

    <!-- Content Sections based on active tab -->
    {#if cockpit.activeTab === 'overview'}
      <div class="space-y-6">
        <ScenarioSimulator />
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueWaterfall />
          <CohortHeatmap />
        </div>
        <FinOpsBreakdown />
        <BoardMemo />
      </div>
    {:else if cockpit.activeTab === 'revenue'}
      <RevenueWaterfall />
    {:else if cockpit.activeTab === 'finops'}
      <FinOpsBreakdown />
    {:else if cockpit.activeTab === 'cohorts'}
      <CohortHeatmap />
    {:else if cockpit.activeTab === 'simulator'}
      <ScenarioSimulator />
    {:else if cockpit.activeTab === 'memo'}
      <BoardMemo />
    {/if}
  </main>

  <Footer />
</div>
