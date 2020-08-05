import { watch } from "vue";
import { loadScript } from "@/utils";
import { isBootstrapped, isReady } from "@/states";
import { useOptions } from "@/options";

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
  } = useOptions();

  if (id.value == null) {
    return;
  }

  isBootstrapped.value = true;

  if (window[globalObjectName.value] == null) {
    window[globalDataLayerName.value] = window[globalDataLayerName.value] || [];
    window[globalObjectName.value] = function () {
      window[globalDataLayerName.value].push(arguments);
    };
  }

  window[globalObjectName.value]("js", new Date());

  const resource =
    customResource.value ||
    `${domain.value}/gtag/js?id=${id.value}&l=${globalDataLayerName.value}`;

  loadScript(resource, domain.value).then(() => {
    isReady.value = true;
  });
};

export const useBootstrapWatcher = () => {
  const { isGtagEnabled, id } = useOptions();

  watch(
    [() => isGtagEnabled.value, () => id.value],
    ([isEnabled, id]) => id && isEnabled && bootstrap(),
    { immediate: true }
  );
};
