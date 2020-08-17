import { isReady, isBootstrapped } from "@/states";
import { bootstrap } from "@/bootstrap";
import { loadScript } from "@/utils";
import { mergeOptions, options } from "@/options";
import flushPromises from "flush-promises";
import query from "@/api/query";

jest.mock("@/api/config");
jest.mock("@/utils");
jest.mock("@/states");
jest.mock("@/api/query");

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
    mergeOptions({
      property: { id: 1 },
    });

    isBootstrapped.value = true;

    bootstrap();

    expect(loadScript).not.toHaveBeenCalled();
  });

  it("should not load script if no window is defined", () => {
    const windowSpy = jest.spyOn(global, "window", "get");

    windowSpy.mockImplementation(() => undefined);

    mergeOptions({
      property: { id: 1 },
    });

    bootstrap();

    expect(loadScript).not.toHaveBeenCalled();
  });

  it("should not load script if no document is defined", () => {
    const documentSpy = jest.spyOn(global, "document", "get");

    documentSpy.mockImplementation(() => undefined);

    mergeOptions({
      property: { id: 1 },
    });

    bootstrap();

    expect(loadScript).not.toHaveBeenCalled();
  });

  it("should load script", () => {
    mergeOptions({
      property: { id: 1 },
    });

    bootstrap();

    expect(loadScript).toHaveBeenCalledWith(
      "https://www.googletagmanager.com/gtag/js?id=1&l=dataLayer",
      "https://www.googletagmanager.com"
    );
  });

  it("should set isReady to true once loadScript is resolved", async () => {
    mergeOptions({
      property: { id: 1 },
    });

    bootstrap();

    await flushPromises();

    expect(isReady.value).toEqual(true);
  });

  it("should load a custom source", () => {
    mergeOptions({
      property: { id: 1 },
      customResource: "foo.js",
    });

    bootstrap();

    expect(loadScript).toHaveBeenCalledWith(
      "foo.js",
      "https://www.googletagmanager.com"
    );
  });

  it("should fire query once bootstrapped", () => {
    mergeOptions({
      property: {
        id: 1,
        params: { a: 1 },
      },
    });

    bootstrap();

    expect(query).toHaveBeenCalledWith("config", 1, {
      a: 1,
      send_page_view: false,
    });
  });

  it("should bootstrap multiple properties", () => {
    mergeOptions({
      property: [
        {
          id: 1,
          params: { a: 1 },
        },
        {
          id: 2,
          default: true,
          params: { b: 1 },
        },
      ],
    });

    bootstrap();

    expect(query).toHaveBeenCalledTimes(2);
    expect(query).toHaveBeenNthCalledWith(1, "config", 1, {
      a: 1,
      send_page_view: false,
    });
    expect(query).toHaveBeenNthCalledWith(2, "config", 2, {
      b: 1,
      send_page_view: false,
    });
  });
});
