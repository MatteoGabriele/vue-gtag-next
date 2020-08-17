import { defaultProperty, mergeOptions, options } from "@/options";

const defaultOptions = { ...options };

describe("options", () => {
  beforeEach(() => {
    mergeOptions(defaultOptions);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it("should render default plugin options", () => {
    expect(options).toMatchSnapshot();
  });

  describe("defaultProperty", () => {
    it("should return the object", () => {
      mergeOptions({
        property: {
          id: 1,
        },
      });

      expect(defaultProperty.value).toEqual({ id: 1 });
    });

    it("should return the only item in the array", () => {
      mergeOptions({
        property: [
          {
            id: 1,
          },
        ],
      });

      expect(defaultProperty.value).toEqual({ id: 1 });
    });

    it("should return the only item in the array", () => {
      mergeOptions({
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
