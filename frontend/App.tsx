import React, { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar.tsx';
import { ImportView } from './components/views/ImportView.tsx';
import { OverviewView } from './components/views/OverviewView.tsx';
import { InsightsView } from './components/views/InsightsView.tsx';
import { EvidenceView } from './components/views/EvidenceView.tsx';
import { OpportunityView } from './components/views/OpportunityView.tsx';
import { ViewState, Theme, Opportunity, FeedbackItem } from './types.ts';
import { mockFeedback, mockThemes, mockOpportunities } from './mockData.ts';
import { synthesizeFeedback } from './services/aiService.ts';
import { Menu, Layers } from 'lucide-react';

const App: React.FC = () => {
  // Application State
  const [currentView, setCurrentView] = useState<ViewState>('overview');
  const [activeThemeId, setActiveThemeId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Data State
  const [allFeedback, setAllFeedback] = useState<FeedbackItem[]>(mockFeedback);
  const [themes, setThemes] = useState<Theme[]>(mockThemes);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(mockOpportunities);

  // Derived State
  const activeTheme = useMemo(() => 
    themes.find(t => t.id === activeThemeId) || null
  , [themes, activeThemeId]);

  const activeThemeFeedback = useMemo(() => {
    if (!activeTheme) return [];
    return allFeedback.filter(f => activeTheme.feedbackIds.includes(f.id));
  }, [activeTheme, allFeedback]);

  const activeThemeOpportunity = useMemo(() => {
    if (!activeTheme) return undefined;
    return opportunities.find(o => o.themeId === activeTheme.id);
  }, [opportunities, activeTheme]);

  // Handlers
  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
    setIsSidebarOpen(false); // Close sidebar on mobile after navigation
    if (view !== 'evidence') {
      setActiveThemeId(null);
    }
  };

  const handleViewTheme = (themeId: string) => {
    setActiveThemeId(themeId);
    setCurrentView('evidence');
  };

  const handleProcessComplete = async (rawText: string) => {
    const lines = rawText.split('\n').filter(line => line.trim().length > 0);
    const newFeedbackItems: FeedbackItem[] = lines.map((line, index) => ({
      id: `f-imported-${Date.now()}-${index}`,
      text: line.trim(),
      source: 'Support',
      date: new Date().toISOString().split('T')[0]
    }));

    const newThemes = await synthesizeFeedback(newFeedbackItems);

    setAllFeedback(prev => [...newFeedbackItems, ...prev]);
    setThemes(prev => [...newThemes, ...prev]);
    setCurrentView('overview');
  };

  const handleCreateOpportunity = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId);
    if (!theme) return;

    const newOpp: Opportunity = {
      id: `o${Date.now()}`,
      themeId: theme.id,
      title: `Address: ${theme.title}`,
      description: `Investigate solutions for: ${theme.problemStatement}`,
      impact: theme.mentions > 30 ? 'High' : 'Medium',
      evidenceStrength: theme.confidence > 85 ? 'Strong' : 'Moderate',
      status: 'New'
    };

    setOpportunities(prev => [newOpp, ...prev]);
    setCurrentView('opportunity');
  };

  const handleUpdateOpportunityStatus = (id: string, status: Opportunity['status']) => {
    setOpportunities(prev => 
      prev.map(opp => opp.id === id ? { ...opp, status } : opp)
    );
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans selection:bg-primary-100 selection:text-primary-900">
      <Sidebar 
        currentView={currentView} 
        onNavigate={handleNavigate} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between flex-shrink-0 z-20">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-slate-900 rounded-md flex items-center justify-center shadow-sm">
              <Layers className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-semibold text-slate-900 tracking-tight">Product Signal</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -mr-2 text-slate-600 hover:bg-slate-100 rounded-md transition-colors focus-ring"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 lg:p-10 w-full">
          {currentView === 'import' && (
            <ImportView onProcessComplete={handleProcessComplete} />
          )}
          
          {currentView === 'overview' && (
            <OverviewView themes={themes} onViewTheme={handleViewTheme} />
          )}
          
          {currentView === 'insights' && (
            <InsightsView themes={themes} onViewTheme={handleViewTheme} />
          )}
          
          {currentView === 'evidence' && activeTheme && (
            <EvidenceView 
              theme={activeTheme} 
              feedbackItems={activeThemeFeedback}
              onBack={() => handleNavigate('insights')}
              onCreateOpportunity={handleCreateOpportunity}
              existingOpportunity={activeThemeOpportunity}
            />
          )}

          {currentView === 'opportunity' && (
            <OpportunityView 
              opportunities={opportunities} 
              themes={themes}
              onUpdateStatus={handleUpdateOpportunityStatus}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
