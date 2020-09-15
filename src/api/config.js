import { allProperties } from "@/state";
import query from "@/api/query";

export default (...args) => {
  allProperties.value.forEach((property) => {
    query("config", property.id, ...args);
  });
};
