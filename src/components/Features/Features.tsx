import './Features.scss';
import BrowsingIcon from '@mui/icons-material/Apps';
import DeliveryIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';

export default function Features() {
  const features = [
    {
      icon: <BrowsingIcon fontSize="large" />,
      title: 'Smooth Browsing',
      text: 'Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.'
    },
    {
      icon: <DeliveryIcon fontSize="large" />,
      title: 'Easy Delivery',
      text: 'Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.'
    },
    {
      icon: <PaymentIcon fontSize="large" />,
      title: 'Swift Payments',
      text: 'Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.'
    }
  ];

  return (
    <section className="features">
      <div className="features__header">
        <h2>
          Why try <span className="accent">VibeStrings?</span>
        </h2>
      </div>

      <div className="features__grid">
        {features.map((f, i) => (
          <div className="feature" key={i}>
            <div className="feature__icon">{f.icon}</div>
            <h3 className="feature__title">{f.title}</h3>
            <p className="feature__text">{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
