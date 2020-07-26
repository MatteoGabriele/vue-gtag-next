import { watch } from "vue";
import { loadScript } from "@/utils";
import { isBootstrapped, isReady } from "@/states";
import { options } from "@/options";

export const bootstrap = () => {
  if (typeof document === "undefined" || typeof window === "undefined") {
    return;
  }

  if (isBootstrapped.value) {
    return;
  }

  const { globalObjectName, globalDataLayerName, id } = options;

  if (id == null) {
    return;
  }

  isBootstrapped.value = true;

  if (window[globalObjectName] == null) {
    window[globalDataLayerName] = window[globalDataLayerName] || [];
    window[globalObjectName] = function () {
      window[globalDataLayerName].push(arguments);
    };
  }

  window[globalObjectName]("js", new Date());

  const domain = "https://www.googletagmanager.com";
  const resource = `${domain}/gtag/js?id=${id}&l=${globalDataLayerName}`;

  loadScript(resource).then(() => {
    isReady.value = true;
  });
};

export const useBootstrapWatcher = () => {
  watch(
    [() => options.isGtagEnabled, () => options.id],
    ([isEnabled, id]) => id && isEnabled && bootstrap(),
    { immediate: true }
  );
};
