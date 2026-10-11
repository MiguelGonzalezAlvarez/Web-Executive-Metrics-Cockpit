<script lang="ts">
  import { cockpit } from '../lib/state.svelte'
  import { PRESETS } from '../data/presets'
  import {
    Activity,
    Moon,
    Sun,
    RefreshCw,
    Sliders,
    Building2,
    DollarSign,
    Layers,
    Server,
    Users,
    FileText,
  } from '@lucide/svelte'
</script>

<header class="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur sticky top-0 z-40">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <!-- Brand & Status -->
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-sky-500 to-emerald-400 p-0.5 shadow-lg shadow-indigo-500/20">
          <div class="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-sky-400">
            <Activity class="w-5 h-5" />
          </div>
        </div>
        <div>
          <div class="flex items-center space-x-2">
            <h1 class="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              Executive Cockpit
            </h1>
            <span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Live Telemetry
            </span>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
            FinOps & SaaS Unit Economics Engine
          </p>
        </div>
      </div>

      <!-- Controls: Scenario Selector & Settings -->
      <div class="flex items-center space-x-2 sm:space-x-3">
        <!-- Preset Picker -->
        <div class="relative">
          <select
            value={cockpit.presetId}
            onchange={(e) => cockpit.setPreset((e.target as HTMLSelectElement).value)}
            class="text-xs sm:text-sm font-medium bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            {#each PRESETS as preset}
              <option value={preset.id}>{preset.name} ({preset.badge})</option>
            {/each}
          </select>
        </div>

        <!-- Currency Selector -->
        <div class="flex rounded-lg border border-slate-300 dark:border-slate-700 p-0.5 bg-slate-100 dark:bg-slate-800 text-xs font-medium">
          <button
            onclick={() => (cockpit.currency = 'USD')}
            class={`px-2 py-1 rounded transition-colors ${cockpit.currency === 'USD' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
          >
            $
          </button>
          <button
            onclick={() => (cockpit.currency = 'EUR')}
            class={`px-2 py-1 rounded transition-colors ${cockpit.currency === 'EUR' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
          >
            €
          </button>
          <button
            onclick={() => (cockpit.currency = 'GBP')}
            class={`px-2 py-1 rounded transition-colors ${cockpit.currency === 'GBP' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
          >
            £
          </button>
        </div>

        <!-- Theme Toggle -->
        <button
          onclick={() => cockpit.toggleTheme()}
          aria-label="Toggle Theme"
          class="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          {#if cockpit.isDark}
            <Sun class="w-4 h-4 text-amber-400" />
          {:else}
            <Moon class="w-4 h-4 text-slate-600" />
          {/if}
        </button>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <nav class="flex space-x-1 sm:space-x-4 border-t border-slate-200 dark:border-slate-800/60 overflow-x-auto py-2 text-xs sm:text-sm font-medium scrollbar-none">
      <button
        onclick={() => (cockpit.activeTab = 'overview')}
        class={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
          cockpit.activeTab === 'overview'
            ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
        }`}
      >
        <Building2 class="w-4 h-4" />
        <span>Executive Dashboard</span>
      </button>

      <button
        onclick={() => (cockpit.activeTab = 'revenue')}
        class={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
          cockpit.activeTab === 'revenue'
            ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
        }`}
      >
        <DollarSign class="w-4 h-4" />
        <span>Revenue Waterfall</span>
      </button>

      <button
        onclick={() => (cockpit.activeTab = 'finops')}
        class={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
          cockpit.activeTab === 'finops'
            ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
        }`}
      >
        <Server class="w-4 h-4" />
        <span>AI & Cloud FinOps</span>
      </button>

      <button
        onclick={() => (cockpit.activeTab = 'cohorts')}
        class={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
          cockpit.activeTab === 'cohorts'
            ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
        }`}
      >
        <Users class="w-4 h-4" />
        <span>Cohort Retention</span>
      </button>

      <button
        onclick={() => (cockpit.activeTab = 'simulator')}
        class={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
          cockpit.activeTab === 'simulator'
            ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
        }`}
      >
        <Sliders class="w-4 h-4" />
        <span>What-If Simulator</span>
      </button>

      <button
        onclick={() => (cockpit.activeTab = 'memo')}
        class={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
          cockpit.activeTab === 'memo'
            ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
        }`}
      >
        <FileText class="w-4 h-4" />
        <span>Board Memo</span>
      </button>
    </nav>
  </div>
</header>
