import { watch } from "vue";
import { loadScript } from "@/utils";
import query from "@/api/query";
import {
  isTracking,
  hasId,
  defaultProperty,
  allProperties,
  useState,
  isBootstrapped,
  isReady,
  isTrackRouterEnabled,
} from "@/state";

export const bootstrap = () => {
  if (typeof document === "undefined" || typeof window === "undefined") {
    return;
  }

  if (isBootstrapped.value) {
    return;
  }

  const { domain, customResource, globalDataLayerName } = useState();

  if (!hasId.value) {
    return;
  }

  isBootstrapped.value = true;

  if (!isTrackRouterEnabled.value) {
    allProperties.value.forEach((property) => {
      const params = property.params || {};

      if (typeof params.send_page_view === "undefined") {
        params.send_page_view = false;
      }

      query("config", property.id, params);
    });
  }

  const resource =
    customResource.value ||
    `${domain.value}/gtag/js?id=${defaultProperty.value.id}&l=${globalDataLayerName.value}`;

  loadScript(resource, domain.value).then(() => {
    isReady.value = true;
  });
};

export const useBootstrapWatcher = () => {
  watch(
    () => isTracking.value,
    (val) => val && bootstrap(),
    { immediate: true }
  );
};
