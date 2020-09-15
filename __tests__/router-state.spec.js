import state from "@/router-state";
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

  it("should render default router state", () => {
    expect(state).toMatchSnapshot();
  });
});
