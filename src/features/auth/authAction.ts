import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ILoginValues } from "../../components/login/Login";
import { IUserData } from "./types/authType";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data: ILoginValues, thunkAPI) => {
    try {
      // For demo purposes, we'll simulate a successful login with the demo credentials
      if (data.username === "emilys" && data.password === "emilyspass") {
        const mockUserData: IUserData = {
          id: 1,
          username: "emilys",
          email: "emily@example.com",
          firstName: "Emily",
          lastName: "Smith",
          token: "mock-token-123",
        };
        // Store token in localStorage
        localStorage.setItem("userToken", mockUserData.token);
        return mockUserData;
      }
      throw new Error("Invalid credentials");
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
