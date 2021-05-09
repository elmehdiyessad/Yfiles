import  React, { useEffect } from 'react';
import Menu from './menu';
import Slider from './slider';
import Services from './services';
import Statistics from './statistics';
import Startnow from './startnow';
import Footer from './footer';
import '../../css/global.css';
import '../../css/index.css';

export default function Index() {

  useEffect(() => {
    let body = document.body
    body.classList.remove('BackgroundStyle')
  })

  return (
    <>
      <Menu />
      <Slider />
      <Services />
      <Statistics />
      <Startnow />
      <Footer />
    </>
  );
}
