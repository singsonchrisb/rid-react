import { GlobalStyle } from "./globalStyles";
import { lazy, Suspense, useEffect, useState } from "react";
import { decryptPWord, encryptPWord } from "../functions/ChrisFunctions";
// import Sidebar from "../components/Sidebar";

const Home = lazy(() => import("./Pages/Home"));
const Header = lazy(() => import("./components/Header/index"));
const Footer = lazy(() => import("./components/Footer/index"));
const ScrollToTop = lazy(() => import("./components/ScrollToTop/index"));

function App() {

  useEffect(() => {
    if (decryptPWord(sessionStorage.getItem("login")) ==='True') {
       sessionStorage.setItem("homeOpen",encryptPWord("HomeOpen"));
       sessionStorage.setItem("login",encryptPWord("False"));
       window.location.reload();
    } else {
       sessionStorage.clear();
       sessionStorage.removeItem("loginName");
       sessionStorage.setItem("homeOpen",encryptPWord("HomeOpen"));
       sessionStorage.setItem("login",encryptPWord("False"));
    }
     
  }, []);


  return (
    <>
    {/* <Sidebar/> */}
    
      <Suspense fallback={null}>
      <Header />
        <GlobalStyle />
        {/* Hi There! */}
        <ScrollToTop />
        {/* <Header /> */}
        <Home />
        <Footer />
      </Suspense>
    </>
  );
}

export default App;
