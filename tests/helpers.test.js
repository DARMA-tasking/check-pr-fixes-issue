const core = require("@actions/core");
const helpers = require("../src/helpers");

// Mute core.info
core.info = jest.fn();

describe("checkPrBranch function", () => {
  it("checks if PR branch starts with an issue number", () => {
    expect(
      helpers.checkPrBranch("1014-fix-NodeStats-LB-stat-file-output")
    ).toBeTruthy();
    expect(
      helpers.checkPrBranch("1031-commit-check-for-fixes-issue")
    ).toBeTruthy();
    expect(helpers.checkPrBranch("1009-components-memory-usage")).toBeTruthy();
    expect(helpers.checkPrBranch("1689-add-subphases-to-lb_iter")).toBeTruthy();

    expect(
      helpers.checkPrBranch(
        "#746-Adjust-location-manager-migration-nomenclature"
      )
    ).toBeFalsy();
    expect(
      helpers.checkPrBranch("Adjust-location-manager-migration-nomenclature")
    ).toBeFalsy();
    expect(helpers.checkPrBranch("1689-add-subphases-to_-lb_iter")).toBeFalsy();
    expect(helpers.checkPrBranch("1689-add-subphases-to-_lb_iter")).toBeFalsy();
    expect(helpers.checkPrBranch("1689-add-subphases-to__lb_iter")).toBeFalsy();
  });
});

describe("checkPrTitle function", () => {
  it("checks if PR title starts with an issue number", () => {
    expect(helpers.checkPrTitle("123 pr title")).toBeTruthy();
    expect(helpers.checkPrTitle("#123 pr title")).toBeTruthy();
    expect(helpers.checkPrTitle("#123: pr title")).toBeTruthy();
    expect(helpers.checkPrTitle("#123 - pr title")).toBeTruthy();

    expect(helpers.checkPrTitle("pr title 123")).toBeFalsy();
    expect(helpers.checkPrTitle("pr title #123")).toBeFalsy();
    expect(helpers.checkPrTitle("# 123 pr title")).toBeFalsy();
    expect(helpers.checkPrTitle("#123pr title")).toBeFalsy();
    expect(helpers.checkPrTitle("##123 pr title")).toBeFalsy();
    expect(helpers.checkPrTitle("123pr title")).toBeFalsy();
    expect(helpers.checkPrTitle("#123:pr title")).toBeFalsy();
    expect(helpers.checkPrTitle("#123::pr title")).toBeFalsy();
    expect(helpers.checkPrTitle("#123-pr title")).toBeFalsy();
    expect(helpers.checkPrTitle("#123, pr title")).toBeFalsy();
  });
});

describe("checkPrDescription function", () => {
  it('checks if PR description contains phrase "Fixes #issue"', () => {
    expect(helpers.checkPrDescription("close #123")).toBeTruthy();
    expect(helpers.checkPrDescription("Closed #123")).toBeTruthy();
    expect(helpers.checkPrDescription("Closed: #123")).toBeTruthy();
    expect(helpers.checkPrDescription("This PR closes #123")).toBeTruthy();

    expect(helpers.checkPrDescription("Fix #123")).toBeTruthy();
    expect(helpers.checkPrDescription("fix: #123")).toBeTruthy();
    expect(helpers.checkPrDescription("fixed #123")).toBeTruthy();
    expect(helpers.checkPrDescription("This PR fixes #123")).toBeTruthy();

    expect(helpers.checkPrDescription("Resolve #123")).toBeTruthy();
    expect(helpers.checkPrDescription("Resolved #123")).toBeTruthy();
    expect(helpers.checkPrDescription("This PR resolves #123")).toBeTruthy();
    expect(helpers.checkPrDescription("This PR resolves: #123")).toBeTruthy();

    expect(
      helpers.checkPrDescription("Closed DARMA-tasking/vt#123")
    ).toBeTruthy();
    expect(
      helpers.checkPrDescription("This PR fixes: DARMA-tasking/vt-vt#123")
    ).toBeTruthy();
    expect(
      helpers.checkPrDescription("Resolve DARMA-tasking/vt-foo-bar#123")
    ).toBeTruthy();

    // Github also supports "studly caps"
    expect(helpers.checkPrDescription("clOSe #123")).toBeTruthy();
    expect(helpers.checkPrDescription("FIXed #123")).toBeTruthy();
    expect(helpers.checkPrDescription("rEsOlvEs #123")).toBeTruthy();

    expect(helpers.checkPrDescription("Closes 123")).toBeFalsy();
    expect(helpers.checkPrDescription("closed123")).toBeFalsy();
    expect(helpers.checkPrDescription("Closed:: #123")).toBeFalsy();

    expect(helpers.checkPrDescription("fixed 123")).toBeFalsy();
    expect(helpers.checkPrDescription("Fix123")).toBeFalsy();
    expect(helpers.checkPrDescription("fix:: #123")).toBeFalsy();

    expect(helpers.checkPrDescription("Resolve ##123")).toBeFalsy();
    expect(helpers.checkPrDescription("resolves#123")).toBeFalsy();
    expect(helpers.checkPrDescription("This PR resolves:: #123")).toBeFalsy();
  });
});

