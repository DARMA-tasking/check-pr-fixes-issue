const core = require("@actions/core");

const prBranchRegExp = /^\d+(-[^\W_]+(_[^\W_]+)*)+$/;
const prTitleRegExp = /^#?\d+:?\s+.+$/;
const prDescriptionRegExp =
  /((fix(e[ds])?)|(close[ds]?)|(resolve[ds]?))(:? (DARMA-tasking\/[\w-]+)?#)\d+/i;

function checkPrBranch(prBranch) {
  core.info(`Checking branch name formatting\n  - "${prBranch}"`);
  return prBranchRegExp.test(prBranch);
}

function checkPrTitle(prTitle) {
  core.info(`Checking PR title formatting\n  - "${prTitle}"`);
  return prTitleRegExp.test(prTitle);
}

function checkPrDescription(prDescription) {
  core.info(`Checking PR description formatting\n  - "${prDescription}"`);
  return prDescriptionRegExp.test(prDescription);
}

function compareBranchTitleDescriptionIssueNumber(
  prBranch,
  prTitle,
  prDescription
) {
  core.info("Extracting issue number from");

  let branchIssue = extractBranchIssueNumber(prBranch);
  core.info(`  - branch name - "${branchIssue}"`);

  let titleIssue = extractTitleIssueNumber(prTitle);
  core.info(`  - PR title - "${titleIssue}"`);

  let descriptionIssue = extractDescriptionIssueNumber(prDescription);
  core.info(`  - PR description - "${descriptionIssue}"`);

  return branchIssue === titleIssue && titleIssue === descriptionIssue;
}

function extractIssueNumber(fromStr, withRegExp) {
  let fixesIssueStr = fromStr.match(withRegExp);
  let issueNumberRegexp = /\d+/;
  let issueStr = fixesIssueStr[0].match(issueNumberRegexp);
  let issueNumber = parseInt(issueStr, 10);

  return issueNumber;
}

function extractBranchIssueNumber(prBranch) {
  return extractIssueNumber(prBranch, prBranchRegExp);
}

function extractTitleIssueNumber(prTitle) {
  return extractIssueNumber(prTitle, prTitleRegExp);
}

function extractDescriptionIssueNumber(prDescription) {
  return extractIssueNumber(prDescription, prDescriptionRegExp);
}

exports.checkPrBranch = checkPrBranch;
exports.checkPrTitle = checkPrTitle;
exports.checkPrDescription = checkPrDescription;
exports.compareBranchTitleDescriptionIssueNumber =
  compareBranchTitleDescriptionIssueNumber;
exports.extractBranchIssueNumber = extractBranchIssueNumber;
exports.extractTitleIssueNumber = extractTitleIssueNumber;
exports.extractDescriptionIssueNumber = extractDescriptionIssueNumber;
