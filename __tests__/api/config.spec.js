import config from "@/api/config";
import query from "@/api/query";
import state from "@/state";
import { merge } from "@/utils";

jest.mock("@/api/query");

const defaultState = { ...state };

describe("api/config", () => {
  beforeEach(() => {
    merge(state, defaultState);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it("should be called", () => {
    merge(state, {
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
    merge(state, {
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
