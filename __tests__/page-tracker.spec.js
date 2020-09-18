import pageview from "@/api/pageview";
import screenview from "@/api/screenview";
import { merge } from "@/utils";
import state from "@/state";
import routerState from "@/router-state";
import { trackPage, trackRouter } from "@/page-tracker";
import flushPromises from "flush-promises";
import { ref } from "vue";

jest.mock("@/api/pageview");
jest.mock("@/api/screenview");

const toMock = { name: "about", path: "/about" };
const fromMock = { name: "home", path: "/" };

const updateLocationPath = (href) => {
  global.window = Object.create(window);

  Object.defineProperty(window, "location", {
    value: {
      href,
    },
  });
};

const defaultState = { ...state };
const defaultRouterState = { ...routerState };

describe("page-tracker", () => {
  beforeEach(() => {
    merge(state, defaultState);
    merge(routerState, defaultRouterState);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it("should track a pageview", () => {
    updateLocationPath("http://localhost/about");

    trackPage(toMock, fromMock);

    expect(pageview).toHaveBeenCalledWith({
      page_location: "http://localhost/about",
      page_path: "/about",
      page_title: "about",
    });
  });

  it("should track a screenview", () => {
    updateLocationPath("http://localhost/about");

    merge(state, {
      appName: "MyApp",
    });

    merge(routerState, {
      useScreenview: true,
    });

    trackPage(toMock, fromMock);

    expect(screenview).toHaveBeenCalledWith({
      screen_name: "about",
    });
  });

  it("should not track when same path", () => {
    const to = { name: "home", path: "/" };
    const from = { name: "home", path: "/" };

    updateLocationPath("http://localhost/");

    trackPage(to, from);

    expect(pageview).not.toHaveBeenCalled();
  });

  it("should track the same path", () => {
    const to = { name: "home", path: "/" };
    const from = { name: "home", path: "/" };

    updateLocationPath("http://localhost/about");

    merge(routerState, {
      skipSamePath: false,
    });

    trackPage(to, from);

    expect(pageview).toHaveBeenCalled();
  });

  it("should return a custom template", () => {
    merge(routerState, {
      template() {
        return {
          page_title: "foo",
          page_path: "bar",
          page_location: "/foo/bar",
        };
      },
    });

    trackPage(toMock, fromMock);

    expect(pageview).toHaveBeenCalledWith({
      page_title: "foo",
      page_path: "bar",
      page_location: "/foo/bar",
    });
  });

  it("should start tracking when active and router is ready", async () => {
    updateLocationPath("http://localhost/about");

    const router = {
      isReady: jest.fn(() => Promise.resolve()),
      afterEach: jest.fn((fn) => fn(toMock, fromMock)),
      currentRoute: ref(toMock),
    };

    merge(state, {
      property: {
        id: 1,
      },
    });

    trackRouter(router);

    await flushPromises();

    expect(pageview).toHaveBeenCalledWith({
      page_title: "about",
      page_path: "/about",
      page_location: "http://localhost/about",
    });
  });

  it("should not start tracking if tracking is not active", async () => {
    const router = {
      isReady: jest.fn(() => Promise.resolve()),
      afterEach: jest.fn((fn) => fn(toMock, fromMock)),
      currentRoute: ref(toMock),
    };

    trackRouter(router);

    await flushPromises();

    expect(pageview).not.toHaveBeenCalled();
  });
});
