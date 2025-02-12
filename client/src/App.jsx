import { useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import Navbar from "./pages/Navbar";
import { Textarea } from "./components/ui/textarea";
import axios from "axios";
import toast from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

const appRouter = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
