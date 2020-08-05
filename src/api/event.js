import query from "@/api/query";

export default (name, params = {}) => {
  query("event", name, params);
};
