const config = require('../config.json');
const { PROXY_PORT, BUSINESS_GOAL_DRAFT_ID, DETAILED_PLAN_DRAFT_ID } = config;

const PROXY_URL = `http://localhost:${PROXY_PORT || 9009}`;

module.exports = {
  goToBusinessGoalDraft: driver => driver.get(`${PROXY_URL}/business-goals/plan/${BUSINESS_GOAL_DRAFT_ID}`),
  goToNewBusinessGoalDraft: driver => driver.get(`${PROXY_URL}/business-goals/plan/`),
  goToDetailedPlanDraft: driver => driver.get(`${PROXY_URL}/detailed-plan/plan/${DETAILED_PLAN_DRAFT_ID}`),
  goToNewDetailedPlanDraft: driver => driver.get(`${PROXY_URL}/detailed-plan/plan/`),
};

