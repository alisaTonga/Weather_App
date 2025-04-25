import React from "react";
import styles from "./login.module.css";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../features/auth/authAction";
import * as Yup from "yup";
import Loader from "../loader/Loader";

export interface ILoginValues {
  username: string;
  password: string;
}

const schema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isloading } = useAppSelector((store) => store.auth);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    } as ILoginValues,
    validationSchema: schema,
    onSubmit: (values: ILoginValues) => {
      dispatch(loginUser(values)).then(() => {
        navigate("/");
      });
    },
  });

  if (isloading) {
    return <Loader />;
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.description}>
        <h1>Welcome to WeatherWise</h1>
        <p className={styles.mainDescription}>
          Your personal weather companion that helps you stay informed and
          prepared, no matter the forecast. Get instant access to accurate
          weather data and personalized features.
        </p>

        <div className={styles.features}>
          <h2>What You'll Get:</h2>
          <ul>
            <li>
              <span className={styles.icon}>🌡️</span>
              <div>
                <h3>Real-Time Weather Data</h3>
                <p>
                  Get current temperature, conditions, and forecasts for any
                  location
                </p>
              </div>
            </li>
            <li>
              <span className={styles.icon}>📍</span>
              <div>
                <h3>Save Favorite Locations</h3>
                <p>
                  Keep track of weather in multiple cities that matter to you
                </p>
              </div>
            </li>
            <li>
              <span className={styles.icon}>🔄</span>
              <div>
                <h3>Auto-Updates</h3>
                <p>
                  Weather information updates automatically to keep you current
                </p>
              </div>
            </li>
            <li>
              <span className={styles.icon}>📱</span>
              <div>
                <h3>User-Friendly Interface</h3>
                <p>Clean, intuitive design that works on any device</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.loginSection}>
        <form onSubmit={formik.handleSubmit} className={styles.loginForm}>
          <h2>Sign In to Get Started</h2>
          <p className={styles.loginDescription}>
            Enter your credentials to access personalized weather information
            and saved locations.
          </p>

          <div className={styles.inputGroup}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Enter your username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.username && formik.errors.username && (
              <div className={styles.errorMessage}>
                {formik.errors.username}
              </div>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <div className={styles.errorMessage}>
                {formik.errors.password}
              </div>
            )}
          </div>

          <button type="submit" className={styles.submitButton}>
            Sign In
          </button>

          <div className={styles.demoCredentials}>
            <p>Demo Credentials:</p>
            <code>Username: emilys / Password: emilyspass</code>
          </div>
        </form>
      </div>
    </div>
  );
}
