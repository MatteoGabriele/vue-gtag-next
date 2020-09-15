import state, {
  hasId,
  allProperties,
  isTracking,
  defaultProperty,
} from "@/state";
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

  describe("hasId", () => {
    it("should return false", () => {
      expect(hasId.value).toEqual(false);
    });

    it("should return true", () => {
      merge(state, {
        property: {
          id: 1,
        },
      });

      expect(hasId.value).toEqual(true);
    });
  });

  describe("isTracking", () => {
    it("should return false if no properties", () => {
      expect(isTracking.value).toEqual(false);
    });

    it("should return true when one property is added", () => {
      merge(state, {
        property: {
          id: 1,
        },
      });

      expect(isTracking.value).toEqual(true);
    });

    it("should return false a property is added but tracking is not enabled", () => {
      merge(state, {
        isEnabled: false,
        property: {
          id: 1,
        },
      });

      expect(isTracking.value).toEqual(false);
    });
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

  describe("allProperties", () => {
    it("should return an array with single item", () => {
      merge(state, {
        property: {
          id: 1,
        },
      });

      expect(allProperties.value).toEqual([
        {
          id: 1,
        },
      ]);
    });

    it("should return an array with 2 items", () => {
      merge(state, {
        property: [
          {
            id: 1,
          },
          {
            id: 2,
          },
        ],
      });

      expect(allProperties.value).toEqual([
        {
          id: 1,
        },
        {
          id: 2,
        },
      ]);
    });
  });
});
