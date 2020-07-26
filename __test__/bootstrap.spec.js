import { isReady, isBootstrapped } from "../src/states";
import bootstrap from "../src/bootstrap";
import { loadScript } from "../src/utils";
import { mergeOptions, options } from "../src/options";
import flushPromises from "flush-promises";
import mockdate from "mockdate";

mockdate.set("2020-01-01T01:01:01Z");

jest.mock("../src/utils");
jest.mock("../src/states");

const originalOptions = { ...options };

describe("bootstrap", () => {
  beforeEach(() => {
    loadScript.mockReturnValueOnce(Promise.resolve());
    isBootstrapped.value = false;
    isReady.value = false;
    mergeOptions(originalOptions);
  });

  afterEach(() => {
    // This is the only way I found to clear the global scope
    // from injected variables
    delete global[options.globalObjectName];
    delete global[options.globalDataLayerName];

    jest.restoreAllMocks();
  });

  it("should not load script without an id", () => {
    bootstrap();

    expect(loadScript).not.toHaveBeenCalled();
  });

  it("should not load script if already bootstrapped", () => {
    mergeOptions({ id: 1 });

    isBootstrapped.value = true;

    bootstrap();

    expect(loadScript).not.toHaveBeenCalled();
  });

  it("should not load script if no window is defined", () => {
    const windowSpy = jest.spyOn(global, "window", "get");

    windowSpy.mockImplementation(() => undefined);

    mergeOptions({ id: 1 });

    bootstrap();

    expect(loadScript).not.toHaveBeenCalled();
  });

  it("should not load script if no document is defined", () => {
    const documentSpy = jest.spyOn(global, "document", "get");

    documentSpy.mockImplementation(() => undefined);

    mergeOptions({ id: 1 });

    bootstrap();

    expect(loadScript).not.toHaveBeenCalled();
  });

  it("should register gtag global object", () => {
    mergeOptions({ id: 1 });

    bootstrap();

    expect(window.gtag).toBeDefined();
  });

  it("should register gtag global object under another name", () => {
    mergeOptions({ globalObjectName: "foo", id: 1 });

    bootstrap();

    expect(window.foo).toBeDefined();
    expect(window.gtag).not.toBeDefined();
  });

  it("should push arguments inside the dataLayer", () => {
    mergeOptions({ id: 1 });

    bootstrap();

    window.gtag("foo", "bar");

    expect(window.dataLayer).toMatchSnapshot();
  });

  it("should load script", () => {
    mergeOptions({ id: 1 });

    bootstrap();

    expect(loadScript).toHaveBeenCalledWith(
      "https://www.googletagmanager.com/gtag/js?id=1&l=dataLayer"
    );
  });

  it("should set isReady to true once loadScript is resolved", async () => {
    mergeOptions({ id: 1 });

    bootstrap();

    await flushPromises();

    expect(isReady.value).toEqual(true);
  });
});
