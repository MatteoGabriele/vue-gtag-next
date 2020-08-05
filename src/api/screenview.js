import event from "@/api/event";

export default (...args) => {
  event("screen_view", ...args);
};
