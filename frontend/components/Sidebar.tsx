import React, { useEffect } from 'react';
import { LayoutDashboard, Lightbulb, Target, UploadCloud, ChevronDown, Layers, X } from 'lucide-react';
import { ViewState } from '../types.ts';

interface SidebarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, isOpen, onClose }) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'import', label: 'Import Data', icon: UploadCloud },
    { id: 'insights', label: 'AI Insights', icon: Lightbulb },
    { id: 'opportunity', label: 'Opportunities', icon: Target },
  ];

  // Close sidebar on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col justify-between flex-shrink-0
        transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
      `}>
        <div>
          <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center shadow-sm">
                <Layers className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-slate-900 tracking-tight">Product Signal</span>
            </div>
            <button 
              onClick={onClose}
              className="md:hidden p-1.5 -mr-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="px-4">
            <p className="px-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Workspace</p>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id || 
                                 (item.id === 'insights' && currentView === 'evidence');
                
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id as ViewState)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all focus-ring ${
                      isActive 
                        ? 'bg-slate-50 text-primary-700' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-primary-600' : 'text-slate-400'}`} />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="p-4 border-t border-slate-100">
          <button className="w-full flex items-center justify-between p-2 hover:bg-slate-50 rounded-md transition-colors focus-ring">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-medium text-xs">
                PM
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-slate-900 leading-none">Alex Product</p>
                <p className="text-xs text-slate-500 mt-1">Pro Plan</p>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>
    </>
  );
};
