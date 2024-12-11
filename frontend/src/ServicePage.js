import React, { Component } from "react";
import "./ServicePage.css"; 

class ServicePage extends Component {
  state = {
    locations: [],
  };

  componentDidMount() {
    this.fetchLocations();
  }

  fetchLocations = async () => {
    const url = "http://localhost:3000/locations";
    try {
      const response = await fetch(url);
      const data = await response.json();
      this.setState({ locations: data });
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  render() {
    const { locations } = this.state;

    return (
      <div className="container">
        {/* Navbar */}
        <nav className="navbar">
          <div className="logo">Argon</div>
          <div className="nav-buttons">
            <button className="biz-login">Biz Login</button>
            <button className="login">Login</button>
          </div>
        </nav>

     
        <header className="header">
          <h1 className="main-heading">Take care of your home needs now!</h1>
          <p className="sub-heading">
            ServicePro is your one-stop solution to troubleshoot, choose a vendor, and book a technician.
          </p>
          <div className="search-section">
            <select className="location-dropdown">
              <option>City (e.g., Bangalore, Hyderabad)</option>
              {locations.map((locationn, index) => (
                <option key={index} value={locationn.location}>
                  {locationn.location}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Search Home Appliances"
              className="search-input"
            />
            <button className="search-button">Search</button>
          </div>
        </header>

        <section className="services">
          <h2>All Services</h2>
          <p>
            The time is now for it to be okay to be great. For being a bright color. For standing out.
          </p>
          <div className="service-cards">
            {["Fridge", "Air Conditioner", "Television", "Gas Stove"].map((service, index) => (
              <div className="service-card" key={index}>
                <h3>{service}</h3>
                <p>Description of the service.</p>
              </div>
            ))}
          </div>
        </section>

        
        <section className="steps">
          <h2>Book a request in 3 simple steps</h2>
          <div className="step-cards">
            {["Provide your appliance details", "Choose your technician", "Get it fixed!"].map(
              (step, index) => (
                <div className="step-card" key={index}>
                  <h4>{step}</h4>
                  <p>Description for the step.</p>
                </div>
              )
            )}
          </div>
        </section>

        <section className="vendors">
          <h2>Featured Vendors</h2>
          <div className="vendor-cards">
            {[1, 2, 3].map((_, index) => (
              <div className="vendor-card" key={index}>
                <h3>Metro Hardware</h3>
                <p>Services: 22</p>
                <p>Rating: 8/10</p>
                <p>Reviews: 89</p>
                <a href="#details">Show more</a>
              </div>
            ))}
          </div>
        </section>

        <section className="testimonials">
          <h2>See what our happy customers have to say about us</h2>
          <div className="testimonial-cards">
            {[1, 2, 3].map((_, index) => (
              <div className="testimonial-card" key={index}>
                <p>
                  Knowledgeable and easy to work with. They made Instagram easy
                  for those of us who aren’t that savvy.
                </p>
                <strong>Peter Bres</strong> - 5 stars
              </div>
            ))}
          </div>
        </section>

        <footer className="footer">
          <div className="footer-top">
            <input
              type="email"
              placeholder="Email address"
              className="footer-input"
            />
            <button className="footer-button">Subscribe</button>
          </div>
          <div className="footer-links">
            <a href="#terms">Terms</a>
            <a href="#privacy">Privacy</a>
            <a href="#cookies">Cookies</a>
          </div>
          <div className="footer-logo">© Argon</div>
        </footer>
      </div>
    );
  }
}

export default ServicePage;
