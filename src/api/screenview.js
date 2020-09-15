import { useState } from "@/state";
import event from "@/api/event";

export default (...args) => {
  const { appName, appId, appVersion } = useState();
  const [arg] = args;
  let params = {};

  if (typeof arg === "string") {
    params = {
      screen_name: arg,
    };
  } else {
    params = arg;
  }

  if (params.app_name == null && appName.value != null) {
    params.app_name = appName.value;
  }

  if (params.app_id == null && appId.value != null) {
    params.app_id = appId.value;
  }

  if (params.app_version == null && appVersion.value != null) {
    params.app_version = appVersion.value;
  }

  event("screen_view", params);
};
