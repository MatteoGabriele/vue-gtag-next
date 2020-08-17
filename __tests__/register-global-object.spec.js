import { mergeOptions, options } from "@/options";
import registerGlobalObject from "@/register-global-object";
import mockdate from "mockdate";

mockdate.set("2020-01-01T01:01:01Z");

const originalOptions = { ...options };

describe("register-global-object", () => {
  beforeEach(() => {
    mergeOptions(originalOptions);
  });

  afterEach(() => {
    delete global[options.globalObjectName];
    delete global[options.globalDataLayerName];

    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it("should register gtag global object", () => {
    registerGlobalObject();
    expect(window.gtag).toBeDefined();
  });

  it("should register gtag global object under another name", () => {
    mergeOptions({ globalObjectName: "foo" });
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
