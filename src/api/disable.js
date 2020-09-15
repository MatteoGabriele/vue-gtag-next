import { isBrowser } from "@/utils";
import { allProperties } from "@/state";

export default (value = true) => {
  if (!isBrowser()) {
    return;
  }

  allProperties.value.forEach((property) => {
    window[`ga-disable-${property.id}`] = value;
  });
};
