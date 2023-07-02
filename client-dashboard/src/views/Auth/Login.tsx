import React, { ChangeEvent, useEffect, useState } from "react";
import { Grid, Box, Card, Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
  email: z.string().email({ message: "Geçersiz email adresi" }),
  password: z.string().min(8, { message: "Şifre en az 8 karakter olmalıdır" }),
});

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const formData = {
      email: email.trim(),
      password: password.trim(),
    };

    const validationResult = schema.safeParse(formData);

    if (!validationResult.success) {
      const errors = validationResult.error.flatten();
      console.log(errors);


      setEmailError(errors.fieldErrors.email);
      setPasswordError(errors.fieldErrors.password);
    } else {
      setEmailError("");
      setPasswordError("");
      handleSubmit(formData);
    }
  };

  const handleSubmit = (formData: { email: string, password: string }) => {
    console.log("Form gönderildi!");
    console.log("Email: ", formData.email);
    console.log("Password: ", formData.password);
  };

  return (
    <>
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: "0.3",
          },
        }}
      >
        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{ height: "100vh" }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card
              elevation={9}
              sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}
            >
              <Box display="flex" alignItems="center" justifyContent="center">
                {/* Logo veya başlık bileşeni */}
              </Box>

              <form onSubmit={handleFormSubmit} noValidate>
                <TextField
                  margin="normal"
                  required
                  type="email"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={handleEmailChange}
                  error={!!emailError}
                  helperText={emailError}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={handlePasswordChange}
                  error={!!passwordError}
                  helperText={passwordError}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>

                <Grid container>
                  <Grid item xs>
                    <Link className=" hover:underline italic" to="/">Forget password?</Link>
                  </Grid>
                  <Grid item>
                    <Link className="hover:underline italic" to="/">Create Account</Link>
                  </Grid>
                </Grid>
              </form>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Login;
