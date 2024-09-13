import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ViewComplaints.css';

function ViewComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/complaints');
        setComplaints(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch complaints.');
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="view-complaints">
      <h2>Complaints</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer Name</th>
            <th>Customer Email</th>
            <th>Mobile Number</th>
            <th>WhatsApp Number</th>
            <th>Complaint</th>
            <th>Location</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint.id}>
              <td>{complaint.id}</td>
              <td>{complaint.customer_name}</td>
              <td>{complaint.customer_email}</td>
              <td>{complaint.mobile_number}</td>
              <td>{complaint.whatsapp_number}</td>
              <td>{complaint.complaint}</td>
              <td><a href={complaint.location} target="_blank" rel="noopener noreferrer">View Location</a></td>
              <td>{new Date(complaint.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewComplaints;
