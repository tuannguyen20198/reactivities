import { createBrowserRouter } from "react-router";

import ActivityDashboard from "@/features/activities/dashboard/ActivityDashboard";
import ActivityDetailPage from "@/features/activities/details/ActivityDetailPage";
import ActivityForm from "@/features/activities/form/ActivityForm";
import HomePage from "@/features/home/HomePage";
import App from "@/app/layout/App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "activities", element: <ActivityDashboard /> },
      { path: "activities/:id", element: <ActivityDetailPage /> },
      { path: "createActivity", element: <ActivityForm /> },
      { path: "manage/:id", element: <ActivityForm /> },
    ],
  },
]);
