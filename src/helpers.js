function checkPrTitle(prTitle) {
  let prTitleRegexp = /^#?\d+\s+.+$/;
  return prTitleRegexp.test(prTitle);
}

function checkPrDescription(prDescription) {
  let prDescriptionRegexp = /[Ff]ixes #\d+/;
  return prDescriptionRegexp.test(prDescription);
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

function compareTitleAndDescriptionIssue(prTitle, prDescription) {
  let titleIssue = extractTitleIssue(prTitle);
  let descriptionIssue = extractDescriptionIssue(prDescription);
  return titleIssue === descriptionIssue;
}

exports.checkPrTitle = checkPrTitle;
exports.checkPrDescription = checkPrDescription;
exports.extractTitleIssue = extractTitleIssue;
exports.extractDescriptionIssue = extractDescriptionIssue;
exports.compareTitleAndDescriptionIssue = compareTitleAndDescriptionIssue;
