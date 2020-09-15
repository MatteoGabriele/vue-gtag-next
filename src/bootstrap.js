import { watch } from "vue";
import { loadScript, isBrowser } from "@/utils";
import { query } from "@/api";
import {
  isTracking,
  hasId,
  allProperties,
  defaultProperty,
  useState,
  isBootstrapped,
  isReady,
} from "@/state";

export const bootstrap = () => {
  const {
    disableScriptLoader,
    preconnectOrigin,
    resourceURL,
    dataLayerName,
  } = useState();

  if (!isBrowser() || !hasId.value || isBootstrapped.value) {
    return;
  }

  isBootstrapped.value = true;

  allProperties.value.forEach((property) => {
    const params = Object.assign({ send_page_view: false }, property.params);
    query("config", property.id, params);
  });

  if (disableScriptLoader.value) {
    isReady.value = true;
    return;
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
