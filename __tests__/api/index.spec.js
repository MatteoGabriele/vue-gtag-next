import * as api from "@/api";

describe("api", () => {
  it("should render the api object", () => {
    expect(Object.keys(api)).toMatchSnapshot();
  });
});
