import { Routes, Route } from "react-router-dom";
import { routeArray } from "../../routes/index";

export default function HomeComponent() {
  return (
    <Routes>
      {routeArray.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}
