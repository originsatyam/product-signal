import React, { useState } from 'react';
import { Theme, FeedbackItem, Opportunity } from '../../types.ts';
import { ArrowLeft, TrendingUp, Users, SplitSquareHorizontal, Plus, CheckCircle2, Sparkles, MessageSquareQuote } from 'lucide-react';

interface EvidenceViewProps {
  theme: Theme;
  feedbackItems: FeedbackItem[];
  onBack: () => void;
  onCreateOpportunity: (themeId: string) => void;
  existingOpportunity?: Opportunity;
}

export const EvidenceView: React.FC<EvidenceViewProps> = ({ 
  theme, 
  feedbackItems, 
  onBack,
  onCreateOpportunity,
  existingOpportunity
}) => {
  const [showSplitConfirm, setShowSplitConfirm] = useState(false);

  const handleSplitTheme = () => {
    setShowSplitConfirm(true);
    setTimeout(() => setShowSplitConfirm(false), 4000);
  };

  return (
    <div className="max-w-4xl mx-auto pb-20 animate-in slide-in-from-right-4 duration-300">
      <button 
        onClick={onBack}
        className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 mb-6 transition-colors focus-ring rounded"
      >
        <ArrowLeft className="w-4 h-4 mr-1.5" /> 
        Back to Insights
      </button>

      {/* AI Insight Header Card */}
      <div className="card p-5 md:p-8 mb-6 md:mb-8 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-primary-500 opacity-10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 bg-white/10 text-white text-xs font-medium px-2.5 py-1 rounded-md border border-white/10 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-primary-400" /> AI Synthesized Insight
            </span>
            <span className="text-sm font-medium text-slate-400">
              {theme.confidence}% Confidence
            </span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">{theme.title}</h2>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl mb-6 md:mb-8">{theme.problemStatement}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 pt-5 md:pt-6 border-t border-white/10">
            <div className="flex flex-col">
              <span className="text-[10px] md:text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Frequency</span>
              <span className="text-base md:text-lg font-semibold">{theme.mentions} <span className="text-xs md:text-sm font-normal text-slate-400">mentions</span></span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] md:text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Trend</span>
              <span className="text-base md:text-lg font-semibold text-rose-400 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 md:w-4 md:h-4" /> {theme.trendValue}
              </span>
            </div>
            <div className="flex flex-col col-span-2 md:col-span-1">
              <span className="text-[10px] md:text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Affected Segment</span>
              <span className="text-base md:text-lg font-semibold flex items-center gap-2">
                <Users className="w-4 h-4 text-slate-400" /> {theme.affectedSegment}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Evidence Section */}
      <div className="mb-4 md:mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Supporting Evidence</h3>
          <p className="text-sm text-slate-500 mt-1">Raw feedback items clustered into this theme.</p>
        </div>
        <button 
          onClick={handleSplitTheme}
          className="text-sm font-medium text-slate-600 hover:text-slate-900 flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors focus-ring shadow-xs w-full sm:w-auto"
          title="If AI grouped unrelated feedback, split them here."
        >
          <SplitSquareHorizontal className="w-4 h-4" />
          Split Theme
        </button>
      </div>

      {showSplitConfirm && (
        <div className="mb-6 p-4 bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-800 animate-in fade-in flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-primary-500 flex-shrink-0" />
          <div>
            <strong className="block font-medium mb-0.5">Human Correction Logged</strong>
            <span className="text-slate-600">You indicated these items might represent different problems. The AI model will adjust future clustering.</span>
          </div>
        </div>
      )}

      <div className="space-y-3 mb-8 md:mb-10">
        {feedbackItems.map((item) => (
          <div key={item.id} className="card p-4 md:p-5 flex gap-3 md:gap-4 group">
            <div className="mt-0.5 flex-shrink-0">
              <MessageSquareQuote className="w-5 h-5 text-slate-300 group-hover:text-slate-400 transition-colors" />
            </div>
            <div>
              <p className="text-slate-800 text-sm leading-relaxed mb-3">"{item.text}"</p>
              <div className="flex flex-wrap items-center gap-2 md:gap-3 text-xs font-medium">
                <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200">{item.source}</span>
                <span className="text-slate-400">{item.date}</span>
              </div>
            </div>
          </div>
        ))}
        <div className="text-center pt-4">
          <button className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors focus-ring rounded px-2 py-1">
            View all {theme.mentions} sources
          </button>
        </div>
      </div>

      {/* Action Section */}
      <div className="card p-5 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
        <div>
          <h4 className="font-semibold text-slate-900 mb-1">Ready to take action?</h4>
          <p className="text-sm text-slate-600">Transform this validated problem into a product opportunity.</p>
        </div>
        <div className="flex-shrink-0 w-full sm:w-auto">
          {existingOpportunity ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-2.5 rounded-md flex items-center justify-center gap-2 text-sm font-medium shadow-xs w-full">
              <CheckCircle2 className="w-5 h-5" /> Opportunity Created
            </div>
          ) : (
            <button 
              onClick={() => onCreateOpportunity(theme.id)}
              className="bg-slate-900 text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 focus-ring shadow-xs w-full"
            >
              <Plus className="w-4 h-4" /> Generate Opportunity
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
