import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddMembers from "./Components/AddMembers";
import CreateGroup from "./Components/CreateGroup";
import ExpenseMain from "./Components/ExpenseMain";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateGroup />} />
        <Route path="/members" element={<AddMembers />} />
        <Route path="/expense" element={<ExpenseMain />} />
      </Routes>
    </BrowserRouter>
  );
}
