import { isReady, isBootstrapped } from "../src/states";
import { bootstrap } from "../src/bootstrap";
import { loadScript } from "../src/utils";
import { mergeOptions, options } from "../src/options";
import flushPromises from "flush-promises";
import config from "../src/api/config";

jest.mock("../src/api/config");
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
    jest.restoreAllMocks();
    jest.clearAllMocks();
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

  it("should load script", () => {
    mergeOptions({ id: 1 });

    bootstrap();

    expect(loadScript).toHaveBeenCalledWith(
      "https://www.googletagmanager.com/gtag/js?id=1&l=dataLayer",
      "https://www.googletagmanager.com"
    );
  });

  it("should set isReady to true once loadScript is resolved", async () => {
    mergeOptions({ id: 1 });

    bootstrap();

    await flushPromises();

    expect(isReady.value).toEqual(true);
  });

  it("should load a custom source", () => {
    mergeOptions({ id: 1, customResource: "foo.js" });

    bootstrap();

    expect(loadScript).toHaveBeenCalledWith(
      "foo.js",
      "https://www.googletagmanager.com"
    );
  });

  it("should fire config once bootstrapped", () => {
    mergeOptions({ id: 1, params: { a: 1 } });

    bootstrap();

    expect(config).toHaveBeenCalledWith({ a: 1 });
  });
});
