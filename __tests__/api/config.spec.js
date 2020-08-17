import config from "@/api/config";
import query from "@/api/query";
import { mergeOptions } from "@/options";

jest.mock("@/api/query");

describe("api/config", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be called", () => {
    mergeOptions({
      property: {
        id: 1,
      },
    });

    config("foo");

    expect(query).toHaveBeenCalledWith("config", 1, "foo");

    config({ a: 1 });

    expect(query).toHaveBeenCalledWith("config", 1, { a: 1 });
  });

  it("should be called with all properties", () => {
    mergeOptions({
      property: [
        {
          id: 1,
        },
        {
          id: 2,
        },
      ],
    });

    config("foo");

    expect(query).toHaveBeenCalledTimes(2);
    expect(query).toHaveBeenNthCalledWith(1, "config", 1, "foo");
    expect(query).toHaveBeenNthCalledWith(2, "config", 2, "foo");
  });
});
