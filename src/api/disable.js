import { useOptions } from "@/options";

export default (value = true) => {
  const { id } = useOptions();

  window[`ga-disable-${id.value}`] = value;
};
