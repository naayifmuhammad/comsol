import {React, useState} from 'react';
import { Card, CardContent, Typography, Grid, LinearProgress, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Select, MenuItem, FormControl, IconButton } from '@mui/material';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import NavbarTop from '../components/NavbarTop';
import ConfirmationModal from '../components/ConfirmationModal';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import '../styles/Dashboard.css'; // Keep this if you have other custom styles

const StaffDashboard = () => {

  const [selectedItems, setSelectedItems] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentComplaintId, setCurrentComplaintId] = useState(null);


  const dummyData = {
    assignedComplaints: 10,
    maxComplaints: 100, // Define a maximum complaint threshold for the progress bar

    complaintsList: [
      {
        id: 1,
        customer: "John Doe",
        description: "Issue with the product",
        location: "/location/1",
      },
      {
        id: 2,
        customer: "Jane Smith",
        description: "Delivery delay",
        location: "/location/2",
      },
      // Add more dummy complaints as needed
    ],
  };

  const calculateProgress = (value, max) => (value / max) * 100;

  const handleCheckboxChange = (event, id) => {
    setSelectedItems(prevState => {
      if (event.target.checked) {
        return [...prevState, id];
      } else {
        return prevState.filter(itemId => itemId !== id);
      }
    });
  };

  const handleAssignChange = (event, id) => {
    // Handle assignment change logic here
    console.log(`Assigning complaint ${id} to ${event.target.value}`);
  };

  const handleConfirmClick = (id) => {
    setCurrentComplaintId(id);
    setOpenModal(true);
  };

  const handleConfirm = () => {
    // Handle confirmation logic here, e.g., updating backend
    console.log(`Confirmed assignment for complaint ${currentComplaintId}`);
  };

  return (
    <>
      <NavbarTop />
      <div className="dashboard-container">
        <Grid container spacing={3}>
          {/* Active Complaints Card */}
          <Grid item xs={12} md={4}>
            <Card className="dashboard-card" elevation={3}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <ReportProblemIcon color="error" fontSize="large" />
                  <Typography variant="h5" component="div" sx={{ ml: 1 }}>
                    Assigned Complaints
                  </Typography>
                </Box>
                <Typography variant="h2" color="primary">
                  {dummyData.assignedComplaints}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <LinearProgress
                    variant="determinate"
                    value={calculateProgress(
                      dummyData.assignedComplaints,
                      dummyData.maxComplaints
                    )}
                    color="error"
                  />
                  <Typography variant="caption" color="textSecondary">
                    Complaints Progress
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Active Complaints Table */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" component="div" gutterBottom>
            Assigned Complaints
          </Typography>
          <TableContainer component={Box}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Customer</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Action</TableCell> {/* New column for action */}
                </TableRow>
              </TableHead>
              <TableBody>
                {dummyData.complaintsList.map((complaint) => (
                  <TableRow key={complaint.id}>
                    <TableCell>{complaint.customer}</TableCell>
                    <TableCell>{complaint.description}</TableCell>
                    <TableCell>
                      <a
                        href={complaint.location}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Location
                      </a>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="success"
                        onClick={() => handleConfirmClick(complaint.id)}
                        aria-label="confirm"
                      >
                        <CheckCircleIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Confirmation Modal */}
        <ConfirmationModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onConfirm={handleConfirm}
        />
      </div>
    </>
  );
};

export default StaffDashboard;
