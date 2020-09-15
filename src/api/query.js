import { useState } from "@/state";
import { isBrowser } from "@/utils";

export default (...args) => {
  if (!isBrowser()) {
    return;
  }

  const { globalObjectName, useDebugger } = useState();

  if (useDebugger.value) {
    console.warn("[vue-gtag] Debugger:", args);
  }

  window[globalObjectName.value](...args);
};
