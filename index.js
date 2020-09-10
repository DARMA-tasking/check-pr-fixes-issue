const core = require("@actions/core");
const helpers = require("./src/helpers");

async function check() {
  try {
    const prTitle = core.getInput("pr_title");
    const prDescription = core.getInput("pr_description");

    if (helpers.checkPrTitle(prTitle) === false) {
      core.setFailed("PR title doesn't start with issue number");
      return;
    }

    if (helpers.checkPrDescription(prDescription) == false) {
      core.setFailed("PR description doesn't contain 'fixes #issue' phrase");
      return;
    }

    if (
      helpers.compareTitleAndDescriptionIssue(prTitle, prDescription) === false
    ) {
      core.setFailed(
        "PR title and description contain different issue numbers"
      );
      return;
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
