const core = require("@actions/core");

function checkPrBranch(prBranch) {
  core.info(`Checking branch name formatting\n  - "${prBranch}"`);

  let prBranchRegexp = /^\d+(-[^\W_]+)+$/;
  return prBranchRegexp.test(prBranch);
}

function checkPrTitle(prTitle) {
  core.info(`Checking PR title formatting\n  - "${prTitle}"`);

  let prTitleRegexp = /^#?\d+:?\s+.+$/;
  return prTitleRegexp.test(prTitle);
}

function checkPrDescription(prDescription) {
  core.info(`Checking PR description formatting\n  - "${prDescription}"`);

  let prDescriptionRegexp = /((fix(e[ds])?)|(close[ds]?)|(resolve[ds]?))(:? (DARMA-tasking\/[\w-]+)?#)\d+/i;
  return prDescriptionRegexp.test(prDescription);
}

function compareTitleDescriptionBranchIssue(prBranch, prTitle, prDescription) {
  core.info("Extracting issue number from");

  let branchIssue = extractBranchIssue(prBranch);
  core.info(`  - branch name - "${branchIssue}"`);

  let titleIssue = extractTitleIssue(prTitle);
  core.info(`  - PR title - "${titleIssue}"`);

  let descriptionIssue = extractDescriptionIssue(prDescription);
  core.info(`  - PR description - "${descriptionIssue}"`);

  return branchIssue === titleIssue && titleIssue === descriptionIssue;
}

function extractBranchIssue(prBranch) {
  let prBranchRegexp = /^\d+(?=((-[^\W_]+)+$))/;
  let issueStr = prBranch.match(prBranchRegexp);
  let issueNumber = parseInt(issueStr, 10);

  return issueNumber;
}

function extractTitleIssue(prTitle) {
  let prTitleRegexp = /(((?<=^)\d+)|((?<=^#)\d+))/;
  let issueStr = prTitle.match(prTitleRegexp);
  let issueNumber = parseInt(issueStr, 10);

  return issueNumber;
}

function extractDescriptionIssue(prDescription) {
  // Firstly extract "Fixes #issue" phrase
  let prDescriptionRegexp = /((fix(e[ds])?)|(close[ds]?)|(resolve[ds]?))(:? #)\d+/i;
  let fixesIssueStr = prDescription.match(prDescriptionRegexp);

  // Next extract issue number
  let issueNumberRegexp = /\d+/;
  let issueStr = fixesIssueStr[0].match(issueNumberRegexp);
  let issueNumber = parseInt(issueStr, 10);

  return issueNumber;
}

exports.checkPrBranch = checkPrBranch;
exports.checkPrTitle = checkPrTitle;
exports.checkPrDescription = checkPrDescription;
exports.compareTitleDescriptionBranchIssue = compareTitleDescriptionBranchIssue;
exports.extractBranchIssue = extractBranchIssue;
exports.extractTitleIssue = extractTitleIssue;
exports.extractDescriptionIssue = extractDescriptionIssue;
