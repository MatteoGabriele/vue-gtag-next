import { toRefs, reactive } from "vue";

const routerState = reactive({
  template: null,
  useScreenview: false,
  skipSamePath: true,
});

export const useRouterState = () => toRefs(routerState);

export default routerState;
