import { ref, toRefs, reactive } from "vue";

const routerState = reactive({
  template: null,
  useScreenview: false,
  skipSamePath: true,
});

export const useRouterState = () => toRefs(routerState);

export const isTrackRouterEnabled = ref(false);

export default routerState;
