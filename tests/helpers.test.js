const helpers = require("../src/helpers");

describe("checkPrTitle function", () => {
  it("checks if PR title starts with an issue number", () => {
    expect(helpers.checkPrTitle("123 pr title")).toBeTruthy();
    expect(helpers.checkPrTitle("#123 pr title")).toBeTruthy();

    expect(helpers.checkPrTitle("pr title 123")).toBeFalsy();
    expect(helpers.checkPrTitle("pr title #123")).toBeFalsy();
    expect(helpers.checkPrTitle("# 123 pr title")).toBeFalsy();
    expect(helpers.checkPrTitle("#123pr title")).toBeFalsy();
    expect(helpers.checkPrTitle("##123 pr title")).toBeFalsy();
    expect(helpers.checkPrTitle("123pr title")).toBeFalsy();
  });
});

describe("checkPrDescription function", () => {
  it('checks if PR description contains phrase "Fixes #issue"', () => {
    expect(helpers.checkPrDescription("Fixes #123")).toBeTruthy();
    expect(helpers.checkPrDescription("fixes #123")).toBeTruthy();
    expect(helpers.checkPrDescription("This PR fixes #123")).toBeTruthy();

    expect(helpers.checkPrDescription("Fixes 123")).toBeFalsy();
    expect(helpers.checkPrDescription("fixes 123")).toBeFalsy();
    expect(helpers.checkPrDescription("fixes ##123")).toBeFalsy();
    expect(helpers.checkPrDescription("Fixes123")).toBeFalsy();
    expect(helpers.checkPrDescription("fixes123")).toBeFalsy();
    expect(helpers.checkPrDescription("Fixes#123")).toBeFalsy();
    expect(helpers.checkPrDescription("fixes#123")).toBeFalsy();
  });
});

describe("extractTitleIssue function", () => {
  it("extracts issue number from PR title", () => {
    expect(helpers.extractTitleIssue("123 pr title")).toEqual(123);
    expect(helpers.extractTitleIssue("23 pr title")).toEqual(23);
    expect(helpers.extractTitleIssue("#123 pr title")).toEqual(123);
    expect(helpers.extractTitleIssue("#12 pr title")).toEqual(12);
  });
});

describe("extractDescriptionIssue function", () => {
  it("extracts issue number from PR description", () => {
    expect(helpers.extractDescriptionIssue("Fixes #123")).toEqual(123);
    expect(helpers.extractDescriptionIssue("fixes #12")).toEqual(12);
    expect(helpers.extractDescriptionIssue("This PR fixes #23")).toEqual(23);
  });
});

describe("compareTitleAndDescriptionIssue function", () => {
  it("checks if PR title and PR description contains the same issue number", () => {
    expect(
      helpers.compareTitleAndDescriptionIssue("123 pr title", "Fixes #123")
    ).toBeTruthy();
    expect(
      helpers.compareTitleAndDescriptionIssue("#23 title", "This PR fixes #23")
    ).toBeTruthy();

    expect(
      helpers.compareTitleAndDescriptionIssue("123 pr title", "Fixes #23")
    ).toBeFalsy();
    expect(
      helpers.compareTitleAndDescriptionIssue("#123 title", "This PR fixes #23")
    ).toBeFalsy();
  });
});
