import event from "@/api/event";
import query from "@/api/query";
import state from "@/state";
import { merge } from "@/utils";

jest.mock("@/api/query");

describe("api/event", () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it("should be called with an event name and parameters", () => {
    event("click", { foo: "bar" });

    expect(query).toHaveBeenCalledWith("event", "click", { foo: "bar" });
  });

  it("should call an event for all properties", () => {
    merge(state, {
      property: [{ id: 1 }, { id: 2 }],
    });

    event("click", { foo: "bar" });

    expect(query).toHaveBeenCalledWith("event", "click", {
      foo: "bar",
      send_to: [1, 2],
    });
  });
});
