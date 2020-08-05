import { useOptions } from "@/options";

export default () => {
  if (typeof document === "undefined" || typeof window === "undefined") {
    return;
  }

  const { globalObjectName, globalDataLayerName } = useOptions();

  if (window[globalObjectName.value] == null) {
    window[globalDataLayerName.value] = window[globalDataLayerName.value] || [];
    window[globalObjectName.value] = function () {
      window[globalDataLayerName.value].push(arguments);
    };
  }

  window[globalObjectName.value]("js", new Date());
};
