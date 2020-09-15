import { reactive, computed, toRefs } from "vue";

const state = reactive({
  property: null,
  isEnabled: true,
  disableScriptLoader: false,
  useDebugger: false,
  globalObjectName: "gtag",
  dataLayerName: "dataLayer",
  resourceURL: "https://www.googletagmanager.com/gtag/js",
  preconnectOrigin: "https://www.googletagmanager.com",
  customResource: null,
  appName: null,
  appId: null,
  appVersion: null,
});

export const useState = () => toRefs(state);

export const defaultProperty = computed(() => {
  const { property } = useState();

  if (!property.value) {
    return;
  }

  if (Array.isArray(property.value)) {
    return property.value.find((p) => p.default === true) || property.value[0];
  }

  return property.value;
});

export const hasId = computed(() => {
  const { property } = useState();

  return Boolean(property.value && property.value.id !== null);
});

export const allProperties = computed(() => {
  const { property } = useState();

  if (Array.isArray(property.value)) {
    return property.value;
  }

  return [property.value];
});

export const isTracking = computed(() => {
  const { isEnabled } = useState();
  const property = defaultProperty.value;

  return Boolean(property && property.id && isEnabled.value);
});

export default state;
