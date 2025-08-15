import "./Footer.scss";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import logo from "../../../public/images/logo.png"

type Props = {        // e.g. "/logo.svg" or "/images/logo.png"
  email?: string;           // e.g. "Enquiry@VibeStrings.com"
  location?: string;        // e.g. "San Francisco"
  year?: number;            // e.g. 2025
};

export default function Footer({
  email = "Enquiry@VibeStrings.com",
  location = "San Francisco",
  year = new Date().getFullYear(),
}: Props) {
  return (
    <footer className="footer">
      <div className="footer__inner">
        {/* Brand & contact */}
        <div className="footer__brand">
          <div className="footer__logoRow">
            <img className="footer__logo" src={logo} alt="VibeStrings" />
            <span className="footer__name">VibeStrings</span>
          </div>

          <ul className="footer__contact">
            <li>
              <MailOutlineIcon fontSize="small" />
              <a href={`mailto:${email}`} aria-label="Email">{email}</a>
            </li>
            <li>
              <PlaceOutlinedIcon fontSize="small" />
              <span>{location}</span>
            </li>
          </ul>
        </div>

        {/* Pages */}
        <nav className="footer__col">
          <h4>PAGES</h4>
          <ul>
            <li><a href="#">Store</a></li>
            <li><a href="#">Collections</a></li>
            <li><a href="#">Support</a></li>
          </ul>
        </nav>

        {/* Product */}
        <nav className="footer__col">
          <h4>PRODUCT</h4>
          <ul>
            <li><a href="#">Terms</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Copyright</a></li>
          </ul>
        </nav>

        {/* Social */}
        <div className="footer__col">
          <h4>FOLLOW US</h4>
          <div className="footer__social">
            <a href="#" aria-label="Facebook"><FacebookIcon /></a>
            <a href="#" aria-label="Twitter"><TwitterIcon /></a>
            <a href="#" aria-label="Instagram"><InstagramIcon /></a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        © {year} Copyright. VibeStrings
      </div>
    </footer>
  );
}
