import "@/styles/globals.css";
import "@/styles/styles.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../redux/store";
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
