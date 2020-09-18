import state from "@/state";
import disable from "@/api/disable";
import { merge } from "@/utils";

const defaultState = { ...state };

describe("ga-disable", () => {
  beforeEach(() => {
    merge(state, defaultState);
  });

  afterEach(() => {
    delete global["ga-disable-1"];
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it("should set true", () => {
    merge(state, {
      property: { id: 1 },
    });

    disable();

    expect(global["ga-disable-1"]).toBe(true);
  });

  it("should set false", () => {
    merge(state, {
      property: { id: 1 },
    });

    disable(false);

    expect(global["ga-disable-1"]).toBe(false);
  });

  it("should set false to includes domains", () => {
    merge(state, {
      property: [{ id: 1 }, { id: 2 }],
    });

    disable(false);

    expect(global["ga-disable-1"]).toBe(false);
    expect(global["ga-disable-2"]).toBe(false);
  });

  it("should not fire the event", () => {
    const windowSpy = jest.spyOn(global, "window", "get");

    windowSpy.mockImplementation(() => undefined);

    merge(state, {
      property: { id: 1 },
    });

    disable();

    expect(global["ga-disable-1"]).toBeUndefined();
  });
});
