import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Login from "./components/auth/Login";
import Expenses from "./components/expenses/Expenses";
import Register from "./components/auth/Register";
import NotFound from "./components/NotFound";
import Statistics from "./components/statistics/Statistics";
import Incomes from "./components/incomes/Incomes";
import Tasks from "./components/tasks/Tasks";
import Profile from "./components/profile/Profile";
import io from "socket.io-client";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/expenses" element={<Expenses />}></Route>
          <Route path="/tasks" element={<Tasks />}></Route>
          <Route path="/incomes" element={<Incomes />}></Route>
          <Route path="/statistics" element={<Statistics />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
