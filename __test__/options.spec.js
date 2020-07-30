import { options } from "@/options";

describe("options", () => {
  it("should render default plugin options", () => {
    expect(options).toMatchSnapshot();
  });
});
