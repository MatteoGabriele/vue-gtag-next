import query from "@/api/query";
import { allProperties } from "@/state";

export default (eventName, eventParams = {}) => {
  const params = { ...eventParams };

  if (!params.send_to && allProperties.value.length > 1) {
    params.send_to = allProperties.value.map((property) => property.id);
  }

  query("event", eventName, params);
};
