import { query } from "@/api";
import { allProperties } from "@/state";

export default () => {
  allProperties.value.forEach((property) => {
    const params = property.params || {};

    if (typeof params.send_page_view === "undefined") {
      params.send_page_view = false;
    }

    query("config", property.id, params);
  });
};
