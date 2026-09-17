export interface FeedbackItem {
  id: string;
  text: string;
  source: 'Support' | 'Survey' | 'Interview' | 'Review';
  date: string;
}

export interface VisualTrace {
  route: string;
  component: string;
  viewport: string;
  frictionZone: string;
  domSelector: string;
  severity: 'High' | 'Medium' | 'Low';
  capturedAt: string;
  tracePreviewDescription: string;
}

export interface Theme {
  id: string;
  title: string;
  problemStatement: string;
  confidence: number;
  trend: 'up' | 'down' | 'flat';
  trendValue: string;
  mentions: number;
  affectedSegment: string;
  feedbackIds: string[];
  isEmerging?: boolean;
  visualTrace?: VisualTrace;
}

export interface Opportunity {
  id: string;
  themeId: string;
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  evidenceStrength: 'Strong' | 'Moderate' | 'Weak';
  status: 'New' | 'Investigating' | 'Prioritized' | 'Rejected';
}

export type ViewState = 'import' | 'overview' | 'insights' | 'evidence' | 'opportunity';
