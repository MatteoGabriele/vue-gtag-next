import firstConfigHit from "@/first-config-hit";
import { watch } from "vue";
import { loadScript, isBrowser } from "@/utils";
import {
  isTracking,
  hasId,
  defaultProperty,
  useState,
  isBootstrapped,
  isReady,
  isTrackRouterEnabled,
} from "@/state";

export const bootstrap = () => {
  const { domain, customResource, globalDataLayerName } = useState();

  if (!isBrowser() || !hasId.value || isBootstrapped.value) {
    return;
  }

  isBootstrapped.value = true;

  if (!isTrackRouterEnabled.value) {
    firstConfigHit();
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
