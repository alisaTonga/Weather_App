import { useFormik } from "formik";
import { FormEvent } from "react";
import * as Yup from "yup";
import { IWeatherData } from "../../types/weather";
import ErrorPage from "../error/ErrorPage";
import MyButton from "../myButton/MyButton";
import WeatherCard from "../weatherCard/WeatherCard";
import style from "./weatherApp.module.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getWeather } from "../../features/weather/weatherAction";
import {
  addFavorite,
  removeFavorite,
} from "../../features/weather/weatherSlice";

interface IFormCity {
  city: string;
}

const schema = Yup.object().shape({
  city: Yup.string().required("введите название города!"),
});

export default function WeatherApp() {
  const dispatch = useAppDispatch();
  const { favorites, isLoading, error } = useAppSelector(
    (state) => state.weathers
  );
  const weatherData = useAppSelector((state) => state.weathers.currentWeather);

  const formik = useFormik({
    initialValues: {
      city: "",
    } as IFormCity,
    validationSchema: schema,
    validateOnChange: false,
    onSubmit: (values: IFormCity, { resetForm }) => {
      dispatch(getWeather(values.city));
      resetForm();
    },
  });

  const submitAction = (event: FormEvent) => {
    event.preventDefault();
    formik.handleSubmit();
  };

  const addCard = () => {
    if (weatherData) {
      dispatch(addFavorite(weatherData));
    }
  };

  const deleteCard = (id: number) => {
    dispatch(removeFavorite(id));
  };

  return (
    <div>
      <div className={style.descriptionSection}>
        <h1>Check Weather Anywhere</h1>
        <p>
          Enter a city name to get instant weather updates. Save your favorite
          locations for quick access.
        </p>
      </div>
      <form className={style.form} onSubmit={submitAction}>
        <input
          className={style.input}
          name="city"
          onChange={formik.handleChange}
          value={formik.values.city}
          type="text"
        />
        <MyButton type="submit" name="Search" />
      </form>
      <div className={style.cardWrapper}>
        {error && <ErrorPage text={error} type="api" />}
        {formik.errors.city && (
          <ErrorPage text={formik.errors.city} type="validation" />
        )}
        {((weatherData && weatherData.name && weatherData.name.length > 0) ||
          isLoading) && (
          <WeatherCard
            isLoading={isLoading}
            favorites={favorites}
            add={addCard}
            del={deleteCard}
            id={weatherData?.id || 0}
            city={weatherData?.name || ""}
            temp={Math.floor((weatherData?.main.temp || 0) - 273.15)}
            image={`http://openweathermap.org/img/w/${weatherData?.weather[0]?.icon}.png`}
          />
        )}
      </div>
    </div>
  );
}
