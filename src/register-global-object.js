import { isBrowser } from "@/utils";
import { useState } from "@/state";

export default () => {
  if (!isBrowser()) {
    return;
  }

  const { globalObjectName, dataLayerName } = useState();

  if (window[globalObjectName.value] == null) {
    window[dataLayerName.value] = window[dataLayerName.value] || [];
    window[globalObjectName.value] = function () {
      window[dataLayerName.value].push(arguments);
    };
  }

  window[globalObjectName.value]("js", new Date());
};
