import { watch } from "vue";
import firstConfigHit from "@/first-config-hit";
import { loadScript, isBrowser } from "@/utils";
import { isTrackRouterEnabled } from "@/router-state";
import {
  isTracking,
  hasId,
  defaultProperty,
  useState,
  isBootstrapped,
  isReady,
} from "@/state";

export const bootstrap = () => {
  const { preconnectOrigin, resourceURL, dataLayerName } = useState();

  if (!isBrowser() || !hasId.value || isBootstrapped.value) {
    return;
  }

  isBootstrapped.value = true;

  if (!isTrackRouterEnabled.value) {
    firstConfigHit();
  }

  const resource = `${resourceURL.value}?id=${defaultProperty.value.id}&l=${dataLayerName.value}`;

  loadScript(resource, preconnectOrigin.value).then(() => {
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
