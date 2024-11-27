import { useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import "../RegisterForm/RegisterForm.css";
import LoadingIndicator from "../../components/LoadingIndicator";

function RegisterForm({ route }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordrepeat, setPasswordrepeat] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (password !== passwordrepeat) {
        throw new Error("Passwords do not match");
      }
      await api.post(route, { username, password, email }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      navigate("/login");
    } catch (error) {
      const errorMessage = error.response ? error.response.data.detail : error.message;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>Register</h1>
      <input
        className="form-input"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        className="form-input"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        className="form-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      
      <input
        className="form-input"
        type="password"
        value={passwordrepeat}
        onChange={(e) => setPasswordrepeat(e.target.value)}
        placeholder="Confirm Password"
        required
      />
      {error && <p className="error-message">{error}</p>}
      {loading && <LoadingIndicator />}
      <button className="form-button" type="submit" disabled={loading}>
        {loading ? "Loading..." : "Register"}
      </button>
    </form>
  );
}

export default RegisterForm;
