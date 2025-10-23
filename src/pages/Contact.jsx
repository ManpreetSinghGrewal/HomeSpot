import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Store contact message in localStorage (simulating form submission)
    const contactMessages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    const newMessage = {
      id: Date.now(),
      ...formData,
      timestamp: new Date().toISOString()
    };
    
    contactMessages.push(newMessage);
    localStorage.setItem('contactMessages', JSON.stringify(contactMessages));
    
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Address',
      details: 'Phase 8, Mohali, Punjab, India',
      link: '#'
    },
    {
      icon: 'fas fa-phone',
      title: 'Phone',
      details: '+91 98765-43210',
      link: 'tel:+919876543210'
    },
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      details: 'contact@homespot.in',
      link: 'mailto:contact@homespot.in'
    },
    {
      icon: 'fas fa-clock',
      title: 'Business Hours',
      details: 'Mon - Fri: 9:00 AM - 6:00 PM',
      link: '#'
    }
  ];

  return (
    <>
      <Header />
      <main>
        <section className="page-hero" style={{padding:'60px 20px',textAlign:'center',color:'#edf2f4',background:'linear-gradient(90deg, #2b2d42, #4a4e69)'}}>
          <h1>Contact Us</h1>
          <p style={{fontSize:'1.2rem',marginTop:'1rem'}}>Get in touch with our team</p>
        </section>

        <section className="contact-section" style={{padding:'80px 0'}}>
          <div className="container">
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'60px',alignItems:'start'}}>
              {/* Contact Information */}
              <div className="contact-info">
                <h2 style={{fontSize:'2rem',marginBottom:'30px',color:'#2b2d42'}}>Get in Touch</h2>
                <p style={{fontSize:'1.1rem',marginBottom:'40px',color:'#666',lineHeight:'1.6'}}>
                  Have questions about our services or need help finding your perfect rental home? 
                  Our team is here to assist you every step of the way.
                </p>
                
                <div className="contact-details">
                  {contactInfo.map((info, index) => (
                    <div key={index} style={{
                      display:'flex',
                      alignItems:'center',
                      marginBottom:'25px',
                      padding:'20px',
                      background:'#f8f9fa',
                      borderRadius:'8px',
                      transition:'transform 0.3s ease'
                    }}>
                      <div style={{
                        width:'50px',
                        height:'50px',
                        background:'var(--primary-color)',
                        borderRadius:'50%',
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'center',
                        marginRight:'20px',
                        color:'#fff',
                        fontSize:'1.2rem'
                      }}>
                        <i className={info.icon}></i>
                      </div>
                      <div>
                        <h4 style={{fontSize:'1.1rem',marginBottom:'5px',color:'#2b2d42'}}>{info.title}</h4>
                        <a href={info.link} style={{
                          color:'#666',
                          textDecoration:'none',
                          fontSize:'1rem'
                        }}>
                          {info.details}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Form */}
              <div className="contact-form">
                <h2 style={{fontSize:'2rem',marginBottom:'30px',color:'#2b2d42'}}>Send us a Message</h2>
                <form onSubmit={handleSubmit} style={{
                  background:'#fff',
                  padding:'40px',
                  borderRadius:'12px',
                  boxShadow:'0 8px 25px rgba(0,0,0,0.1)'
                }}>
                  <div style={{marginBottom:'25px'}}>
                    <label style={{
                      display:'block',
                      marginBottom:'8px',
                      fontWeight:'600',
                      color:'#2b2d42'
                    }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      style={{
                        width:'100%',
                        padding:'12px 15px',
                        border:'2px solid #e0e0e0',
                        borderRadius:'6px',
                        fontSize:'1rem',
                        transition:'border-color 0.3s ease'
                      }}
                    />
                  </div>

                  <div style={{marginBottom:'25px'}}>
                    <label style={{
                      display:'block',
                      marginBottom:'8px',
                      fontWeight:'600',
                      color:'#2b2d42'
                    }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{
                        width:'100%',
                        padding:'12px 15px',
                        border:'2px solid #e0e0e0',
                        borderRadius:'6px',
                        fontSize:'1rem',
                        transition:'border-color 0.3s ease'
                      }}
                    />
                  </div>

                  <div style={{marginBottom:'25px'}}>
                    <label style={{
                      display:'block',
                      marginBottom:'8px',
                      fontWeight:'600',
                      color:'#2b2d42'
                    }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      style={{
                        width:'100%',
                        padding:'12px 15px',
                        border:'2px solid #e0e0e0',
                        borderRadius:'6px',
                        fontSize:'1rem',
                        transition:'border-color 0.3s ease'
                      }}
                    />
                  </div>

                  <div style={{marginBottom:'25px'}}>
                    <label style={{
                      display:'block',
                      marginBottom:'8px',
                      fontWeight:'600',
                      color:'#2b2d42'
                    }}>
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      style={{
                        width:'100%',
                        padding:'12px 15px',
                        border:'2px solid #e0e0e0',
                        borderRadius:'6px',
                        fontSize:'1rem',
                        transition:'border-color 0.3s ease'
                      }}
                    />
                  </div>

                  <div style={{marginBottom:'30px'}}>
                    <label style={{
                      display:'block',
                      marginBottom:'8px',
                      fontWeight:'600',
                      color:'#2b2d42'
                    }}>
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      style={{
                        width:'100%',
                        padding:'12px 15px',
                        border:'2px solid #e0e0e0',
                        borderRadius:'6px',
                        fontSize:'1rem',
                        resize:'vertical',
                        transition:'border-color 0.3s ease'
                      }}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    style={{
                      width:'100%',
                      padding:'15px 30px',
                      background:'var(--primary-color)',
                      color:'#fff',
                      border:'none',
                      borderRadius:'8px',
                      fontSize:'1.1rem',
                      fontWeight:'600',
                      cursor:'pointer',
                      transition:'background 0.3s ease, transform 0.2s ease'
                    }}
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
