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

  it("should add the app_id when defined", () => {
    merge(state, {
      appId: 123,
    });

    screenview({ foo: "bar" });

    expect(event).toHaveBeenCalledWith("screen_view", {
      foo: "bar",
      app_id: 123,
    });
  });

  it("should add the app_version when defined", () => {
    merge(state, {
      appVersion: 123,
    });

    screenview({ foo: "bar" });

    expect(event).toHaveBeenCalledWith("screen_view", {
      foo: "bar",
      app_version: 123,
    });
  });
});
