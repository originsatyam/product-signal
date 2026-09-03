import React from 'react';
import { Opportunity, Theme } from '../../types.ts';
import { Target, Check, X, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';

interface OpportunityViewProps {
  opportunities: Opportunity[];
  themes: Theme[];
  onUpdateStatus: (id: string, status: Opportunity['status']) => void;
}

export const OpportunityView: React.FC<OpportunityViewProps> = ({ opportunities, themes, onUpdateStatus }) => {
  if (opportunities.length === 0) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20 md:py-32 animate-in fade-in px-4">
        <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-5 border border-slate-200">
          <Target className="w-6 h-6 text-slate-400" />
        </div>
        <h2 className="text-xl font-semibold text-slate-900 tracking-tight">No Opportunities Yet</h2>
        <p className="text-slate-500 mt-2 text-sm max-w-sm mx-auto">
          Opportunities are generated from validated AI insights. Go to Insights to review evidence first.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-20 animate-in fade-in duration-300">
      <header className="mb-6 md:mb-8">
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Opportunities</h1>
        <p className="text-slate-500 mt-1 text-sm">Evaluate AI recommendations and make final product decisions.</p>
      </header>

      <div className="space-y-6">
        {opportunities.map(opp => {
          const relatedTheme = themes.find(t => t.id === opp.themeId);
          
          return (
            <div key={opp.id} className="card overflow-hidden flex flex-col">
              {/* Header */}
              <div className="p-5 md:p-6 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider border ${
                    opp.status === 'New' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                    opp.status === 'Investigating' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                    opp.status === 'Prioritized' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                    'bg-slate-100 text-slate-600 border-slate-200'
                  }`}>
                    {opp.status}
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-slate-900 tracking-tight">{opp.title}</h3>
              </div>

              {/* Body */}
              <div className="p-5 md:p-6 flex-1">
                <div className="mb-6 md:mb-8">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-primary-500" />
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">AI Recommendation</h4>
                  </div>
                  <p className="text-slate-800 text-sm leading-relaxed bg-primary-50/50 p-4 rounded-lg border border-primary-100/50">
                    {opp.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8 text-sm">
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Underlying Problem</h4>
                    <p className="text-slate-900 leading-relaxed">{relatedTheme?.problemStatement}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Affected Users</h4>
                    <p className="text-slate-900">{relatedTheme?.affectedSegment}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-8 md:gap-x-12 gap-y-4 py-4 md:py-5 border-y border-slate-100 mb-6 md:mb-8 text-sm">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Evidence Strength</p>
                    <p className="font-semibold text-slate-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span> 
                      {opp.evidenceStrength}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Frequency</p>
                    <p className="font-semibold text-slate-900">{relatedTheme?.mentions} mentions</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Potential Impact</p>
                    <p className="font-semibold text-slate-900">{opp.impact}</p>
                  </div>
                </div>

                {/* Human Decision */}
                <div className="bg-slate-50 rounded-lg p-4 md:p-5 border border-slate-200">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle className="w-4 h-4 text-slate-500" />
                    <h4 className="text-sm font-semibold text-slate-900">Human Decision Required</h4>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button 
                      onClick={() => onUpdateStatus(opp.id, 'Prioritized')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-all focus-ring ${
                        opp.status === 'Prioritized' 
                          ? 'bg-emerald-600 text-white shadow-sm' 
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs'
                      }`}
                    >
                      <Check className="w-4 h-4" /> Prioritize
                    </button>
                    <button 
                      onClick={() => onUpdateStatus(opp.id, 'Investigating')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-all focus-ring ${
                        opp.status === 'Investigating' 
                          ? 'bg-amber-500 text-white shadow-sm' 
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs'
                      }`}
                    >
                      <ArrowRight className="w-4 h-4" /> Investigate
                    </button>
                    <button 
                      onClick={() => onUpdateStatus(opp.id, 'Rejected')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-all focus-ring ${
                        opp.status === 'Rejected' 
                          ? 'bg-slate-800 text-white shadow-sm' 
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs'
                      }`}
                    >
                      <X className="w-4 h-4" /> Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
