import "./App.css";
import { Footer } from "./footer";
import logo from "./assets/YTMP4.svg";
import { YTInput } from "./urlSource.tsx";

function App() {
  return (
    <>
      <div>
        <img src={logo} id="logo" className="center" />
      </div>
      <div className="container-sm">
        <YTInput />
      </div>
      <Footer />
    </>
  );
}

export default App;
