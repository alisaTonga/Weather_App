    import { createContext, ReactNode, useState } from 'react';
    import { IWeatherData } from '../../types/weather';


    // типизация данных для контекст
    interface IWeatherContext {
    favorites: IWeatherData[];
    setFavorites: React.Dispatch<React.SetStateAction<IWeatherData[]>>;
    }

    // типизация для props обертки Provider
    interface IWeatherProps {
    // типизация для оборачиваемых компонентов
    children: ReactNode;
    }

    // начальное значения для данных в контекст
    const initialContext: IWeatherContext = {
    favorites: [],
    setFavorites: () => { }
    };


    // этот специальный объект контекст будет использован в компоненте-обертке ниже
    // создается с помощью встроенного в react метода createContext()
    export const WeatherContext = createContext(initialContext);

    // сам компонент обертка
    export default function WeatherProvider({ children }: IWeatherProps) {

    // эти данные я хочу сделать доступными во всех компонентах приложения
    // это обычный setState, но данные из него мы передаем через values всему приложению

    const [favorites, setFavorites] = useState<IWeatherData[]>([]);


    return (
        // передаем данные в контекст в объекте
        <WeatherContext.Provider value={{ setFavorites, favorites }}>
        {/* на место children придут компоненты, которые мы обернем в provider */}
        {children}
        </WeatherContext.Provider>
    );
    }