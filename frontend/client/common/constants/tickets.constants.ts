const TicketStatus = [
  { label: "All", value: "" },
  {
    label: "Untouched",
    value: "UNTOUCHED",
  },
  {
    label: "Opened",
    value: "OPENED",
  },
  {
    label: "Pending",
    value: "PENDING",
  },
  {
    label: "Solved",
    value: "SOLVED",
  },
  {
    label: "Closed",
    value: "CLOSED",
  },
];
const TicketPriority = [
  { label: "All", value: "" },
  {
    label: "Low",
    value: "LOW",
  },
  {
    label: "Medium",
    value: "MEDIUM",
  },
  {
    label: "High",
    value: "HIGH",
  },
  {
    label: "Urgent",
    value: "URGENT",
  },
];
const TicketCategory = [
  {
    label: "General Inquiry",
    value: "TICKET_GENERAL_INQUIRY",
  },
  {
    label: "Technical Issue",
    value: "TICKET_TECHNICAL_ISSUE",
  },
  {
    label: "Bug Report",
    value: "TICKET_BUG_REPORT",
  },
  {
    label: "New Feature Request",
    value: "TICKET_NEW_FEATURE_REQUEST",
  },
  {
    label: "New Project Request",
    value: "TICKET_NEW_PROJECT_REQUEST",
  },
  {
    label: "Account Inquiry",
    value: "TICKET_ACCOUNT_INQUIRY",
  },

  {
    label: "Training Request",
    value: "TICKET_TRAINING_REQUEST",
  },
  {
    label: "Feedback and Suggestion",
    value: "TICKET_FEEDBACK_AND_SUGGESTION",
  },
  { label: "All", value: "" },
];

const TICKET_STATUS_COLORS = {
  CREATED: "rgba(0, 0, 0, 0.5)",
  OPENED: "rgba(0, 255, 0, 0.5)",
  PENDING: "rgba(255, 165, 0, 0.5)",
  SOLVED: "rgba(0, 0, 255, 0.5)",
  CLOSED: "rgba(255, 0, 0, 0.5)",
};

const TICKET_PRIORITY_COLORS = {
  LOW: "rgba(0, 255, 0, 0.5)",
  MEDIUM: "rgba(0, 0, 255, 0.5)",
  HIGH: "rgba(255, 165, 0, 0.5)",
  URGENT: "rgba(255, 0, 0, 0.5)",
};
const TICKET_CATEGORY_COLORS = {
  TICKET_GENERAL_INQUIRY: "rgba(0, 0, 0, 0.5)",
  TICKET_TECHNICAL_ISSUE: "rgba(0, 255, 0, 0.5)",
  TICKET_BUG_REPORT: "rgba(255, 165, 0, 0.5)",
  TICKET_NEW_FEATURE_REQUEST: "rgba(0, 0, 255, 0.5)",
  TICKET_NEW_PROJECT_REQUEST: "rgba(255, 0, 0, 0.5)",
  TICKET_ACCOUNT_INQUIRY: "rgba(128, 0, 128, 0.5)",
  TICKET_TRAINING_REQUEST: "rgba(255, 215, 0, 0.5)",
  TICKET_FEEDBACK_AND_SUGGESTION: "rgba(0, 128, 128, 0.5)",
};

export {
  TicketStatus,
  TicketPriority,
  TicketCategory,
  TICKET_STATUS_COLORS,
  TICKET_PRIORITY_COLORS,
  TICKET_CATEGORY_COLORS,
};
