import "./Hero.scss";
import logo from "../../../public/images/logo.png"

type Props = {
  imageSrc?: string;   // default uses a public image
};

export default function Hero({ imageSrc}: Props) {
  return (
    <section className="hero">
    {/* Left: logo + copy */}
    <div className="hero__text">
      <div className="hero__brand">
        <img src={logo} alt="VibeStrings logo" />
      </div>
  
      <h1 className="hero__headline">
        Browse top quality <span className="accent">Guitars</span> online
      </h1>
  
      <p className="hero__sub">
        Explore 50k+ latest collections of branded guitars online with VibeStrings.
      </p>
    </div>
  
    {/* Right: big image */}
    <div className="hero__media">
      <img src={imageSrc} alt="Guitar and amps" />
      {/* optional bottom tab: */}
      {/* <div className="hero__tab" /> */}
    </div>
  </section>
  
  );
}
