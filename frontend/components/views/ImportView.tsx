import React, { useState, useRef } from 'react';
import { Upload, FileText, Loader2, AlertCircle, Sparkles } from 'lucide-react';

interface ImportViewProps {
  onProcessComplete: (text: string) => Promise<void>;
}

export const ImportView: React.FC<ImportViewProps> = ({ onProcessComplete }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProcess = async () => {
    if (!feedbackText.trim()) return;
    
    setIsProcessing(true);
    setError(null);
    
    try {
      await onProcessComplete(feedbackText);
      setFeedbackText('');
    } catch (err) {
      console.error(err);
      setError("Failed to synthesize feedback. Ensure your API key is configured correctly and try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (text) {
        // For MVP, we just dump the CSV text into the textarea so the user can review/edit
        // before synthesizing.
        setFeedbackText(prev => prev ? `${prev}\n${text}` : text);
      }
    };
    reader.onerror = () => {
      setError("Failed to read the file. Please try again.");
    };
    reader.readAsText(file);
    
    // Reset input so the same file can be selected again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-300">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Import Feedback</h1>
        <p className="text-slate-500 mt-1 text-sm">Paste raw customer feedback or upload a CSV to begin AI synthesis.</p>
      </header>

      {error && (
        <div className="mb-6 bg-rose-50 border border-rose-200 rounded-xl p-4 flex items-start gap-3 text-rose-800 shadow-xs">
          <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-sm">Processing Error</h4>
            <p className="text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm mb-6 overflow-hidden flex flex-col">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50">
          <label htmlFor="feedback-input" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Raw Feedback Data
          </label>
        </div>
        
        <div className="p-5 bg-white">
          <textarea
            id="feedback-input"
            className="w-full h-64 bg-slate-50 border border-slate-200 rounded-lg p-4 resize-none text-sm text-slate-900 placeholder:text-slate-400 leading-relaxed focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all shadow-inner"
            placeholder={`"I couldn't figure out how to invite my team."\n"The dashboard is too slow."\n"I wish I could export this as PDF."\n\nPaste one feedback item per line...`}
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            disabled={isProcessing}
          />
        </div>
        
        <div className="px-5 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          {/* Hidden file input */}
          <input 
            type="file" 
            accept=".csv,.txt" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            className="hidden" 
          />
          
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessing}
            className="flex items-center gap-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 shadow-xs hover:bg-slate-50 hover:text-slate-900 transition-all disabled:opacity-50 focus-ring rounded-md px-3 py-2"
          >
            <FileText className="w-4 h-4 text-slate-500" />
            Upload CSV
          </button>
          
          <button
            onClick={handleProcess}
            disabled={isProcessing || !feedbackText.trim()}
            className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm focus-ring"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Synthesizing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Synthesize Feedback
              </>
            )}
          </button>
        </div>
      </div>

      {isProcessing && (
        <div className="bg-primary-50 border border-primary-100 rounded-xl p-6 text-sm text-primary-900 flex flex-col items-center justify-center text-center gap-4 animate-in fade-in">
          <Loader2 className="w-6 h-6 animate-spin text-primary-600" />
          <div>
            <span className="font-semibold block mb-1">AI is processing your feedback</span>
            <span className="text-primary-700">Extracting topics, clustering problems, and linking evidence...</span>
          </div>
        </div>
      )}
    </div>
  );
};
