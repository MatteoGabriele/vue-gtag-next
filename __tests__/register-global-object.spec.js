import state from "@/state";
import { merge } from "@/utils";
import registerGlobalObject from "@/register-global-object";
import mockdate from "mockdate";

mockdate.set("2020-01-01T01:01:01Z");

const defaultState = { ...state };

describe("register-global-object", () => {
  beforeEach(() => {
    merge(state, defaultState);
  });

  afterEach(() => {
    delete global[state.globalObjectName];
    delete global[state.dataLayerName];

    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it("should register gtag global object", () => {
    registerGlobalObject();
    expect(window.gtag).toBeDefined();
  });

  it("should register gtag global object under another name", () => {
    merge(state, { globalObjectName: "foo" });
    registerGlobalObject();

    expect(window.foo).toBeDefined();
    expect(window.gtag).not.toBeDefined();
  });

  it("should push arguments inside the dataLayer", () => {
    registerGlobalObject();

    window.gtag("foo", "bar");

    expect(window.dataLayer).toMatchSnapshot();
  });
});
