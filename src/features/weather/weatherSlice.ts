import { createSlice } from "@reduxjs/toolkit";
import { IWeatherData } from "../../types/weather";
import { getWeather } from "./weatherAction";
import { IWeatherCardProps } from "../../components/weatherCard/WeatherCard";

interface IWeatherState {
    weathers: IWeatherCardProps[];
    isLoading: boolean;
    error: string;
}

const initialState: IWeatherState = {
    weathers: [],
    isLoading: false,
    error: '',
};

export const weatherSlice = createSlice({
    name: "weatherSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    builder
        .addCase(getWeather.pending, (state) => {
        state.isLoading = true;
        })
        .addCase(getWeather.fulfilled, (state, action) => {
        state.isLoading = false;
        state.weathers = action.payload;
        })
        .addCase(getWeather.rejected, (state, action) => {
        state.isLoading = false;
        state.weathers = [];
        state.error = action.payload as string;
        });
    },
});

export default weatherSlice;
//export const {} = weatherSlice.actions;
