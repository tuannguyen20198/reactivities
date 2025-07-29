import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";

type Props = {};

export default function ActivityForm({}: Props) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    city: "",
    venue: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        Create activity
      </Typography>
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        gap={3}
        onSubmit={handleSubmit}
      >
        <TextField
          name="title"
          label="Title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <TextField
          name="description"
          label="Description"
          multiline
          rows={3}
          value={formData.description}
          onChange={handleInputChange}
        />
        <TextField
          name="category"
          label="Category"
          value={formData.category}
          onChange={handleInputChange}
        />
        <TextField
          name="date"
          label="Date"
          type="date"
          value={formData.date}
          onChange={handleInputChange}
        />
        <TextField
          name="city"
          label="City"
          value={formData.city}
          onChange={handleInputChange}
        />
        <TextField
          name="venue"
          label="Venue"
          value={formData.venue}
          onChange={handleInputChange}
        />
        <Box display="flex" justifyContent="end" gap={3}>
          <Button color="inherit">Cancel</Button>
          <Button type="submit" color="success" variant="contained">
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
