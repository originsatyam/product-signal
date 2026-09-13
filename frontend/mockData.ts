import { FeedbackItem, Theme, Opportunity } from './types.ts';

export const mockFeedback: FeedbackItem[] = [
  { id: 'f1', text: "The workspace setup process is confusing—I spent 30 minutes trying to figure out how to invite my design team.", source: 'Support', date: '2023-10-24' },
  { id: 'f2', text: "Why is setting up initial permissions so complicated? We couldn't assign workspace roles without contacting customer support.", source: 'Support', date: '2023-10-25' },
  { id: 'f3', text: "Our team got stuck during onboarding because workspace terminology isn't clearly explained in the setup wizard.", source: 'Survey', date: '2023-10-26' },
  { id: 'f4', text: "Inviting external stakeholders took forever—the invitation link kept expiring during initial setup.", source: 'Review', date: '2023-10-27' },
  { id: 'f5', text: "Exporting reports to PDF completely corrupts table formatting and cuts off summary charts.", source: 'Review', date: '2023-10-28' },
  { id: 'f6', text: "When I try to export monthly analytics to SVG or PDF, chart labels overlap and look completely unreadable.", source: 'Support', date: '2023-10-28' },
  { id: 'f7', text: "We need high-resolution PDF exports for executive board meetings, but the current export tool fails.", source: 'Survey', date: '2023-10-29' },
  { id: 'f8', text: "The dashboard takes over 10 seconds to load when filtering large customer feedback datasets.", source: 'Review', date: '2023-10-29' },
  { id: 'f9', text: "Running analytics on datasets over 10000 rows causes the application to freeze and stutter.", source: 'Support', date: '2023-10-30' },
  { id: 'f10', text: "API error messages are vague—I spent 2 days debugging a status 400 response because payload requirements weren't documented.", source: 'Support', date: '2023-10-30' },
];

export const mockThemes: Theme[] = [
  {
    id: 't1',
    title: 'Onboarding & Workspace Setup Complexity',
    problemStatement: 'New teams experience friction configuring initial workspace roles, permissions, and inviting external team members.',
    confidence: 94,
    trend: 'up',
    trendValue: '34%',
    mentions: 42,
    affectedSegment: 'New SMB & Enterprise Teams',
    feedbackIds: ['f1', 'f2', 'f3', 'f4'],
    isEmerging: true,
  },
  {
    id: 't2',
    title: 'PDF & Report Export Formatting Corruption',
    problemStatement: 'Executive stakeholders report corrupted PDF table layouts, overlapping chart labels, and export crashes on medium datasets.',
    confidence: 91,
    trend: 'up',
    trendValue: '22%',
    mentions: 35,
    affectedSegment: 'Executive & Enterprise Users',
    feedbackIds: ['f5', 'f6', 'f7'],
  },
  {
    id: 't3',
    title: 'Dashboard Latency on Large Datasets',
    problemStatement: 'Users experience significant query lag and browser freezing when filtering datasets over 10,000 feedback rows.',
    confidence: 88,
    trend: 'flat',
    trendValue: 'Stable',
    mentions: 28,
    affectedSegment: 'Power & Analytics Users',
    feedbackIds: ['f8', 'f9'],
  },
  {
    id: 't4',
    title: 'Developer API & Webhook Integration Friction',
    problemStatement: 'Developers report unhelpful 400 error codes, strict rate limits, and sparse API documentation for custom integrations.',
    confidence: 82,
    trend: 'flat',
    trendValue: '5%',
    mentions: 19,
    affectedSegment: 'Developers & Technical Leads',
    feedbackIds: ['f10'],
  }
];

export const mockOpportunities: Opportunity[] = [
  {
    id: 'o1',
    themeId: 't1',
    title: 'Streamline Workspace Onboarding & Role Assignments',
    description: 'Redesign initial workspace setup wizard, introduce guided role templates, and extend invitation link expiration windows.',
    impact: 'High',
    evidenceStrength: 'Strong',
    status: 'New',
  },
  {
    id: 'o2',
    themeId: 't2',
    title: 'Re-engineer PDF Export Engine for Clean Board Reports',
    description: 'Replace legacy client-side export script with server-side PDF generator supporting vector SVG charts and crisp table pagination.',
    impact: 'High',
    evidenceStrength: 'Strong',
    status: 'Investigating',
  }
];