describe("extractBranchIssue function", () => {
  it("extracts issue number from PR branch", () => {
    expect(
      helpers.extractBranchIssue("1014-fix-NodeStats-LB-stat-file-output")
    ).toEqual(1014);
    expect(
      helpers.extractBranchIssue("1031-commit-check-for-fixes-issue")
    ).toEqual(1031);
    expect(helpers.extractBranchIssue("1009-components-memory-usage")).toEqual(
      1009
    );
  });
});

describe("extractTitleIssue function", () => {
  it("extracts issue number from PR title", () => {
    expect(helpers.extractTitleIssue("123 pr title")).toEqual(123);
    expect(helpers.extractTitleIssue("23 pr title")).toEqual(23);
    expect(helpers.extractTitleIssue("#123 pr title")).toEqual(123);
    expect(helpers.extractTitleIssue("#12 pr title")).toEqual(12);
    expect(helpers.extractTitleIssue("#1234: pr title")).toEqual(1234);
  });
});

describe("extractDescriptionIssue function", () => {
  it("extracts issue number from PR description", () => {
    expect(helpers.extractDescriptionIssue("Close #123")).toEqual(123);
    expect(helpers.extractDescriptionIssue("closes #12")).toEqual(12);
    expect(helpers.extractDescriptionIssue("This PR closes #23")).toEqual(23);
    expect(helpers.extractDescriptionIssue("Closed: #1234")).toEqual(1234);

    expect(helpers.extractDescriptionIssue("Fix #123")).toEqual(123);
    expect(helpers.extractDescriptionIssue("fixes #12")).toEqual(12);
    expect(helpers.extractDescriptionIssue("This PR fixes #23")).toEqual(23);
    expect(helpers.extractDescriptionIssue("Fixed: #1234")).toEqual(1234);

    expect(helpers.extractDescriptionIssue("Resolve #123")).toEqual(123);
    expect(helpers.extractDescriptionIssue("resolves #12")).toEqual(12);
    expect(helpers.extractDescriptionIssue("This PR resolves #23")).toEqual(23);
    expect(helpers.extractDescriptionIssue("Resolved: #1234")).toEqual(1234);
  });
});

describe("compareTitleDescriptionBranchIssue function", () => {
  it("checks if PR branch, title and description contains the same issue number", () => {
    expect(
      helpers.compareTitleDescriptionBranchIssue(
        "123-fix-NodeStats-LB-stat-file-output",
        "123 pr title",
        "Fixes #123"
      )
    ).toBeTruthy();
    expect(
      helpers.compareTitleDescriptionBranchIssue(
        "23-commit-check-for-fixes-issue",
        "#23 title",
        "This PR fixes #23"
      )
    ).toBeTruthy();
    expect(
      helpers.compareTitleDescriptionBranchIssue(
        "1177-vt-darma-tasking-template-repository",
        "#1177: create template repository",
        "Fixes DARMA-tasking/vt#1177"
      )
    ).toBeTruthy();

    expect(
      helpers.compareTitleDescriptionBranchIssue(
        "1009-components-memory-usage",
        "123 pr title",
        "Fixes #23"
      )
    ).toBeFalsy();
    expect(
      helpers.compareTitleDescriptionBranchIssue(
        "955-clear-out-uses-of-addAction-in-tests",
        "#123 title",
        "This PR fixes #23"
      )
    ).toBeFalsy();
  });
});
