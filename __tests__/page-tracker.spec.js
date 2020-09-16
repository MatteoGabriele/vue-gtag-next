import pageview from "@/api/pageview";
import screenview from "@/api/screenview";
import { merge } from "@/utils";
import state from "@/state";
import routerState from "@/router-state";
import { trackPage } from "@/page-tracker";

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
});
