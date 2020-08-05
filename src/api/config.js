import { useOptions } from "@/options";
import query from "@/api/query";

export default (...args) => {
  const { id } = useOptions();

  if (id.value == null) {
    return;
  }

  query("config", id.value, ...args);
};
