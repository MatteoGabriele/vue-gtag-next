import state from "@/state";
import query from "@/api/query";
import firstConfigHit from "@/first-config-hit";
import { merge } from "@/utils";

jest.mock("@/api/query");

const defaultState = { ...state };

describe("options", () => {
  beforeEach(() => {
    merge(state, defaultState);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it("should call first hit", () => {
    merge(state, {
      property: {
        id: 1,
      },
    });

    firstConfigHit();

    expect(query).toHaveBeenCalledWith("config", 1, { send_page_view: false });
  });

  it("should call first hit for all properties", () => {
    merge(state, {
      property: [
        {
          id: 1,
        },
        {
          id: 2,
          params: {
            user_id: "foo",
          },
        },
        {
          id: 3,
          params: {
            send_page_view: true,
          },
        },
      ],
    });

    firstConfigHit();

    expect(query).toHaveBeenNthCalledWith(1, "config", 1, {
      send_page_view: false,
    });
    expect(query).toHaveBeenNthCalledWith(2, "config", 2, {
      send_page_view: false,
      user_id: "foo",
    });
    expect(query).toHaveBeenNthCalledWith(3, "config", 3, {
      send_page_view: true,
    });
  });
});
