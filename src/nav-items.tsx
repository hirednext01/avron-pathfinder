import { HomeIcon, BarChart3Icon, BriefcaseIcon } from "lucide-react";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
  },
  {
    title: "Benchmark",
    to: "/benchmark", 
    icon: <BarChart3Icon className="h-4 w-4" />,
  },
  {
    title: "Jobs",
    to: "/jobs",
    icon: <BriefcaseIcon className="h-4 w-4" />,
  },
];