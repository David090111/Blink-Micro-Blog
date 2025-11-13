import "./App.css";
import { useState } from "react";
import { Header } from "./components/Header";
import { Body } from "./components/Body";
import { Footer } from "./components/Footer";
import { AuthProvider } from "./context/AuthProvider";

function App() {
    const [sidebarFlag, setSidebarFlag] = useState(false);

    return (
        <AuthProvider>
            <div className="min-h-screen flex flex-col">
                {/* Header on top */}
                <Header sOpen={() => setSidebarFlag(true)} />

                {/* Main content grows to push footer down */}
                <div className="flex-1">
                    <Body sFlag={sidebarFlag} sClose={() => setSidebarFlag(false)} />
                </div>

                {/* Footer stays at the bottom */}
                <Footer />
            </div>
        </AuthProvider>
    );
}

export default App;
