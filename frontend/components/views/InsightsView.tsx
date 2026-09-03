import React from 'react';
import { Theme } from '../../types.ts';
import { Users, ArrowRight, BarChart2, Sparkles } from 'lucide-react';

interface InsightsViewProps {
  themes: Theme[];
  onViewTheme: (themeId: string) => void;
}

export const InsightsView: React.FC<InsightsViewProps> = ({ themes, onViewTheme }) => {
  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-300">
      <header className="mb-6 md:mb-8">
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">AI Insights & Themes</h1>
        <p className="text-slate-500 mt-1 text-sm">Recurring problems detected across all feedback channels.</p>
      </header>

      <div className="space-y-4">
        {themes.map((theme) => (
          <div 
            key={theme.id} 
            className="bg-white border border-slate-200 rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all cursor-pointer group flex flex-col md:flex-row md:items-start justify-between gap-4 md:gap-6"
            onClick={() => onViewTheme(theme.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onViewTheme(theme.id); }}
          >
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
                <h3 className="text-lg font-semibold text-slate-900 group-hover:text-primary-700 transition-colors">
                  {theme.title}
                </h3>
                {theme.isEmerging && (
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
                    Emerging
                  </span>
                )}
              </div>
              <p className="text-slate-600 text-sm mb-4 md:mb-5 leading-relaxed">
                {theme.problemStatement}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-1.5">
                  <BarChart2 className="w-4 h-4 text-slate-400" />
                  <span className="font-medium text-slate-900">{theme.mentions}</span> mentions
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-slate-400" />
                  {theme.affectedSegment}
                </div>
              </div>
            </div>
            
            {/* Responsive right column: row on mobile, column on desktop */}
            <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:min-w-[140px] h-full mt-2 md:mt-0 pt-4 md:pt-0 border-t border-slate-100 md:border-t-0">
              <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                <Sparkles className="w-3.5 h-3.5 text-primary-500" />
                <span className="text-xs font-medium text-slate-700">{theme.confidence}% Confident</span>
              </div>
              
              <div className="flex items-center text-sm font-medium text-slate-500 group-hover:text-primary-600 transition-colors md:mt-8">
                Inspect Evidence 
                <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
