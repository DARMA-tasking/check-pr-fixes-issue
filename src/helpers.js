function checkPrBranch(prBranch) {
  let prBranchRegexp = /^\d+(-[^\W_]+)+$/;
  return prBranchRegexp.test(prBranch);
}

function checkPrTitle(prTitle) {
  let prTitleRegexp = /^#?\d+:?\s+.+$/;
  return prTitleRegexp.test(prTitle);
}

function checkPrDescription(prDescription) {
  let prDescriptionRegexp = /((fix(e[ds])?)|(close[ds]?)|(resolve[ds]?))(:? #)\d+/i;
  return prDescriptionRegexp.test(prDescription);
}

function extractBranchIssue(prBranch) {
  let prBranchRegexp = /^\d+(?=((-[^\W_]+)+$))/;
  let issueNumber = prBranch.match(prBranchRegexp);
  return parseInt(issueNumber);
}

function extractTitleIssue(prTitle) {
  let prTitleRegexp = /(((?<=^)\d+)|((?<=^#)\d+))/;
  let issueNumber = prTitle.match(prTitleRegexp);
  return parseInt(issueNumber, 10);
}

function extractDescriptionIssue(prDescription) {
  let prDescriptionRegexp = /(?<=[Ff]ixes #)\d+/;
  let issueNumber = prDescription.match(prDescriptionRegexp);
  return parseInt(issueNumber, 10);
}

function compareTitleDescriptionBranchIssue(prBranch, prTitle, prDescription) {
  let branchIssue = extractBranchIssue(prBranch);
  let titleIssue = extractTitleIssue(prTitle);
  let descriptionIssue = extractDescriptionIssue(prDescription);
  return branchIssue === titleIssue && titleIssue === descriptionIssue;
}

exports.checkPrBranch = checkPrBranch;
exports.checkPrTitle = checkPrTitle;
exports.checkPrDescription = checkPrDescription;
exports.extractBranchIssue = extractBranchIssue;
exports.extractTitleIssue = extractTitleIssue;
exports.extractDescriptionIssue = extractDescriptionIssue;
exports.compareTitleDescriptionBranchIssue = compareTitleDescriptionBranchIssue;
