import "../styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import NProgress from "nprogress";
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const handleStart = (url) => {
      setLoading(true);
      console.log(`Loading: ${url}`);
      NProgress.start();
    };
    const handleStop = () => {
      setLoading(false);
      console.log(`Loaded`);
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    <>
      <Component {...pageProps} />
      {loading ? <Loading /> : <></>}
    </>
  );
}

export default MyApp;
