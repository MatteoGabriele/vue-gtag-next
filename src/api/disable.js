import { allProperties } from "@/state";

export default (value = true) => {
  allProperties.value.forEach((property) => {
    window[`ga-disable-${property.id}`] = value;
  });
};
