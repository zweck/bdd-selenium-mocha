/**
 * @module helper/navigators
 */
require('dotenv').config();

const PROXY_URL = `http://localhost:${process.env.PROXY_PORT || 9009}`;

module.exports = {
  goToBusinessGoalDraft: ({ driver }) => driver.get(`${PROXY_URL}/business-goals/plan/${process.env.BUSINESS_GOAL_DRAFT_ID}`),
  goToBusinessGoalHome: ({ driver }) => driver.get(`${PROXY_URL}/business-goals/`),
  goToBusinessGoalDrafts: ({ driver }) => driver.get(`${PROXY_URL}/business-goals/drafts/`),
  goToNewBusinessGoalDraft: ({ driver }) => driver.get(`${PROXY_URL}/business-goals/plan/`),
  goToDetailedPlanDraft: ({ driver }) => driver.get(`${PROXY_URL}/detailed-plan/plan/${process.env.DETAILED_PLAN_DRAFT_ID}`),
  goToNewDetailedPlanDraft: ({ driver }) => driver.get(`${PROXY_URL}/detailed-plan/plan/`),
};

