import {
  HashRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { useI18n } from "./context/I18nContext";
import { TopBar } from "./components/shared/TopBar";
import { EnvelopeIntro } from "./components/pages/EnvelopeIntro";
import { ContentPage } from "./components/pages/ContentPage";
import { Background } from "./components/shared/Background";

function AppRoutes() {
  const { lang } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();
  const [isEnvelopeOpening, setIsEnvelopeOpening] = useState(false);

  const handleOpen = () => {
    if (isEnvelopeOpening) return;
    setIsEnvelopeOpening(true);
    navigate("/invitation");
  };

  const handleDismiss = () => {
    setIsEnvelopeOpening(false);
  };

  const returnToEnvelope = () => {
    navigate("/");
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  useEffect(() => {
    if (location.pathname === "/") {
      setIsEnvelopeOpening(false);
    }
  }, [location.pathname]);

  const showEnvelope = location.pathname === "/" || isEnvelopeOpening;

  return (
    <div
      className={`${lang === "ar" ? "font-ar" : "font-en"} relative min-h-screen`}
    >
      {showEnvelope ? (
        <EnvelopeIntro
          opening={isEnvelopeOpening}
          onOpen={handleOpen}
          onDismiss={handleDismiss}
        />
      ) : null}
      <Routes>
        <Route path="/" element={<></>} />

        {/* Content Page: The Details */}
        <Route
          path="/invitation"
          element={
            <div className="relative z-10 opacity-100 transition duration-700">
              <Background />
              <TopBar />
              <ContentPage onReturnToEnvelope={returnToEnvelope} />
            </div>
          }
        />

        {/* Catch-all: Redirect back to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
}
