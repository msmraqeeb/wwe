import React from 'react';
import { AppState } from '../types';
import { PieChart, Users, Crown, Swords, Calendar, Download, Upload, RotateCcw, Flame, Zap, Tv, Database } from 'lucide-react';

interface SummaryViewProps {
  appState: AppState;
  onLoadSampleData: () => void;
  onClearAllData: () => void;
  onExportJSON: () => void;
  onImportJSON: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SummaryView: React.FC<SummaryViewProps> = ({
  appState,
  onLoadSampleData,
  onClearAllData,
  onExportJSON,
  onImportJSON
}) => {
  const { superstars, womenTagTeams, champions, rivalries, calendarEvents } = appState;

  const rawCount = superstars.filter((s) => s.brand === 'RAW').length;
  const sdCount = superstars.filter((s) => s.brand === 'SmackDown').length;
  const nxtCount = superstars.filter((s) => s.brand === 'NXT').length;
  const totalRoster = superstars.length;

  const femaleCount = superstars.filter((s) => s.tier === 'Female').length;
  const maleCount = totalRoster - femaleCount;

  return (
    <div className="max-w-[1920px] mx-auto p-4 md:p-6 space-y-6 text-slate-100">
      {/* Header Banner */}
      <div className="p-6 bg-gradient-to-r from-cyan-950/80 via-slate-900 to-blue-950/80 border border-cyan-500/40 rounded-xl shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-cyan-500/20 border border-cyan-500/40 rounded-xl shadow-lg">
            <PieChart className="w-7 h-7 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-2xl font-black uppercase text-cyan-300 tracking-wider">
              WWE 2K26 Universe Analytics & Summary
            </h1>
            <p className="text-xs text-slate-300 mt-0.5">
              High level distribution of your Universe roster, brand split, active titles, and database management.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onLoadSampleData}
            className="px-3 py-1.5 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow transition"
          >
            Load Screenshot Dataset
          </button>
          <button
            onClick={onClearAllData}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-950/80 hover:bg-red-900 text-red-200 border border-red-800 transition"
          >
            Clear Database
          </button>
          <button
            onClick={onExportJSON}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition"
          >
            Export JSON
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase block">Total Superstars</span>
            <span className="text-3xl font-black text-white">{totalRoster}</span>
          </div>
          <Users className="w-8 h-8 text-cyan-400 opacity-60" />
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase block">Active Champions</span>
            <span className="text-3xl font-black text-amber-400">{champions.length}</span>
          </div>
          <Crown className="w-8 h-8 text-amber-400 opacity-60" />
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase block">Active Feuds</span>
            <span className="text-3xl font-black text-orange-400">{rivalries.length}</span>
          </div>
          <Swords className="w-8 h-8 text-orange-400 opacity-60" />
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase block">Scheduled Events</span>
            <span className="text-3xl font-black text-purple-400">{calendarEvents.length}</span>
          </div>
          <Calendar className="w-8 h-8 text-purple-400 opacity-60" />
        </div>
      </div>

      {/* Brand Breakdown Progress Bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-lg space-y-4">
          <h3 className="text-sm font-bold text-slate-200">Brand Distribution</h3>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-red-400 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" /> RAW
                </span>
                <span>{rawCount} Superstars ({totalRoster ? Math.round((rawCount / totalRoster) * 100) : 0}%)</span>
              </div>
              <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-red-600 h-full transition-all duration-500"
                  style={{ width: `${totalRoster ? (rawCount / totalRoster) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-blue-400 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" /> SmackDown
                </span>
                <span>{sdCount} Superstars ({totalRoster ? Math.round((sdCount / totalRoster) * 100) : 0}%)</span>
              </div>
              <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-blue-600 h-full transition-all duration-500"
                  style={{ width: `${totalRoster ? (sdCount / totalRoster) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-yellow-400 flex items-center gap-1">
                  <Tv className="w-3.5 h-3.5" /> NXT
                </span>
                <span>{nxtCount} Superstars ({totalRoster ? Math.round((nxtCount / totalRoster) * 100) : 0}%)</span>
              </div>
              <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-yellow-500 h-full transition-all duration-500"
                  style={{ width: `${totalRoster ? (nxtCount / totalRoster) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-lg space-y-4">
          <h3 className="text-sm font-bold text-slate-200">Gender & Division Split</h3>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-cyan-400">Men's Division</span>
                <span>{maleCount} Superstars ({totalRoster ? Math.round((maleCount / totalRoster) * 100) : 0}%)</span>
              </div>
              <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-cyan-500 h-full transition-all duration-500"
                  style={{ width: `${totalRoster ? (maleCount / totalRoster) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-pink-400">Women's Division</span>
                <span>{femaleCount} Superstars ({totalRoster ? Math.round((femaleCount / totalRoster) * 100) : 0}%)</span>
              </div>
              <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-pink-500 h-full transition-all duration-500"
                  style={{ width: `${totalRoster ? (femaleCount / totalRoster) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-purple-400">Women's Tag Teams</span>
                <span>{womenTagTeams.length} Teams</span>
              </div>
              <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-purple-500 h-full transition-all duration-500"
                  style={{ width: `${womenTagTeams.length ? 100 : 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Supabase Cloud Storage Panel */}
      <div className="p-5 rounded-xl bg-slate-900 border border-emerald-500/40 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-500/20 border border-emerald-500/40 rounded-lg">
              <Database className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                Supabase Cloud Database Integration
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-950 text-emerald-300 border border-emerald-800">
                  CONNECTED
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                URL: <span className="text-slate-200 font-mono">https://ktitkqrusecvnuuulurf.supabase.co</span> • Table: <span className="text-emerald-400 font-mono">wwe_universe_data</span>
              </p>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800">
          Your Universe roster, titles, brand show plans, achievements, and calendar schedules are automatically synced to both <strong>Local Storage</strong> and <strong>Supabase Cloud Database</strong> in real time.
        </p>

        <div className="text-[11px] text-slate-400 space-y-1 bg-slate-950 p-3 rounded-lg border border-slate-800/80 font-mono">
          <span className="text-amber-400 font-bold block">Recommended Supabase SQL Table Schema (if not already created in Supabase SQL Editor):</span>
          <pre className="text-emerald-300 overflow-x-auto whitespace-pre-wrap">
{`create table if not exists wwe_universe_data (
  id text primary key,
  state jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Optional Row Level Security (RLS) policies
alter table wwe_universe_data enable row level security;
create policy "Public full access" on wwe_universe_data for all using (true) with check (true);`}
          </pre>
        </div>
      </div>
    </div>
  );
};
