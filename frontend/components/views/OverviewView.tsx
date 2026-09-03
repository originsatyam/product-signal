import React from 'react';
import { Theme } from '../../types.ts';
import { TrendingUp, Flame, ArrowRight, MessageSquare } from 'lucide-react';

interface OverviewViewProps {
  themes: Theme[];
  onViewTheme: (themeId: string) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({ themes, onViewTheme }) => {
  const sortedThemes = [...themes].sort((a, b) => b.mentions - a.mentions);
  const emergingTheme = themes.find(t => t.isEmerging);

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-300">
      <header className="mb-6 md:mb-8">
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Overview</h1>
        <p className="text-slate-500 mt-1 text-sm">What deserves your attention based on recent feedback.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-8">
        {/* Metric Card */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 md:p-6 flex flex-col justify-between">
          <div className="flex items-start gap-2.5 text-slate-500 mb-4">
            <MessageSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span className="text-sm font-medium leading-snug">Feedback Analyzed</span>
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight mb-3">2,481</h3>
            <div className="inline-flex items-center text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/60">
              <TrendingUp className="w-3.5 h-3.5 mr-1.5" /> 18% this month
            </div>
          </div>
        </div>
        
        {/* Emerging Signal Card */}
        {emergingTheme && (
          <div 
            onClick={() => onViewTheme(emergingTheme.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onViewTheme(emergingTheme.id); }}
            className="md:col-span-2 bg-white border border-amber-200 rounded-xl shadow-sm p-5 md:p-6 cursor-pointer hover:border-amber-400 hover:shadow-md transition-all group flex flex-col justify-between relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5 text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-100">
                <Flame className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Emerging Signal</span>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
            </div>
            
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-2 group-hover:text-amber-700 transition-colors">{emergingTheme.title}</h3>
              <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">{emergingTheme.problemStatement}</p>
            </div>
          </div>
        )}
      </div>

      {/* Top Problems Table */}
      <div>
        <h3 className="text-sm font-semibold text-slate-900 mb-3">Top Problems</h3>
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          {/* overflow-x-auto ensures the table scrolls horizontally on small screens instead of breaking layout */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-4 md:px-6 py-4 font-medium text-slate-500 w-12 text-center">#</th>
                  <th className="px-4 md:px-6 py-4 font-medium text-slate-500">Problem Theme</th>
                  <th className="px-4 md:px-6 py-4 font-medium text-slate-500 text-right">Mentions</th>
                  <th className="px-4 md:px-6 py-4 font-medium text-slate-500 text-right">Trend</th>
                  <th className="px-4 md:px-6 py-4 font-medium text-slate-500 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sortedThemes.map((theme, index) => (
                  <tr 
                    key={theme.id} 
                    onClick={() => onViewTheme(theme.id)}
                    className="hover:bg-slate-50 transition-colors cursor-pointer group"
                  >
                    <td className="px-4 md:px-6 py-4 text-slate-400 text-center font-medium">{index + 1}</td>
                    <td className="px-4 md:px-6 py-4">
                      <p className="font-medium text-slate-900 group-hover:text-primary-700 transition-colors">{theme.title}</p>
                    </td>
                    <td className="px-4 md:px-6 py-4 text-right text-slate-600 font-medium">{theme.mentions}</td>
                    <td className="px-4 md:px-6 py-4 text-right">
                      {theme.trend === 'up' ? (
                        <span className="inline-flex items-center text-rose-600 font-medium bg-rose-50 px-2 py-0.5 rounded border border-rose-100 whitespace-nowrap">
                          ↑ {theme.trendValue}
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 whitespace-nowrap">
                          - {theme.trendValue}
                        </span>
                      )}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-right">
                      <span className="inline-flex items-center text-slate-400 group-hover:text-primary-600 font-medium transition-colors">
                        Inspect <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
