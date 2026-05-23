import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router";
import RootLayout from "./components/RootLayout";
import DashboardLayout from "./components/DashboardLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Analytics from "./pages/Analytics";
import BudgetAlerts from "./pages/BudgetAlerts";
import AIInsights from "./pages/AIInsights";
import ReceiptScanner from "./pages/ReceiptScanner";
import Predictions from "./pages/Predictions";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
function App() {

  const router = createBrowserRouter([
    {
      path: "/",

      element: <RootLayout />,

      children: [

        {
          path: "",
          element: <Home />,
        },

        {
          path: "login",
          element: <Login />,
        },

        {
          path: "register",
          element: <Register />,
        },
      ],
    },
    {
      path: "/dashboard",

      element: <DashboardLayout />,

      children: [

        {
          path: "",
          element: <Dashboard />,
        },

        {
          path: "transactions",
          element: <Transactions />,
        },

        {
          path: "analytics",
          element: <Analytics />,
        },

        {
          path: "budget-alerts",
          element: <BudgetAlerts />,
        },

        {
          path: "ai-insights",
          element: <AIInsights />,
        },

        {
          path: "receipt-scanner",
          element: <ReceiptScanner />,
        },

        {
          path: "predictions",
          element: <Predictions />,
        },

        {
          path: "reports",
          element: <Reports />,
        },

        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;