import { useFormik } from 'formik';
import { FormEvent, useContext, useState } from 'react';
import * as Yup from 'yup';
import { IWeatherData } from '../../types/weather';
import ErrorPage from '../error/ErrorPage';
import MyButton from '../myButton/MyButton';
import WeatherCard from '../weatherCard/WeatherCard';
import style from './weatherApp.module.css';
import { WeatherContext } from '../weatherProvider/WeatherProvider';

// типизация формы
interface IFormCity {
  city: string;
}

// начальное значение данных с сервера о погоде
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

// схема валидации
const schema = Yup.object().shape({
  city: Yup
    .string()
    .required('введите название города!')
});

// компонент
export default function WeatherApp() {

  // чтобы забрать данные из контекст я вызываю хук useContext и передаю в него тот контекст из которого забираю данные
  const {favorites, setFavorites} = useContext(WeatherContext)

  // все стейты компонента
  const [weatherData, setWeatherData] = useState<IWeatherData>(initialWeather);
  // const [favorites, setFavorites] = useState<IWeatherData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');


  // объект formik для работы с формами
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


  // асинхронная функция для получения данных с сервера
  const fetchWeather = async (city: string) => {
    // включение loader до загрузки
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=95abbc8a327ef422700ea93c6cee52f3`);
        // если запрос пришел с ошибкой бы отправляемся в блок catch
        if (!res.ok) {
          // 'бросаем' ошибку и преходим в блок catch
          throw new Error(res.statusText);
        }
        const data = await res.json();
        setWeatherData(data);
        // выключение loader после получения данных
        setIsLoading(false);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setIsLoading(false);
          // выключение loader после ошибки
          setError(err.message);
        }
      }
    }, 1000);

  };


  // я делаю много действий на отправке формы, поэтому вынес их в отдельный обработчик
  const submitAction = (event: FormEvent) => {
    // обращаясь к объекту event, которое создается в момент события submit в браузере, вызываем его метод .preventDefault() и убираем перезагрузку по умолчанию
    event.preventDefault();
    formik.handleSubmit();
    // убираю значения в карточки с предыдущего запроса
    setWeatherData(initialWeather);
    // очистка ошибки
    setError('');
  };

  // добавление карточки в массив
  const addCard = () => {
    setFavorites([...favorites, weatherData]);
  };

  // удаление карточки из массива через метод filter
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

        {/* два типа ошибок обрабатываются в одном компоненте и приходят при разных обстоятельствах */}

        {/* ошибка с сервера */}
        {error && <ErrorPage text={error} type='api' />}

        {/* ошибка валидации */}
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
    </div>
  );
}