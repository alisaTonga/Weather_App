import { removeFavorite } from "../../features/weather/weatherSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import WeatherCard from "../weatherCard/WeatherCard";
import { getWeather } from "../../features/weather/weatherAction";
import style from "./weatherFavorites.module.css";

export default function WeatherFavorites() {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.weathers.favorites);

  const deleteCard = (id: number) => {
    dispatch(removeFavorite(id));
  };

  return (
    <div className={style.favoritesContainer}>
      {favorites.length > 0 && (
        <div className={style.cardWrapper}>
          {favorites.map((el) => (
            <WeatherCard
              key={el.id}
              isNewCard={false}
              favorites={favorites}
              del={deleteCard}
              city={el.name}
              temp={Math.floor(el.main.temp - 273.15)}
              image={`http://openweathermap.org/img/w/${el.weather[0].icon}.png`}
              id={el.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
