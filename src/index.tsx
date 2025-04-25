import ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import WeatherApp from "./components/weatherApp/WeatherApp";
import Layout from "./components/layout/Layout";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import WeatherFavorites from "./components/weatherFavorites/WeatherFavorites";
import WeatherProvider from "./components/weatherProvider/WeatherProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    {/* все что внутри это children для WeatherProvider */}
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<WeatherApp />} />
          <Route path="/weathers" element={<WeatherFavorites />} />
          <Route path="*" element={<h1>Error 404 😵</h1>} />
        </Route>
      </Routes>
    </HashRouter>
    {/* здесь заканчиваются children */}
  </Provider>
);
