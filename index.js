const core = require("@actions/core");
const helpers = require("./src/helpers");

async function check() {
  try {
    const prBranch = core.getInput("pr_branch");
    const prTitle = core.getInput("pr_title");
    const prDescription = core.getInput("pr_description");

    if (helpers.checkPrBranch(prBranch) === false) {
      core.setFailed("PR branch has wrong name");
      return;
    } else {
      core.info("  - OK");
    }

    if (helpers.checkPrTitle(prTitle) === false) {
      core.setFailed("PR title doesn't start with issue number");
      return;
    } else {
      core.info("  - OK");
    }

    if (helpers.checkPrDescription(prDescription) == false) {
      core.setFailed("PR description doesn't contain 'fixes #issue' phrase");
      return;
    } else {
      core.info("  - OK");
    }

    if (
      helpers.compareTitleDescriptionBranchIssue(
        prBranch,
        prTitle,
        prDescription
      ) === false
    ) {
      core.setFailed(
        "Branch name, PR title and PR description contain different issue numbers"
      );
      return;
    } else {
      core.info("  - OK");
    }
  } catch (error) {
    core.error(error);
    throw error;
  }
}

(async () => {
  try {
    await check();
  } catch (error) {
    core.setFailed(error.message);
  }
})();
