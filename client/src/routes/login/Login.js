import React, { useState, useContext } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  Paper,
  CssBaseline,
  createTheme,
  ThemeProvider,
  Divider,
  Link as MuiLink,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import apiCall from "../../lib/apiCall";
import { AuthContext } from "../../context/AuthContex";
import "./Login.scss";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0c1017",
      paper: "#05070a",
    },
    primary: {
      main: "#90caf9",
    },
  },
});

const Login = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(e.target);
    const phone = formData.get("phone");
    const password = formData.get("password");

    try {
      const res = await apiCall.post("/auth/login", {
        phone,
        password,
      });

      if (rememberMe) {
        localStorage.setItem("user", JSON.stringify(res.data));
      }

      updateUser(res.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box className="loginBg">
        <Container component="main" maxWidth="xs">
          <Paper
            elevation={6}
            sx={{
              mt: 6,
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
                Welcome Back
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
                  id="phone"
                  label="Phone Number"
                  name="phone"
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
                  autoComplete="current-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          color="inherit"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Remember me"
                  fontSize="10px"
                  sx={{ mt: 1 }}
                />

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
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>

                <Divider sx={{ my: 2 }} />

                <Typography variant="body2" align="center">
                  Don’t have an account?{" "}
                  <MuiLink
                    component={Link}
                    to="/register"
                    underline="hover"
                    color="primary"
                  >
                    Sign up
                  </MuiLink>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Login;
