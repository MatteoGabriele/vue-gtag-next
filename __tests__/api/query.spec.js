import { merge } from "@/utils";
import state from "@/state";
import query from "@/api/query";

const defaultState = { ...state };

describe("api/query", () => {
  beforeEach(() => {
    merge(state, defaultState);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it("should call the gtag main object", () => {
    global.window = Object.create(window);

    Object.defineProperty(window, "gtag", {
      value: jest.fn(),
    });

    merge(state, {
      globalObjectName: "gtag",
    });

    query("foo", "bar");

    expect(global.window.gtag).toHaveBeenCalledWith("foo", "bar");
  });

  it("should not call window.gtag", () => {
    delete global.window;

    merge(state, {
      globalObjectName: "gtag",
    });

    query("foo", "bar");

    expect(global.window).toBeUndefined();
  });
});
