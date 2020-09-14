import state, { defaultProperty } from "@/state";
import { merge } from "@/utils";

const defaultState = { ...state };

describe("options", () => {
  beforeEach(() => {
    merge(state, defaultState);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it("should render default plugin state", () => {
    expect(state).toMatchSnapshot();
  });

  describe("defaultProperty", () => {
    it("should return the object", () => {
      merge(state, {
        property: {
          id: 1,
        },
      });

      expect(defaultProperty.value).toEqual({ id: 1 });
    });

    it("should return the only item in the array", () => {
      merge(state, {
        property: [
          {
            id: 1,
          },
        ],
      });

      expect(defaultProperty.value).toEqual({ id: 1 });
    });

    it("should return the only item in the array", () => {
      merge(state, {
        property: [
          {
            id: 1,
          },
          {
            id: 2,
            default: true,
          },
        ],
      });

      expect(defaultProperty.value).toEqual({ id: 2, default: true });
    });
  });
});
