import {
  HashRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { useI18n } from "./context/I18nContext";
import { TopBar } from "./components/shared/TopBar";
import { EnvelopeIntro } from "./components/pages/EnvelopeIntro";
import { ContentPage } from "./components/pages/ContentPage";
import { Background } from "./components/shared/Background";

function AppRoutes() {
  const { lang } = useI18n();
  const navigate = useNavigate();

  const handleOpen = () => {
    // When envelope is clicked, move to /invitation
    navigate("/invitation");
  };

  const returnToEnvelope = () => {
    // Navigate back to home
    navigate("/");
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  return (
    <div
      className={`${lang === "ar" ? "font-ar" : "font-en"} relative min-h-screen`}
    >
      <Routes>
        {/* Landing Page: The Envelope */}
        <Route
          path="/"
          element={<EnvelopeIntro onOpen={handleOpen} onDismiss={handleOpen} />}
        />

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
