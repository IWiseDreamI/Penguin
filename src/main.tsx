import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Header from "./components/header.tsx";
import Footer from "./components/footer.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Header />
		<App />
		<Footer />
	</StrictMode>,
);
