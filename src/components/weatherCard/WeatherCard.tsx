import { IWeatherData } from '../../types/weather';
import Loader from '../loader/Loader';
import MyButton from '../myButton/MyButton';
import style from './weatherCard.module.css';

interface IWeatherCardProps {
  image?: string;
  id: number;
  city: string;
  temp: number;
  add?: () => void;
  del?: (id: number) => void;
  favorites: IWeatherData[];
  isNewCard?: boolean;
  isLoading?: boolean;
}

export default function WeatherCard({ id, city, image, del, temp, add, favorites, isNewCard = true, isLoading}: IWeatherCardProps) {
  if (isLoading) {
    return <Loader/>
  }
  return (
    <div key={id} className={style.card}>
      <div className={style.weatherDataWrapper}>
        <div>
          <h2>{temp}°</h2>
          <h5>{city}</h5>
        </div>
        <div className={style.imgSection}>
          <div>
            <img className={style.img} src={image} alt='city' />
            <img className={style.img} src={image} alt='city' />
            <img className={style.img} src={image} alt='city' />
          </div>
        </div>
      </div>
      <div className={style.buttonWrapper}>
        {isNewCard && <MyButton disabled={favorites.some(favorite => favorite.id === id) ? true : false} onClick={add} name='Save' />}
        <MyButton onClick={() => del && del(id)} name='Delete' />

      </div>
    </div>
  );
}

