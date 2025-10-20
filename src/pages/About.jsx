import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function About() {
  return (
    <>
      <Header />
      <main>
        <section className="page-hero" style={{padding:'60px 20px',textAlign:'center',color:'#edf2f4',background:'linear-gradient(90deg, #2b2d42, #4a4e69)'}}>
          <h1>About HomeSpot</h1>
        </section>
        <section className="our-story" style={{padding:'80px 0'}}>
          <div className="container" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'50px',alignItems:'center'}}>
            <div className="story-image">
              <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2232&auto=format&fit=crop" alt="A team of professionals collaborating in an office" style={{width:'100%',borderRadius:'8px',boxShadow:'0 10px 30px rgba(0,0,0,0.1)'}} />
            </div>
            <div className="story-content">
              <h3 style={{fontSize:'2rem',marginBottom:'20px',color:'#2b2d42'}}>Our Mission: Simplifying Your Search for Home in Punjab</h3>
              <p style={{marginBottom:'15px',color:'#555'}}>HomeSpot was founded in Punjab, India, with a simple principle: finding a rental home should be an exciting and stress-free experience. We understand the unique needs of the Punjabi community and are committed to providing the best rental properties across Ludhiana, Amritsar, Jalandhar, and Mohali.</p>
              <p style={{marginBottom:'15px',color:'#555'}}>Our mission is to connect renters with their perfect homes through a transparent, user-friendly platform. We leverage technology to provide high-quality listings, virtual tours, and a direct line of communication between renters and property owners, making the entire journey seamless and secure across Punjab.</p>
            </div>
          </div>
        </section>
        <section className="our-values" style={{padding:'80px 0',background:'#f8f9fa'}}>
          <div className="container">
            <h2 style={{fontSize:'2.5rem',marginBottom:'50px',color:'#2b2d42',textAlign:'center'}}>Why Choose Us?</h2>
            <div className="values-grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))',gap:'30px',textAlign:'center'}}>
              <div className="value-item">
                <i className="fas fa-check-circle" style={{fontSize:'2.5rem',marginBottom:'15px',color:'#fff',background:'linear-gradient(45deg, #d90429, #ef233c)',width:'70px',height:'70px',lineHeight:'70px',borderRadius:'50%'}}></i>
                <h3 style={{fontSize:'1.3rem',marginBottom:'10px',color:'#2b2d42'}}>Verified Listings</h3>
                <p style={{color:'#666'}}>Every property is carefully vetted by our team to ensure quality and accuracy.</p>
              </div>
              <div className="value-item">
                <i className="fas fa-user-shield" style={{fontSize:'2.5rem',marginBottom:'15px',color:'#fff',background:'linear-gradient(45deg, #d90429, #ef233c)',width:'70px',height:'70px',lineHeight:'70px',borderRadius:'50%'}}></i>
                <h3 style={{fontSize:'1.3rem',marginBottom:'10px',color:'#2b2d42'}}>Unmatched Security</h3>
                <p style={{color:'#666'}}>We prioritize your safety with secure messaging, payments, and data protection.</p>
              </div>
              <div className="value-item">
                <i className="fas fa-headset" style={{fontSize:'2.5rem',marginBottom:'15px',color:'#fff',background:'linear-gradient(45deg, #d90429, #ef233c)',width:'70px',height:'70px',lineHeight:'70px',borderRadius:'50%'}}></i>
                <h3 style={{fontSize:'1.3rem',marginBottom:'10px',color:'#2b2d42'}}>24/7 Support</h3>
                <p style={{color:'#666'}}>Our dedicated support team is always available to assist you with any questions.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="team-section" style={{padding:'80px 0'}}>
          <div className="container">
            <h2 style={{fontSize:'2.5rem',marginBottom:'50px',color:'#2b2d42',textAlign:'center'}}>Meet Our Team</h2>
            <div className="team-grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(250px, 1fr))',gap:'30px'}}>
              <div className="team-card" style={{background:'#fff',border:'1px solid #eee',borderRadius:'8px',padding:'30px 20px',textAlign:'center'}}>
                <h3 style={{fontSize:'1.2rem',color:'#333'}}>Mannat Dhiman</h3>
                <p className="role" style={{fontSize:'0.9rem',fontWeight:'500',marginBottom:'15px',background:'linear-gradient(45deg, #d90429, #ef233c)',WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent'}}>Lead Property Agent</p>
              </div>
              <div className="team-card" style={{background:'#fff',border:'1px solid #eee',borderRadius:'8px',padding:'30px 20px',textAlign:'center'}}>
                <h3 style={{fontSize:'1.2rem',color:'#333'}}>Manprabhnoor Kaur</h3>
                <p className="role" style={{fontSize:'0.9rem',fontWeight:'500',marginBottom:'15px',background:'linear-gradient(45deg, #d90429, #ef233c)',WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent'}}>Marketing Director</p>
              </div>
              <div className="team-card" style={{background:'#fff',border:'1px solid #eee',borderRadius:'8px',padding:'30px 20px',textAlign:'center'}}>
                <h3 style={{fontSize:'1.2rem',color:'#333'}}>Manpreet Singh</h3>
                <p className="role" style={{fontSize:'0.9rem',fontWeight:'500',marginBottom:'15px',background:'linear-gradient(45deg, #d90429, #ef233c)',WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent'}}>Client Relations</p>
              </div>
              <div className="team-card" style={{background:'#fff',border:'1px solid #eee',borderRadius:'8px',padding:'30px 20px',textAlign:'center'}}>
                <h3 style={{fontSize:'1.2rem',color:'#333'}}>Manraj Singh</h3>
                <p className="role" style={{fontSize:'0.9rem',fontWeight:'500',marginBottom:'15px',background:'linear-gradient(45deg, #d90429, #ef233c)',WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent'}}>Lead Developer</p>
              </div>
            </div>
          </div>
        </section>
        <section className="back-to-home" style={{padding:'0 0 80px',textAlign:'center'}}>
          <div className="container">
            <Link to="/" className="home-button" style={{display:'inline-block',padding:'15px 35px',fontSize:'1rem',fontWeight:'600',color:'#edf2f4',background:'#2b2d42',borderRadius:'5px',transition:'background 0.3s, transform 0.2s'}}>
              <i className="fas fa-arrow-left" style={{marginRight:'8px'}}></i> Back to Homepage
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
