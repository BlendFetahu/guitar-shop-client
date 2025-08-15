import "./DownloadCTA.scss";
import gitar1 from "../../../public/images/gitar1.png"
import gitar2 from "../../../public/images/gitar2.png"
import googleplay from "../../../public/images/Mobile_ google_play_badge.png"
import appstore from "../../../public/images/Mobile_app_store_badge1.png"



export default function DownloadCTA() {
  return (
    <section className="dl">
      {/* Left copy */}
      <div className="dl__text">
        <h2 className="dl__headline">
          Browse and buy your <span className="accent">favorite guitars</span> with
          <br /> VibeStrings.
        </h2>

        <div className="dl__badges">
          {/* link these to your real store pages */}
          <a className="badge" href="#" aria-label="Get it on Google Play">
            <img src={googleplay} alt="" />
          </a>
          <a className="badge" href="#" aria-label="Download on the App Store">
            <img src={appstore} alt="" />
          </a>
        </div>
      </div>

      {/* Right visuals */}
      <div className="dl__art">
        <div className="dl__orb" aria-hidden />
        <img className="dl__phone dl__phone--left"  src={gitar1}  alt="App feed screen" />
        <img className="dl__phone dl__phone--right" src={gitar2} alt="Product details screen" />
      </div>
    </section>
  );
}
