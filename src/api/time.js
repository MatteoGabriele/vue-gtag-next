import event from "@/api/event";

export default (...args) => {
  event("timing_complete", ...args);
};
