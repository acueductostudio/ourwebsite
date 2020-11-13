import { useState, useEffect, useRef } from "react";
import Router from "next/router";
import { withRouter } from "next/router";
import { ThemeProvider } from "styled-components";
import LoadingBar from "react-top-loading-bar";
import Layout from "components/layout/Layout";
import theme from "styles/theme";
import Cookies from "js-cookie/dist/js.cookie";
import delayForLoading from "utils/delayForLoading.ts";
import en from "public/locales/en/common.json";
import es from "public/locales/es/common.json";
import { hotjar } from "react-hotjar";
import TagManager from "react-gtm-module";
import { LangProvider } from "utils/LangContext";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

function App(props) {
  const [locale, setLocale] = useState(
    props.router.route.includes("/en") ? en : es
  );
  const [hasToConsent, setHasToConsent] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const LoadingBarRef = useRef(null);

  useEffect(() => {
    // Disable scroll
    const targetElement = document.querySelector("#dum"); //dummy
    disableBodyScroll(targetElement);

    // Load Animation
    delayForLoading(1500).then(() => {
      const bordered = document.getElementById("bordered");
      const logo = document.getElementById("logo");
      const revealer = document.getElementById("revealer");
      if (bordered) {
        setTimeout(() => {
          // Transition out
          bordered.classList.add("hidden");
          logo.style.opacity = "0";
          bordered.style.transform = "scale(1)";
          bordered.style.borderWidth = "2px";

          setTimeout(() => {
            revealer.style.opacity = "0";
            revealer.style.pointerEvents = "none";
            setHasLoaded(true);
          }, 500);

          setTimeout(() => {
            // Remove transition items from DOM
            bordered.remove();
            revealer.remove();
            logo.remove();
          }, 3000);
        }, 500);
      }
    });
    // router event listeners for loadingBar
    Router.events.on("routeChangeStart", handleRouteStart);
    Router.events.on("routeChangeComplete", handleRouteComplete);
    Router.events.on("routeChangeError", handleRouteError);
    // init HotJar
    hotjar.initialize(1494703, 6);
    TagManager.initialize({
      gtmId: "GTM-NQHHFWF",
    });

    return () => {
      // remove loadingBar event listeners
      Router.events.off("routeChangeStart", handleRouteStart);
      Router.events.off("routeChangeComplete", handleRouteComplete);
      Router.events.off("routeChangeError", handleRouteError);
    };
  }, []);

  useEffect(() => {
    const targetElement = document.querySelector("#dum"); //dummy
    hasLoaded &&
      (console.log("Page hasLoaded"), enableBodyScroll(targetElement));
  }),
    [hasLoaded];

  const { Component, pageProps } = props;

  const toggleLang = (lang) => {
    let language = lang === "en" ? en : es;
    Cookies.set("chosenLang", lang);
    setLocale(language);
  };

  const handleRouteComplete = (url) => {
    setTimeout(function () {
      LoadingBarRef.current.complete();
    }, 300);
  };

  const handleRouteStart = (url) => {
    LoadingBarRef.current.continuousStart();
  };

  const handleRouteError = (err, url) => {
    setTimeout(function () {
      if (err.cancelled) {
        // console.log(`${err} on route to ${url}`);
      }
      LoadingBarRef.current.complete();
    }, 300);
  };

  const checkForConsent = () => {
    // Check if cookie message has been closed before
    var _C = Cookies.get("showCookieMessage");
    if (_C === undefined) {
      setHasToConsent(true);
    } else if (_C === "false") {
      setHasToConsent(false);
    }
  };

  const consentToCookies = () => {
    Cookies.set("showCookieMessage", "false");
    setHasToConsent(false);
  };
  return (
    <ThemeProvider theme={theme}>
      <LangProvider value={locale}>
        <LoadingBar
          ref={LoadingBarRef}
          height={3}
          color={theme.colors.accent}
          className="TopBar"
        />
        <Layout
          locale={locale}
          checkForConsent={checkForConsent}
          consentToCookies={consentToCookies}
          hasToConsent={hasToConsent}
          hasLoaded={hasLoaded}
          toggleLang={toggleLang}
        >
          <Component locale={locale} {...pageProps} lang={locale.lang} />
        </Layout>
      </LangProvider>
    </ThemeProvider>
  );
}

export default withRouter(App);
