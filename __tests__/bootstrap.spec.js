import state, { isReady, isBootstrapped } from "@/state";
import { bootstrap } from "@/bootstrap";
import { merge, loadScript } from "@/utils";
import flushPromises from "flush-promises";
import query from "@/api/query";

jest.mock("@/api/config");
jest.mock("@/api/query");

jest.mock("@/utils", () => {
  const utils = jest.requireActual("@/utils");
  return {
    ...utils,
    loadScript: jest.fn(() => Promise.resolve()),
  };
});

const defaultState = { ...state };

describe("bootstrap", () => {
  beforeEach(() => {
    isReady.value = false;
    isBootstrapped.value = false;
    merge(state, defaultState);
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
    merge(state, {
      property: { id: 1 },
    });

    isBootstrapped.value = true;

    bootstrap();

    expect(loadScript).not.toHaveBeenCalled();
  });

  it("should not load script if no window is defined", () => {
    const windowSpy = jest.spyOn(global, "window", "get");

    windowSpy.mockImplementation(() => undefined);

    merge(state, {
      property: { id: 1 },
    });

    bootstrap();

    expect(loadScript).not.toHaveBeenCalled();
  });

  it("should not load script if no document is defined", () => {
    const documentSpy = jest.spyOn(global, "document", "get");

    documentSpy.mockImplementation(() => undefined);

    merge(state, {
      property: { id: 1 },
    });

    bootstrap();

    expect(loadScript).not.toHaveBeenCalled();
  });

  it("should load script", () => {
    merge(state, {
      property: { id: 1 },
    });

    bootstrap();

    expect(loadScript).toHaveBeenCalledWith(
      "https://www.googletagmanager.com/gtag/js?id=1&l=dataLayer",
      "https://www.googletagmanager.com"
    );
  });

  it("should set isReady to true once loadScript is resolved", async () => {
    merge(state, {
      property: { id: 1 },
    });

    bootstrap();

    await flushPromises();

    expect(isReady.value).toEqual(true);
  });

  it("should load a custom source", () => {
    merge(state, {
      property: { id: 1 },
      resourceURL: "foo.js",
    });

    bootstrap();

    expect(loadScript).toHaveBeenCalledWith(
      "foo.js?id=1&l=dataLayer",
      "https://www.googletagmanager.com"
    );
  });

  it("should fire query once bootstrapped", () => {
    merge(state, {
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
    merge(state, {
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
