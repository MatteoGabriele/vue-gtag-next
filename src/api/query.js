import { useOptions } from "@/options";

export default (...args) => {
  if (typeof document === "undefined" || typeof window === "undefined") {
    return;
  }

  const { globalObjectName } = useOptions();

  window[globalObjectName.value](...args);
};
