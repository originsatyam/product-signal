import { FeedbackItem, Theme, Opportunity } from './types.ts';

export const mockFeedback: FeedbackItem[] = [
  { id: 'f1', text: "I couldn't figure out how to invite my team.", source: 'Support', date: '2023-10-24' },
  { id: 'f2', text: "The setup took me 20 minutes.", source: 'Survey', date: '2023-10-25' },
  { id: 'f3', text: "I didn't understand what workspace meant.", source: 'Interview', date: '2023-10-26' },
  { id: 'f4', text: "Why is setting up a workspace so confusing?", source: 'Support', date: '2023-10-27' },
  { id: 'f5', text: "The dashboard is too slow to load.", source: 'Review', date: '2023-10-28' },
  { id: 'f6', text: "Takes forever to see my data.", source: 'Support', date: '2023-10-28' },
  { id: 'f7', text: "I wish I could export this as PDF.", source: 'Survey', date: '2023-10-29' },
];

export const mockThemes: Theme[] = [
  {
    id: 't1',
    title: 'Onboarding complexity',
    problemStatement: 'New users struggle to understand the initial configuration process and workspace concepts.',
    confidence: 87,
    trend: 'up',
    trendValue: '28%',
    mentions: 37,
    affectedSegment: 'New SMB customers',
    feedbackIds: ['f1', 'f2', 'f3', 'f4'],
    isEmerging: true,
  },
  {
    id: 't2',
    title: 'Dashboard Performance',
    problemStatement: 'Users experience significant lag when loading the main overview dashboard.',
    confidence: 92,
    trend: 'flat',
    trendValue: '2%',
    mentions: 31,
    affectedSegment: 'All users',
    feedbackIds: ['f5', 'f6'],
  },
  {
    id: 't3',
    title: 'Export Capabilities',
    problemStatement: 'Users need to share reports externally but lack PDF export options.',
    confidence: 75,
    trend: 'up',
    trendValue: '15%',
    mentions: 19,
    affectedSegment: 'Enterprise users',
    feedbackIds: ['f7'],
  }
];

export const mockOpportunities: Opportunity[] = [
  {
    id: 'o1',
    themeId: 't1',
    title: 'Simplify workspace setup',
    description: 'Investigate simplifying the initial workspace setup flow and clarifying terminology for new users.',
    impact: 'High',
    evidenceStrength: 'Strong',
    status: 'New',
  }
];
