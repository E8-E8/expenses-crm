import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import React, { useState, createContext } from "react";
import Login from "./components/auth/Login";
import Expenses from "./components/expenses/Expenses";
import Register from "./components/auth/Register";
import NotFound from "./components/NotFound";
import Statistics from "./components/statistics/Statistics";
import Incomes from "./components/incomes/Incomes";

export const AppContext = createContext(null);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/expenses" element={<Expenses />}></Route>
        <Route path="/incomes" element={<Incomes />}></Route>
        <Route path="/statistics" element={<Statistics />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
