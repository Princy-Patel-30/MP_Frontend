import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import facialMassage from "../assets/facial-massage.png";
import plumber from "../assets/plumber.png";
import cleaning from "../assets/cleaning.png";
import carpenter from "../assets/carpenter.png";
import airConditioner from "../assets/air-conditioner.png";
import appliance from "../assets/appliance.png";

const categories = [
  { name: "Spa & Wellness", img: facialMassage },
  { name: "Plumbing Services", img: plumber },
  { name: "Home Cleaning", img: cleaning },
  { name: "Carpentry", img: carpenter },
  { name: "AC Repair", img: airConditioner },
  { name: "Appliance Repair", img: appliance },
];

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Welcome to Our Platform</h1>
        <p className="lead text-muted">Find trusted professionals for all your home service needs.</p>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate('/services')}
        >
          Explore Services
        </button>
      </div>
      <h2 className="text-center mb-4">Service Categories</h2>
      <div className="row">
        {categories.map((category, index) => (
          <div key={index} className="col-6 col-md-4 col-lg-2 mb-4">
            <div className="card border-0 shadow-sm h-100 text-center p-3">
              <img
                src={category.img}
                alt={category.name}
                className="rounded-circle mx-auto"
                style={{ width: '80px', height: '80px', objectFit: 'cover' }}
              />
              <h6 className="mt-2 mb-0">{category.name}</h6>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Landing;