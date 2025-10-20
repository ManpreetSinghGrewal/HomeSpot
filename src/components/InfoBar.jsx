import React from 'react';

export default function InfoBar() {
  return (
    <section className="info-bar">
      <div className="info-item">
        <i className="fas fa-phone"></i>
        <h3>PHONE NO</h3>
        <p>+91 98765-43210</p>
      </div>
      <div className="info-item highlight">
        <i className="fas fa-envelope"></i>
        <h3>EMAIL ADDRESS</h3>
        <p>contact@homespot.in</p>
      </div>
      <div className="info-item">
        <i className="fas fa-map-marker-alt"></i>
        <h3>LOCATION</h3>
        <p>Phase 8, Mohali, Punjab, India</p>
      </div>
    </section>
  );
}
