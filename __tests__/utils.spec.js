import * as utils from "@/utils";
import flushPromises from "flush-promises";

describe("loadScript", () => {
  afterEach(() => {
    document.getElementsByTagName("html")[0].innerHTML = "";
  });

  it("should return a promise", () => {
    expect(utils.loadScript("a")).toBeInstanceOf(Promise);
  });

  it("should create a script tag", (done) => {
    utils.loadScript("foo");

    flushPromises().then(() => {
      expect(document.head).toMatchSnapshot();
      done();
    });
  });

  it("should create a link for domain preconnect", (done) => {
    utils.loadScript("foo", "bar");

    flushPromises().then(() => {
      expect(document.head).toMatchSnapshot();
      done();
    });
  });
});

describe("merge", () => {
  it("should merge two objects", () => {
    const a = { a: 1, c: 2 };
    const b = { b: 1 };

    utils.merge(a, b);

    expect(a).toMatchObject({
      a: 1,
      b: 1,
      c: 2,
    });
  });
});
