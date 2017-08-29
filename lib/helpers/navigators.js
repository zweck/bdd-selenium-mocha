/**
 * @module helper/navigators
 */
require('dotenv').config();

const PROXY_URL = `http://localhost:${process.env.PROXY_PORT || 9009}`;

module.exports = {
  goToBusinessGoalDraft: async ({ driver }) => await driver.get(`${PROXY_URL}/business-goals/plan/${process.env.BUSINESS_GOAL_DRAFT_ID}`),
  goToBusinessGoalHome: async ({ driver }) => await driver.get(`${PROXY_URL}/business-goals/`),
  goToNewBusinessGoalDraft: async ({ driver }) => await driver.get(`${PROXY_URL}/business-goals/plan/`),
  goToDetailedPlanDraft: async ({ driver }) => await driver.get(`${PROXY_URL}/detailed-plan/plan/${process.env.DETAILED_PLAN_DRAFT_ID}`),
  goToNewDetailedPlanDraft: async ({ driver }) => await driver.get(`${PROXY_URL}/detailed-plan/plan/`),
};

