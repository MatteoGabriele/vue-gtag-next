import config from "@/api/config";

export default (...args) => {
  config("linker", ...args);
};
