export const getRouteTitle = (pathname: string) => {
  if (pathname === "/") return "Home";
  if (pathname === "/add") return "Add Task";
  if (pathname.startsWith("/edit/")) return "Edit Task";
  return "Page";
};
