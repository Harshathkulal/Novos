export const protectRoute = (req: any, res: any, next: any) => {
  req.user = { id: "xy2Uoi0qwS" };
  next();
};
