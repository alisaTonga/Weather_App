import { useContext } from "react";
import WeatherCard from "../weatherCard/WeatherCard";
import { WeatherContext } from "../weatherProvider/WeatherProvider";

export default function WeatherFavorites() {
  // данные мы забираем через хук useContext()
    const { favorites, setFavorites } = useContext(WeatherContext);

    const deleteCard = (id: number) => {
        setFavorites(favorites.filter((card) => card.id !== id));
    };

    return (
        <div>
        {favorites.length > 0 && (
            <div>
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
