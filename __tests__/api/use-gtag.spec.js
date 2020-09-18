import useGtag from "@/api/use-gtag";

jest.mock("@/api", () => ({
  foo: 1,
  bar: 2,
}));

describe("useGtag", () => {
  it("should return the api object", () => {
    expect(useGtag()).toMatchSnapshot();
  });
});
