import plugin, {
  isReady,
  isTracking,
  useState,
  useGtag,
  trackRouter,
} from "@/index";
import { merge } from "@/utils";
import registerGlobalObject from "@/register-global-object";
import { useBootstrapWatcher } from "@/bootstrap";

jest.mock("@/utils");
jest.mock("@/bootstrap");
jest.mock("@/register-global-object");

describe("install", () => {
  it("should install the plugin", () => {
    const appMock = {
      config: {
        globalProperties: {},
      },
    };

    plugin.install(appMock);

    expect(merge).toHaveBeenCalled();
    expect(registerGlobalObject).toHaveBeenCalled();
    expect(useBootstrapWatcher).toHaveBeenCalled();
    expect(appMock.config.globalProperties.$gtag).toBeDefined();
  });

  it("should export", () => {
    expect(isReady).toBeDefined();
    expect(isTracking).toBeDefined();
    expect(useState).toBeDefined();
    expect(useGtag).toBeDefined();
    expect(trackRouter).toBeDefined();
  });
});
