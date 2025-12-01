import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './FAQ.css';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I search for rental properties?",
      answer: "You can search for properties using our advanced search filters. Simply enter your preferred location, budget range, property type, and other preferences. Our system will show you the most relevant matches."
    },
    {
      question: "What areas in Punjab do you cover?",
      answer: "We cover all major cities in Punjab including Ludhiana, Amritsar, Jalandhar, Mohali, Patiala, Bathinda, and many more. Our network extends across the entire state."
    },
    {
      question: "How much does it cost to use HomeSpot?",
      answer: "HomeSpot is completely free for tenants to search and browse properties. We only charge a small commission to property owners when a successful rental agreement is signed."
    },
    {
      question: "Can I schedule property visits?",
      answer: "Yes! Once you find a property you're interested in, you can contact the property owner directly through our platform to schedule a visit at a convenient time."
    },
    {
      question: "What documents do I need for renting?",
      answer: "Typically, you'll need identity proof (Aadhaar card, PAN card), address proof, employment letter, salary slips, and bank statements. The exact requirements may vary by property owner."
    },
    {
      question: "How do I contact property owners?",
      answer: "You can contact property owners directly through our messaging system. Simply click on the 'Contact Owner' button on any property listing to start a conversation."
    },
    {
      question: "Is my personal information secure?",
      answer: "Absolutely! We take data security very seriously. All your personal information is encrypted and stored securely. We never share your details with third parties without your consent."
    },
    {
      question: "Can I save properties for later viewing?",
      answer: "Yes! You can add properties to your favorites list by clicking the star icon. This allows you to easily access them later and compare different options."
    },
    {
      question: "What if I have issues with my rental agreement?",
      answer: "We provide legal support and guidance for rental agreements. Our team can help you understand your rights and responsibilities, and assist with dispute resolution if needed."
    },
    {
      question: "How do I list my property on HomeSpot?",
      answer: "Property owners can easily list their properties by creating an account and filling out our property listing form. We'll help you create an attractive listing with photos and detailed information."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Header />
      <main>
        <section className="faq-hero">
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to common questions about our services</p>
        </section>

        <section className="faq-section">
          <div className="container">
            <div className="faq-container">
              {faqs.map((faq, index) => (
                <div key={index} className="faq-item">
                  <button className="faq-question" onClick={() => toggleFAQ(index)} aria-expanded={openIndex === index}>
                    <span>{faq.question}</span>
                    <i className={`fas fa-chevron-${openIndex === index ? 'up' : 'down'}`}></i>
                  </button>
                  {openIndex === index && (
                    <div className="faq-answer">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-cta">
          <div className="container">
            <h2>Still have questions?</h2>
            <p>Our support team is here to help you 24/7</p>
            <Link to="/contact" className="cta-btn">
              Contact Support
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
