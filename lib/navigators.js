const { APP_URL, BUSINESS_GOAL_DRAFT_ID, DETAILED_PLAN_DRAFT_ID } = config;

module.exports = {
  goToBusinessGoalDraft: () => driver.get(`${APP_URL}/business-goals/plan/`),
  goToNewBusinessGoalDraft: () => driver.get(`${APP_URL}/business-goals/plan/${BUSINESS_GOAL_DRAFT_ID}`),
  goToDetailedPlanDraft: () => driver.get(`${APP_URL}/detailed-plan/plan/`),
  goToNewDetailedPlanDraft: () => driver.get(`${APP_URL}/detailed-plan/plan/${DETAILED_PLAN_DRAFT_ID}`),
}