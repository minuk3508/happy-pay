import "bootstrap/dist/css/bootstrap.min.css";
import Router from "./Router";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <Router />
    </RecoilRoot>
  );
}

export default App;
