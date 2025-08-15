import './BrandsPage.scss';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
// import { ALL_BRANDS } from '../queries/brands';
import BrandCard from '../components/BrandCard';
import { ALL_BRANDS } from '../queries/brand';
import CircularProgress from '@mui/material/CircularProgress';
import Hero from '../components/Hero/Hero';
import heroimage from "../../public/images/hero.png"
import Features from '../components/Features/Features';
import DownloadCTA from '../components/Download/Download';
import Footer from '../components/Footer/Footer';

export default function BrandsPage() {
  const nav = useNavigate();
  const { data, loading, error } = useQuery(ALL_BRANDS);
  const brands = data?.findAllBrands ?? [];
  console.log(brands,"brands")

  return (
    <>
    <section>
    <Hero imageSrc={heroimage} /> 
    </section>
    <section className="brands">
      <header className="brands-header">
        <h2>Featuring the <span className="accent">Best Brands</span></h2>
        <p>Select your preferred brand and explore our exquisite collection.</p>
      </header>

      {loading && <div className="state"><CircularProgress size={40} /></div>}
      {error && <div className="state error">{error.message}</div>}

      {!loading && !error && (
        <div className="brands-grid">
          {brands.map((b: any) => (
            <BrandCard
              key={b.id}
              name={b.name}
              onClick={() => nav(`/brands/${b.id}`)}
            />
          ))}
        </div>
      )}
    </section>
    <section>
        <Features/>
    </section>
    <section>
        <DownloadCTA/>
    </section>
    <section>
        <Footer/>
    </section>
    </>
  );
}
