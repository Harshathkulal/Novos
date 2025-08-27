export const extractTime = (timestamp?: string | Date): string => {
  let date: Date;

  if (!timestamp || isNaN(new Date(timestamp).getTime())) {
    date = new Date();
  } else {
    date = new Date(timestamp);
  }

  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};
