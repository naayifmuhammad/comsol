import {React, useState} from 'react';
import { Card, CardContent, Typography, Grid, LinearProgress, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Select, MenuItem, FormControl, IconButton } from '@mui/material';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import PeopleIcon from '@mui/icons-material/People';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
// import NavbarTop from '../components/NavbarTop';
import ConfirmationModal from '../components/ConfirmationModal';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import '../styles/Dashboard.css'; // Keep this if you have other custom styles

const AdminDashboard = () => {

  const [selectedItems, setSelectedItems] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentComplaintId, setCurrentComplaintId] = useState(null);


  const dummyData = {
    activeComplaints: 15,
    staffCount: 12,
    pendingComplaints: 7,
    maxComplaints: 100, // Define a maximum complaint threshold for the progress bar

    complaintsList: [
      {
        id: 1,
        customer: "John Doe",
        description: "Issue with the product",
        location: "/location/1",
        assignedTo: "Staff A",
      },
      {
        id: 2,
        customer: "Jane Smith",
        description: "Delivery delay",
        location: "/location/2",
        assignedTo: "Staff B",
      },
      // Add more dummy complaints as needed
    ],
    staffList: ["Staff A", "Staff B", "Staff C"], // Dummy staff list
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
      {/* <NavbarTop /> */}
      <div className="dashboard-container">
        <Grid container spacing={3}>
          {/* Active Complaints Card */}
          <Grid item xs={12} md={4}>
            <Card className="dashboard-card" elevation={3}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <ReportProblemIcon color="error" fontSize="large" />
                  <Typography variant="h5" component="div" sx={{ ml: 1 }}>
                    Active Complaints
                  </Typography>
                </Box>
                <Typography variant="h2" color="primary">
                  {dummyData.activeComplaints}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <LinearProgress
                    variant="determinate"
                    value={calculateProgress(
                      dummyData.activeComplaints,
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

          {/* Pending Complaints Card */}
          <Grid item xs={12} md={4}>
            <Card className="dashboard-card" elevation={3}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <PendingActionsIcon color="warning" fontSize="large" />
                  <Typography variant="h5" component="div" sx={{ ml: 1 }}>
                    Pending Assignment
                  </Typography>
                </Box>
                <Typography variant="h2" color="primary">
                  {dummyData.pendingComplaints}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {/* Compare pending complaints to active complaints */}
                  <LinearProgress
                    variant="determinate"
                    value={calculateProgress(
                      dummyData.pendingComplaints,
                      dummyData.activeComplaints
                    )}
                    color="warning"
                  />
                  <Typography variant="caption" color="textSecondary">
                    Pending Complaints Progress
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Number of Staff Card */}
          <Grid item xs={12} md={4}>
            <Card className="dashboard-card" elevation={3}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <PeopleIcon color="primary" fontSize="large" />
                  <Typography variant="h5" component="div" sx={{ ml: 1 }}>
                    Number of Staff
                  </Typography>
                </Box>
                <Typography variant="h2" color="primary">
                  {dummyData.staffCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Active Complaints Table */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" component="div" gutterBottom>
            Active Complaints
          </Typography>
          <TableContainer component={Box}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Assign To</TableCell>
                  <TableCell>Action</TableCell> {/* New column for action */}
                </TableRow>
              </TableHead>
              <TableBody>
                {dummyData.complaintsList.map((complaint) => (
                  <TableRow key={complaint.id}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedItems.includes(complaint.id)}
                        onChange={(event) =>
                          handleCheckboxChange(event, complaint.id)
                        }
                      />
                    </TableCell>
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
                      <FormControl fullWidth>
                        <Select
                          value={complaint.assignedTo}
                          onChange={(event) =>
                            handleAssignChange(event, complaint.id)
                          }
                        >
                          <MenuItem value="" disabled>
                            <em>Unassigned</em> {/* Default placeholder */}
                          </MenuItem>
                          {dummyData.staffList.map((staff) => (
                            <MenuItem key={staff} value={staff}>
                              {staff}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
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

export default AdminDashboard;
