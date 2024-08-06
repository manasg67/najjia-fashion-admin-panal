// pages/_app.js

import "@/styles/globals.css";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";

function MyApp({ Component, }) {
  return (
    <main >
      <Header />
      <Component />
      <Footer />
    </main>
  );
}

export default MyApp;
