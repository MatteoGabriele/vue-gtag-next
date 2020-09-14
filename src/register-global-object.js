import { useState } from "@/state";

export default () => {
  if (typeof document === "undefined" || typeof window === "undefined") {
    return;
  }

  const { globalObjectName, globalDataLayerName } = useState();

  if (window[globalObjectName.value] == null) {
    window[globalDataLayerName.value] = window[globalDataLayerName.value] || [];
    window[globalObjectName.value] = function () {
      window[globalDataLayerName.value].push(arguments);
    };
  }

  window[globalObjectName.value]("js", new Date());
};
