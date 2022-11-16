import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AddMembers from "./Components/AddMembers";
import CreateGroup from "./Components/CreateGroup";
import ExpenseMain from "./Components/ExpenseMain";

export const ROUTES = {
  CREATE_GROUP: "/group",
  ADD_MEMBERS: "/members",
  EXPENSE_MAIN: "/expenses",
};
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={ROUTES.CREATE_GROUP} />} />
        <Route path={ROUTES.CREATE_GROUP} element={<CreateGroup />} />
        <Route path={ROUTES.ADD_MEMBERS} element={<AddMembers />} />
        <Route path={ROUTES.EXPENSE_MAIN} element={<ExpenseMain />} />
      </Routes>
    </BrowserRouter>
  );
}
