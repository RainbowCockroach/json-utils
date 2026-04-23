import { Link } from "react-router-dom";
import fontColorContrast from "font-color-contrast";

const buttons = [
  { to: "/stringify",   label: "Stringify JSON",    bg: "#646cff" },
  { to: "/parse",       label: "Parse JSON",         bg: "#e05252" },
  { to: "/escape",      label: "Escape JSON",        bg: "#e07d30" },
  { to: "/unescape",    label: "Unescape JSON",      bg: "#c9b800" },
  { to: "/compare",     label: "Compare JSON",       bg: "#3aaa5c" },
  { to: "/decode-url",  label: "Decode URL",         bg: "#1aa3c8" },
  { to: "/format-json", label: "Format JSON",        bg: "#9b5de5" },
  { to: "/js-to-json",  label: "JS Object to JSON",  bg: "#d63384" },
];

function Home() {
  return (
    <div>
      <div className="main-menu">
        {buttons.map(({ to, label, bg }) => (
          <Link
            key={to}
            to={to}
            className="menu-button"
            style={{ backgroundColor: bg, color: fontColorContrast(bg) }}
          >
            <div>
              <h3>{label}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
