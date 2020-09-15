import { useState } from "@/state";

export default (...args) => {
  if (typeof document === "undefined" || typeof window === "undefined") {
    return;
  }

  const { globalObjectName, useDebugger } = useState();

  if (useDebugger.value) {
    console.warn("[vue-gtag] Debugger:", args);
  }

  window[globalObjectName.value](...args);
};
