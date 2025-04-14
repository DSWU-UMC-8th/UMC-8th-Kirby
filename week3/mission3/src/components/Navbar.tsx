import { NavLink } from "react-router-dom";

const navItems = [
  { path: "/", label: "홈" },
  { path: "/movies/popular", label: "인기 영화" },
  { path: "/movies/now-playing", label: "상영 중" },
  { path: "/movies/top-rated", label: "평점 높은" },
  { path: "/movies/upcoming", label: "개봉 예정" },
];

const Navbar = () => {
  return (
    <nav className="flex justify-center gap-4 py-4 text-sm text-gray-500">
      {navItems.map(({ path, label }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            isActive ? "text-green-500 font-bold" : ""
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
