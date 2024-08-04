import { useFormik } from 'formik';
import { FormEvent, useState } from 'react';
import * as Yup from 'yup';
import { IWeatherData } from '../../types/weather';
import ErrorPage from '../error/ErrorPage';
import MyButton from '../myButton/MyButton';
import WeatherCard from '../weatherCard/WeatherCard';
import style from './weatherApp.module.css';


interface IFormCity {
  city: string;
}

const initialWeather: IWeatherData = {
  coord: {
    lon: 0,
    lat: 0
  },
  weather: [],
  base: '',
  main: {
    temp: 0,
    feels_like: 0,
    temp_min: 0,
    temp_max: 0,
    pressure: 0,
    humidity: 0,
    sea_level: 0,
    grnd_level: 0
  },
  visibility: 0,
  wind: {
    speed: 0,
    deg: 0
  },
  clouds: {
    all: 0
  },
  dt: 0,
  sys: {
    type: 0,
    id: 0,
    country: '',
    sunrise: 0,
    sunset: 0
  },
  timezone: 0,
  id: 0,
  name: '',
  cod: 0
};

const schema = Yup.object().shape({
  city: Yup
    .string()
    .required('введите название города!')
});

export default function WeatherApp() {

  const [weatherData, setWeatherData] = useState<IWeatherData>(initialWeather);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<IWeatherData[]>([]);


  const formik = useFormik({
    initialValues: {
      city: ''
    } as IFormCity,
    validationSchema: schema,
    validateOnChange: false,
    onSubmit: (values: IFormCity, { resetForm }) => {
      setError('');
      setWeatherData(initialWeather);
      fetchWeather(values.city);
      resetForm();
    }
  });



  const fetchWeather = async (city: string) => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        console.log(isLoading);
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=95abbc8a327ef422700ea93c6cee52f3`);
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const data = await res.json();
        setWeatherData(data);
        setIsLoading(false);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setIsLoading(false);
          setError(err.message);
        }
      }
    }, 1000);

  };

  const submitAction = (e: FormEvent) => {
    e.preventDefault();
    formik.handleSubmit();
    setWeatherData(initialWeather);
    setError('')
  };

  const addCard = () => {
    setFavorites([...favorites, weatherData]);
  };

  const deleteCard = (id: number) => {
    setFavorites(favorites.filter(card => card.id !== id));
  };



  return (
    <div>
      <form className={style.form} onSubmit={submitAction}>
        <input className={style.input} name='city' onChange={formik.handleChange} value={formik.values.city} type="text" />
        <MyButton type='submit' name='Search' />
      </form>
      <div className={style.cardWrapper}>
        {error && <ErrorPage text={error} type='api' />}

        {formik.errors.city && (
          <ErrorPage text={formik.errors.city} type='validation' />
        )}

        {(weatherData.name.length > 0 || isLoading) && (
          <WeatherCard
            isLoading={isLoading}
            favorites={favorites}
            add={addCard}
            del={deleteCard}
            id={weatherData.id}
            city={weatherData.name}
            temp={Math.floor(weatherData.main.temp - 273.15)}
            image={`http://openweathermap.org/img/w/${weatherData.weather[0]?.icon}.png`}
          />
        )}
      </div>

      {favorites.length > 0 && (
        <div>
          <h1 style={{ color: 'white' }}>Saved Cards:</h1>
          {favorites.map(el => (
            <WeatherCard
              key={el.id}
              isNewCard={false}
              favorites={favorites}
              del={deleteCard}
              city={el.name}
              temp={Math.floor(el.main.temp - 273.15)}
              image={`http://openweathermap.org/img/w/${el.weather[0].icon}.png`}
              id={el.id} />
          ))}
        </div>
      )}
    </div>
  );
}
