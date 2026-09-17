import React, { useState } from 'react';
import { Theme, FeedbackItem, Opportunity } from '../../types.ts';
import { 
  ArrowLeft, 
  TrendingUp, 
  Users, 
  SplitSquareHorizontal, 
  Plus, 
  CheckCircle2, 
  Sparkles, 
  MessageSquareQuote,
  Camera,
  Code2,
  ExternalLink,
  Copy,
  Check,
  Maximize2,
  AlertCircle
} from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState<'quotes' | 'visual'>('quotes');
  const [showSplitConfirm, setShowSplitConfirm] = useState(false);
  const [copiedSelector, setCopiedSelector] = useState(false);
  const [hotspotActive, setHotspotActive] = useState(true);

  const handleSplitTheme = () => {
    setShowSplitConfirm(true);
    setTimeout(() => setShowSplitConfirm(false), 4000);
  };

  const handleCopySelector = (selector: string) => {
    navigator.clipboard.writeText(selector);
    setCopiedSelector(true);
    setTimeout(() => setCopiedSelector(false), 2000);
  };

  const trace = theme.visualTrace || {
    route: '/app/workflow-execution',
    component: 'WorkspaceActionModal.tsx',
    viewport: '1280x800 (Desktop)',
    frictionZone: 'Interactive Form & Action Dropdown',
    domSelector: '#workspace-action-container [data-testid="primary-action"]',
    severity: 'High',
    capturedAt: 'Auto-captured 18 mins ago via Playwright Headless',
    tracePreviewDescription: 'User interaction telemetry detected high rage-clicks and drop-off on this element container.'
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

      {/* Multimodal Evidence Mode Switcher */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('quotes')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-sm font-medium transition-all ${
              activeTab === 'quotes'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MessageSquareQuote className="w-4 h-4" />
            Customer Quotes ({feedbackItems.length})
          </button>
          <button
            onClick={() => setActiveTab('visual')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-sm font-medium transition-all ${
              activeTab === 'visual'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Camera className="w-4 h-4 text-primary-600" />
            Playwright Visual Trace
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </button>
        </div>

        <button 
          onClick={handleSplitTheme}
          className="text-sm font-medium text-slate-600 hover:text-slate-900 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors focus-ring shadow-xs"
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

      {/* Tab Content 1: Customer Quotes */}
      {activeTab === 'quotes' && (
        <div className="space-y-3 mb-8 md:mb-10 animate-in fade-in duration-200">
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
      )}

      {/* Tab Content 2: Visual UI Trace (Playwright Integration) */}
      {activeTab === 'visual' && (
        <div className="mb-8 md:mb-10 space-y-4 animate-in fade-in duration-200">
          {/* Metadata telemetry bar */}
          <div className="card p-4 bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-slate-900 text-white font-mono px-2.5 py-1 rounded">
                Playwright v1.40
              </span>
              <span className="bg-white border border-slate-200 text-slate-700 font-mono px-2.5 py-1 rounded">
                Route: {trace.route}
              </span>
              <span className="bg-white border border-slate-200 text-slate-700 px-2.5 py-1 rounded">
                {trace.viewport}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-1 rounded font-medium">
                <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                {trace.severity} UI Friction
              </span>
              <span className="text-slate-500 text-[11px]">{trace.capturedAt}</span>
            </div>
          </div>

          {/* Browser Mockup Window with Visual Overlay */}
          <div className="border border-slate-300 rounded-xl overflow-hidden shadow-sm bg-white">
            {/* Window header */}
            <div className="bg-slate-100 border-b border-slate-200 px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-400 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-400 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block"></span>
              </div>
              <div className="bg-white border border-slate-200 rounded-md px-4 py-1 text-xs text-slate-600 font-mono w-72 max-w-full text-center truncate">
                https://app.productsignal.io{trace.route}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setHotspotActive(!hotspotActive)}
                  className={`text-xs px-2 py-1 rounded font-medium border transition-colors ${
                    hotspotActive 
                      ? 'bg-primary-50 text-primary-700 border-primary-200' 
                      : 'bg-white text-slate-600 border-slate-200'
                  }`}
                >
                  {hotspotActive ? 'Friction Zone: ON' : 'Friction Zone: OFF'}
                </button>
              </div>
            </div>

            {/* Browser canvas body */}
            <div className="p-6 md:p-8 bg-slate-900/5 min-h-[300px] relative flex flex-col justify-center items-center">
              <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-lg p-6 shadow-sm relative">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-primary-600" />
                    <span className="text-xs font-semibold text-slate-800 font-mono">{trace.component}</span>
                  </div>
                  <span className="text-xs text-slate-400">Target: {trace.frictionZone}</span>
                </div>

                <div className="space-y-3">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {trace.tracePreviewDescription}
                  </p>

                  <div className="bg-slate-900 text-slate-200 p-3 rounded-md font-mono text-xs overflow-x-auto flex items-center justify-between gap-4">
                    <code>{trace.domSelector}</code>
                    <button
                      onClick={() => handleCopySelector(trace.domSelector)}
                      className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors flex-shrink-0"
                    >
                      {copiedSelector ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedSelector ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>

                {/* Pulsing Hotspot Overlay */}
                {hotspotActive && (
                  <div className="mt-4 p-3 bg-rose-50 border border-rose-200 rounded-md flex items-start gap-2.5">
                    <span className="relative flex h-3 w-3 mt-1 flex-shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                    </span>
                    <div className="text-xs text-rose-900">
                      <span className="font-semibold block mb-0.5">Automated Heuristic Triggered</span>
                      <span>Playwright recorded repetitive click attempts on this selector matching <strong>{theme.mentions} user quotes</strong>.</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

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
