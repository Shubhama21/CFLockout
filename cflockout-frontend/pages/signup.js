import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "next/link";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import useStore from "../components/store";
import { BASE_URL } from "../constants/constants";

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" href="/">
                cfLockout
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const defaultTheme = createTheme({
    palette: {
        primary: {
            main: "#2b2d42",
        },
        secondary: {
            main: "#8d99ae",
        },
    },
});

export default function SignUpSide() {
    const [toggle, setToggle] = useState(false);
    const [problemLink, setProblemLink] = useState("");
    const [timeOver, setTimeOver] = useState(false);
    const router = useRouter();
    const userCFID = useStore((state) => state.userCFID);
    const setUserCFID = useStore((state) => state.setUserCFID);
    const setUsername = useStore((state) => state.setUsername);
    const [found, setFound] = useState(0);
    const [usernameIsEmpty, setUsernameIsEmpty] = useState(false);
    const [passwordIsEmpty, setPasswordIsEmpty] = useState(false);
    const [cfidIsEmpty, setCfidIsEmpty] = useState(false);
    let user;

    const changeTimeStatus = () => {
        setTimeOver(true);
        UserVerificationStatus();
    };

    const signupDone = () => {
        router.push("/login");
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const SignUpDetails = {
            username: data.get("username"),
            cfid: data.get("cfid"),
            password: data.get("password"),
        };

        axios
            .post(BASE_URL + "auth/signup", SignUpDetails)
            .then((res) => {
                if (res.data.problem != null) {
                    setProblemLink(res.data.problem);
                    user = data.get("username");
                    setUserCFID(data.get("cfid"));
                    setUsername(data.get("username"));
                    setToggle(true);
                    setTimeout(changeTimeStatus, 60000);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const UserVerificationStatus = () => {
        axios
            .get(BASE_URL + "auth/findUser?username=" + user, {})
            .then((res) => {
                if (res.data.message == "Not found") {
                    setFound(-1);
                    setUserCFID("");
                    setUsername("");
                } else {
                    setFound(1);
                    setTimeout(signupDone, 60000);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: "100vh" }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage:
                            "url(https://source.unsplash.com/random?wallpapers)",
                        backgroundRepeat: "no-repeat",
                        backgroundColor: (t) =>
                            t.palette.mode === "light"
                                ? t.palette.grey[50]
                                : t.palette.grey[900],
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={6}
                    square
                >
                    <Box
                        sx={{
                            backgroundColor: "primary.main",
                            height: "100px",
                            color: "secondary.main",
                        }}
                    >
                        <Typography
                            sx={{
                                alignItems: "center",
                                textAlign: "center",
                                fontSize: "70px",
                                marginLeft: "3%",
                                fontFamily: "Mukta, SansSerif",
                            }}
                        >
                            cfLockout
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h4">
                            Sign Up
                        </Typography>
                        {!toggle && (
                            <Box
                                component="form"
                                noValidate
                                onSubmit={handleSubmit}
                                sx={{ mt: 1 }}
                            >
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
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
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="cfid"
                                    label="Codeforces Username"
                                    type="cfid"
                                    id="cfid"
                                    autoComplete="cfid"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            value="remember"
                                            color="primary"
                                        />
                                    }
                                    label="Remember me"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign Up
                                </Button>
                                <Grid container>
                                    <Grid
                                        item
                                        sx={{
                                            marginLeft: "auto",
                                            marginRight: "10px",
                                        }}
                                    >
                                        <Link href="/login">
                                            {"Have an account? Sign In"}
                                        </Link>
                                    </Grid>
                                </Grid>
                                <Copyright sx={{ mt: 5 }} />
                            </Box>
                        )}
                        {toggle && (
                            <Box
                                sx={{
                                    width: "90%",
                                    marginTop: "30px",
                                    textAlign: "center",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontFamily: "'Mukta', sans-serif",
                                        fontSize: "20px",
                                    }}
                                >
                                    Submit a compilation error to this{" "}
                                    <a
                                        href={"http://" + problemLink}
                                        target="_blank"
                                        style={{
                                            textDecoration: "none",
                                        }}
                                    >
                                        problem
                                    </a>{" "}
                                    within 60 seconds to verify your codeforces
                                    handle.
                                </Typography>
                                <Box
                                    sx={{
                                        marginTop: "30px",
                                    }}
                                >
                                    {!timeOver && <CircularProgress />}
                                    {timeOver && (
                                        <Box>
                                            {found == 1 && (
                                                <Box>
                                                    <Typography
                                                        sx={{
                                                            fontFamily:
                                                                "'Mukta', sans-serif",
                                                            fontSize: "18px",
                                                        }}
                                                    >
                                                        The Codeforces Handle{" "}
                                                        <a
                                                            href={
                                                                "https://codeforces.com/profile/" +
                                                                userCFID
                                                            }
                                                            target="_blank"
                                                            style={{
                                                                textDecoration:
                                                                    "none",
                                                            }}
                                                        >
                                                            {userCFID}
                                                        </a>{" "}
                                                        has been successfully
                                                        verified
                                                    </Typography>
                                                    <CircularProgress />
                                                </Box>
                                            )}
                                            {found == -1 && (
                                                <Box>
                                                    <Typography
                                                        sx={{
                                                            fontFamily:
                                                                "'Mukta', sans-serif",
                                                            fontSize: "18px",
                                                        }}
                                                    >
                                                        The Codeforces Handle{" "}
                                                        <a
                                                            href={
                                                                "https://codeforces.com/profile/" +
                                                                userCFID
                                                            }
                                                            target="_blank"
                                                            style={{
                                                                textDecoration:
                                                                    "none",
                                                            }}
                                                        >
                                                            {userCFID}
                                                        </a>{" "}
                                                        could not be verified
                                                    </Typography>
                                                    <CircularProgress />
                                                </Box>
                                            )}
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
