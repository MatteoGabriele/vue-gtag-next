import { merge } from "@/utils";
import state from "@/state";
import screenview from "@/api/screenview";
import event from "@/api/event";

jest.mock("@/api/event");

const defaultState = { ...state };

describe("api/screenview", () => {
  beforeEach(() => {
    merge(state, defaultState);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be called with this parameters", () => {
    merge(state, {
      property: { id: 1 },
      appName: "MyApp",
    });

    screenview("bar");

    expect(event).toHaveBeenCalledWith("screen_view", {
      screen_name: "bar",
      app_name: "MyApp",
    });

    screenview({ foo: "bar" });

    expect(event).toHaveBeenCalledWith("screen_view", {
      foo: "bar",
      app_name: "MyApp",
    });
  });
});
