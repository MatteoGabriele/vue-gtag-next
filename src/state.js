import { ref, reactive, computed, toRefs } from "vue";

const state = reactive({
  property: null,
  isEnabled: true,
  globalObjectName: "gtag",
  globalDataLayerName: "dataLayer",
  domain: "https://www.googletagmanager.com",
  customResource: null,
  useDebugger: false,
  appName: null,
  appId: null,
  appVersion: null,
});

export const routerState = reactive({
  template: null,
  useScreenview: false,
  skipSamePath: true,
});

export const useState = () => toRefs(state);

export const useRouterState = () => toRefs(routerState);

export const isBootstrapped = ref(false);

export const isReady = ref(false);

export const isTrackRouterEnabled = ref(false);

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
  return property.value && property.value.id !== null;
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

  return property && property.id && isEnabled.value;
});

export default state;
