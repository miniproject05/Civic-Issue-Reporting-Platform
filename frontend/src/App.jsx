import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/issues/";

function App() {
  const [issues, setIssues] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Roads",
    location: "",
  });

  // Fetch all issues from FastAPI backend
  const fetchIssues = async () => {
    try {
      const response = await axios.get(API_URL);
      setIssues(response.data);
    } catch (error) {
      console.error("Error fetching issues:", error);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, formData);
      setFormData({ title: "", description: "", category: "Roads", location: "" });
      fetchIssues(); // Refresh list after adding
    } catch (error) {
      console.error("Error submitting issue:", error);
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto", fontFamily: "sans-serif", padding: "0 20px" }}>
      <h2>Civic Issue Reporting Platform</h2>

      {/* Form Section */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "30px" }}>
        <input
          type="text"
          name="title"
          placeholder="Issue Title (e.g., Broken Streetlight)"
          value={formData.title}
          onChange={handleChange}
          required
          style={{ padding: "8px" }}
        />
        <textarea
          name="description"
          placeholder="Describe the issue..."
          value={formData.description}
          onChange={handleChange}
          required
          rows="3"
          style={{ padding: "8px" }}
        />
        <select name="category" value={formData.category} onChange={handleChange} style={{ padding: "8px" }}>
          <option value="Roads">Roads & Potholes</option>
          <option value="Sanitation">Sanitation & Garbage</option>
          <option value="Electricity">Electricity & Lighting</option>
          <option value="Water">Water Supply</option>
        </select>
        <input
          type="text"
          name="location"
          placeholder="Location (e.g., Kanpur)"
          value={formData.location}
          onChange={handleChange}
          style={{ padding: "8px" }}
        />
        <button type="submit" style={{ padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", cursor: "pointer" }}>
          Report Issue
        </button>
      </form>

      {/* Issues List */}
      <h3>Reported Issues</h3>
      {issues.length === 0 ? (
        <p>No issues reported yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {issues.map((issue) => (
            <li key={issue.id} style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "10px", borderRadius: "5px" }}>
              <h4 style={{ margin: "0 0 5px 0" }}>{issue.title} <span style={{ fontSize: "12px", color: "gray" }}>({issue.category})</span></h4>
              <p style={{ margin: "5px 0" }}>{issue.description}</p>
              <small>📍 {issue.location || "N/A"} | Status: <b>{issue.status}</b></small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;