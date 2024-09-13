import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ComplaintRegistration.css';

function ComplaintRegistration() {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [complaint, setComplaint] = useState('');
  const [manualLocation, setManualLocation] = useState('');
  const [autoLocation, setAutoLocation] = useState('');
  const [locationError, setLocationError] = useState('');

  const handleLocationFetch = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setAutoLocation(`https://www.google.com/maps/place/${latitude},${longitude}/`);
        },
        (error) => {
          setLocationError('Unable to retrieve your location.');
        }
      );
    } else {
      setLocationError('Geolocation is not supported by this browser.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/complaints', {
        customerName,
        customerEmail,
        mobileNumber,
        whatsappNumber,
        complaint,
        location: manualLocation || autoLocation
      });

      if (response.status === 200) {
        alert('Complaint registered successfully');
        setCustomerName('');
        setCustomerEmail('');
        setMobileNumber('');
        setWhatsappNumber('');
        setComplaint('');
        setManualLocation('');
        setAutoLocation('');
      }
    } catch (error) {
      console.error('Error registering complaint:', error);
    }
  };

  return (
    <div className="complaint-registration">
      <h2>Register Complaint</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Customer Email ID"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Mobile Number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="WhatsApp Number"
          value={whatsappNumber}
          onChange={(e) => setWhatsappNumber(e.target.value)}
        />
        <textarea
          placeholder="Complaint"
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
          required
        />
        <div className="location-fields">
          <input
            type="text"
            placeholder="Enter Location Manually"
            value={manualLocation}
            onChange={(e) => setManualLocation(e.target.value)}
          />
          <button type="button" onClick={handleLocationFetch}>Fetch Current Location</button>
          {autoLocation && <p>Current Location: {autoLocation}</p>}
          {locationError && <p className="error">{locationError}</p>}
        </div>
        <button type="submit">Submit Complaint</button>
      </form>
    </div>
  );
}

export default ComplaintRegistration;
