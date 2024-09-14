import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Snackbar, Alert } from '@mui/material';
import './CustomerComplainRegistration.css';

function CustomerComplaintRegistration() {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [complaint, setComplaint] = useState('');
  const [manualLocation, setManualLocation] = useState('');
  const [autoLocation, setAutoLocation] = useState('');
  const [locationError, setLocationError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [isDisabled, setDisabled] = useState(false);

  const handleLocationFetch = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setAutoLocation(`https://www.google.com/maps/place/${latitude},${longitude}/`);
          setDisabled(true);
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
        setSuccessMessage('Complaint registered successfully');
        // Clear form fields
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
      setErrorMessage('Failed to register complaint');
    }
  };

  return (
    <Container maxWidth="sm" className="complaint-registration">
      <Typography variant="h5" gutterBottom>
        Register Complaint
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Customer Email ID"
          type="email"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Mobile Number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="WhatsApp Number"
          value={whatsappNumber}
          onChange={(e) => setWhatsappNumber(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Complaint"
          multiline
          rows={2}
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
          required
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleLocationFetch}
          style={{ marginTop: 16 }}
        >
          Fetch Current Location
        </Button>
        {autoLocation && <Typography variant="body1" style={{ marginTop: 16 }}>Current Location: <a href={autoLocation} target="_blank" rel="noopener noreferrer">{autoLocation}</a></Typography>}
        {locationError && <Typography variant="body1" color="error" style={{ marginTop: 16 }}>{locationError}</Typography>}

         <TextField
          fullWidth
          disabled= {isDisabled}
          margin="normal"
          label="Enter Location Manually"
          value={manualLocation}
          onChange={(e) => setManualLocation(e.target.value)}
        />

       
        <Button
          type="submit"
          variant="contained"
          color="success"
          style={{ marginTop: 16 }}
        >
          Submit Complaint
        </Button>
      </form>
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage('')}
      >
        <Alert onClose={() => setSuccessMessage('')} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={() => setErrorMessage('')}
      >
        <Alert onClose={() => setErrorMessage('')} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default CustomerComplaintRegistration;
