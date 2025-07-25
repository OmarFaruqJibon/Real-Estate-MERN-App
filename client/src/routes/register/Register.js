import React, { useState } from "react";
import {
  Button,
  TextField,
  FormControlLabel,
  Link as MuiLink,
  Box,
  Typography,
  Container,
  Divider,
  CssBaseline,
  createTheme,
  ThemeProvider,
  Paper,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import apiCall from "../../lib/apiCall";
import "./Register.scss";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0d1014ff",
      paper: "#05070a",
    },
    primary: {
      main: "#90caf9",
    },
  },
});

export default function Register() {
  const [error, setError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setPasswordMatchError("");
    setIsLoading(true);

    const data = new FormData(event.currentTarget);
    const username = data.get("username");
    const email = data.get("email");
    const phone = data.get("phone");
    const password = data.get("password");
    const confirmPassword = data.get("confirmPassword");
    const role = data.get("role");

    if (password !== confirmPassword) {
      setPasswordMatchError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      await apiCall.post("/auth/register", {
        username,
        email,
        phone,
        password,
        role,
      });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box className="register-bg" />
      <Container component="main" maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            mt: 6,
            mb: 10,
            borderRadius: 2,
            px: 4,
            py: 5,
            border: "1px solid #6a6a6a99",
            backgroundColor: "background.paper",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontSize: "12px" }}
              color="primary"
              gutterBottom
            >
              DARHUB
            </Typography>
            <Typography
              component="h1"
              sx={{ fontSize: "2.15rem" }}
              variant="h5"
              fontWeight="bold"
            >
              Sign up
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Full Name"
                name="username"
                autoComplete="name"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                type="tel"
                autoComplete="tel"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        size="small"
                        sx={{ color: "#aaa" }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        edge="end"
                        size="small"
                        sx={{ color: "#aaa" }}
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <FormControl component="fieldset" sx={{ mt: 2 }}>
                <FormLabel component="legend" sx={{ color: "#bbb" }}>
                  I am
                </FormLabel>
                <RadioGroup row name="role" defaultValue="NORMAL">
                  <FormControlLabel
                    value="NORMAL"
                    control={<Radio color="primary" />}
                    label="Individual"
                  />
                  <FormControlLabel
                    value="DEVELOPER"
                    control={<Radio color="primary" />}
                    label="Developer"
                  />
                </RadioGroup>
              </FormControl>

              {passwordMatchError && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                  {passwordMatchError}
                </Typography>
              )}
              {error && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                  {error}
                </Typography>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, textTransform: "none" }}
              >
                {isLoading ? "Signing up..." : "Sign up"}
              </Button>

              <Divider sx={{ my: 2 }} />

              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Already have an account?{" "}
                <MuiLink
                  component={Link}
                  to="/login"
                  underline="hover"
                  color="primary"
                >
                  Sign in
                </MuiLink>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
