import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Services() {
  const services = [
    {
      icon: 'fas fa-search',
      title: 'Property Search',
      description: 'Find your perfect rental home with our advanced search filters and location-based recommendations.'
    },
    {
      icon: 'fas fa-eye',
      title: 'Virtual Tours',
      description: 'Take 360° virtual tours of properties from the comfort of your home before scheduling visits.'
    },
    {
      icon: 'fas fa-handshake',
      title: 'Property Management',
      description: 'Comprehensive property management services for landlords including tenant screening and maintenance.'
    },
    {
      icon: 'fas fa-calculator',
      title: 'Rent Calculator',
      description: 'Get accurate rent estimates and budget planning tools to make informed decisions.'
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Legal Support',
      description: 'Expert legal assistance for rental agreements, documentation, and dispute resolution.'
    },
    {
      icon: 'fas fa-headset',
      title: '24/7 Support',
      description: 'Round-the-clock customer support to help you with any queries or concerns.'
    }
  ];

  return (
    <>
      <Header />
      <main>
        <section className="page-hero" style={{padding:'60px 20px',textAlign:'center',color:'#edf2f4',background:'linear-gradient(90deg, #2b2d42, #4a4e69)'}}>
          <h1>Our Services</h1>
          <p style={{fontSize:'1.2rem',marginTop:'1rem'}}>Comprehensive rental solutions for Punjab</p>
        </section>

        <section className="services-section" style={{padding:'80px 0'}}>
          <div className="container">
            <div className="services-grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(350px, 1fr))',gap:'40px'}}>
              {services.map((service, index) => (
                <div key={index} className="service-card" style={{
                  background:'#fff',
                  padding:'40px 30px',
                  borderRadius:'12px',
                  boxShadow:'0 8px 25px rgba(0,0,0,0.1)',
                  textAlign:'center',
                  transition:'transform 0.3s ease, box-shadow 0.3s ease',
                  border:'1px solid #f0f0f0'
                }}>
                  <div style={{
                    width:'80px',
                    height:'80px',
                    background:'linear-gradient(45deg, #d90429, #ef233c)',
                    borderRadius:'50%',
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                    margin:'0 auto 25px',
                    color:'#fff',
                    fontSize:'2rem'
                  }}>
                    <i className={service.icon}></i>
                  </div>
                  <h3 style={{fontSize:'1.4rem',marginBottom:'15px',color:'#2b2d42'}}>{service.title}</h3>
                  <p style={{color:'#666',lineHeight:'1.6'}}>{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-section" style={{padding:'80px 0',background:'#f8f9fa'}}>
          <div className="container" style={{textAlign:'center'}}>
            <h2 style={{fontSize:'2.5rem',marginBottom:'20px',color:'#2b2d42'}}>Ready to Get Started?</h2>
            <p style={{fontSize:'1.1rem',marginBottom:'30px',color:'#666'}}>Contact us today to learn more about our services</p>
            <div style={{display:'flex',gap:'20px',justifyContent:'center',flexWrap:'wrap'}}>
              <Link to="/contact" style={{
                display:'inline-block',
                padding:'15px 35px',
                fontSize:'1rem',
                fontWeight:'600',
                color:'#fff',
                background:'var(--primary-color)',
                borderRadius:'8px',
                textDecoration:'none',
                transition:'background 0.3s, transform 0.2s'
              }}>
                Contact Us
              </Link>
              <Link to="/" style={{
                display:'inline-block',
                padding:'15px 35px',
                fontSize:'1rem',
                fontWeight:'600',
                color:'var(--primary-color)',
                background:'transparent',
                border:'2px solid var(--primary-color)',
                borderRadius:'8px',
                textDecoration:'none',
                transition:'all 0.3s'
              }}>
                Browse Properties
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
