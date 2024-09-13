const db = require('../db/db');

exports.registerComplaint = (req, res) => {
  const { customerName, customerEmail, mobileNumber, whatsappNumber, complaint, location } = req.body;

  const sql = 'INSERT INTO complaints (customer_name, customer_email, mobile_number, whatsapp_number, complaint, location) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [customerName, customerEmail, mobileNumber, whatsappNumber, complaint, location], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send({ message: 'Complaint registered successfully' });
  });
};


exports.getAllComplaints = (req, res) => {
  const sql = 'SELECT * FROM complaints ORDER BY created_at DESC';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(results);
  });
};
