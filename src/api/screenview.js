import { useState } from "@/state";
import event from "@/api/event";

export default (...args) => {
  const { appName } = useState();
  const [arg] = args;
  let params = {};

  if (typeof arg === "string") {
    params = {
      screen_name: arg,
    };
  } else {
    params = arg;
  }

  if (params.app_name == null) {
    params.app_name = appName;
  }

  if (params.send_page_view == null) {
    params.send_page_view = true;
  }

  event("screen_view", params);
};
