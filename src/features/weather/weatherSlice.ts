import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IWeatherData } from "../../types/weather";
import { getWeather } from "./weatherAction";

interface IWeatherState {
    favorites: IWeatherData[];
    currentWeather: IWeatherData | null;
    isLoading: boolean;
    error: string;
}

const initialState: IWeatherState = {
    favorites: [],
    currentWeather: null,
    isLoading: false,
    error: ""
};

export const weatherSlice = createSlice({
    name: "weatherSlice",
    initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<IWeatherData>) => {
            if (!state.favorites.some(fav => fav.id === action.payload.id)) {
                state.favorites.push(action.payload);
            }
        },
        removeFavorite: (state, action: PayloadAction<number>) => {
            state.favorites = state.favorites.filter(fav => fav.id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getWeather.pending, (state) => {
                state.isLoading = true;
                state.error = "";
            })
            .addCase(getWeather.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentWeather = action.payload;
            })
            .addCase(getWeather.rejected, (state, action) => {
                state.isLoading = false;
                state.currentWeather = null;
                state.error = action.payload as string;
            });
    },
});

export const { addFavorite, removeFavorite } = weatherSlice.actions;
export default weatherSlice.reducer;