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

  const {
    domain,
    customResource,
    globalObjectName,
    globalDataLayerName,
    id,
  } = options;

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

  const resource =
    customResource ||
    `${options.domain}/gtag/js?id=${options.id}&l=${options.globalDataLayerName}`;

  loadScript(resource, domain).then(() => {
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
