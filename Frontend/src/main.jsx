import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import "./index.css";
import App from "./App.jsx";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen.jsx";

function Root() {
  const [loading, setLoading] = useState(true);

  return loading ? (
    <LoadingScreen onComplete={() => setLoading(false)} />
  ) : (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(<Root />);
