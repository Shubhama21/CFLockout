import Box from "@mui/material/Box";
import { Typography, Button, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import useStore from "./store";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/constants";

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

export default function Header() {

    const [username, setUsername] = useState("")
    const setUserCFID = useStore((state) => state.setUserCFID);
    const setToken = useStore((state) => state.setToken);
    const setUserName = useStore((state) => state.setUsername);

    useEffect(() => {
        const token = localStorage.getItem("token")
        const headers = {
            token: token,
        };
        const fetchData = async function(){
            try{
                const response = await axios.get(BASE_URL + "auth/verifyToken", {headers})
                if(response.data.message==""){
                    setUsername(response.data.username)
                    setUserName(response.data.username);
                    setToken(token)
                    setUserCFID(response.data.cfid);
                }
            }catch(err){
                console.log(err)
            }
        }
        fetchData()
    },[])

    const router = useRouter();
    const handleLogin = (event) => {
        router.push("/login");
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box
                sx={{
                    display: "flex",
                    backgroundColor: "primary.main",
                    height: "60px",
                    color: "secondary.main",
                    overflow: "hidden"
                }}
            >
                <Grid
                    item
                    xs={3}
                    sm={4}
                    md={6}
                    lg={12}
                    sx={{
                        marginLeft: "3%",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "40px",
                        }}
                    >
                        cfLockout
                    </Typography>
                </Grid>

                <Grid
                    container
                    sx={{
                        marginLeft: "3%",
                    }}
                >
                    <Button
                        variant="text"
                        size="small"
                        sx={{
                            height: "40px",
                            margin: "10px",
                            fontFamily: "'Mukta', sans-serif",
                            fontSize: "20px",
                            color: "secondary.main",
                            "&:hover": {
                                color: "white",
                            },
                        }}
                        onClick={() => {
                            router.push("/");
                        }}
                    >
                        Home
                    </Button>
                    <Button
                        variant="text"
                        size="small"
                        sx={{
                            height: "40px",
                            margin: "10px",
                            fontFamily: "'Mukta', sans-serif",
                            fontSize: "20px",
                            color: "secondary.main",
                            "&:hover": {
                                color: "white",
                            },
                        }}
                        onClick={() => {
                            router.push("/lockout");
                        }}
                    >
                        Lockout
                    </Button>
                    <Button
                        variant="text"
                        size="small"
                        sx={{
                            height: "40px",
                            margin: "10px",
                            fontFamily: "'Mukta', sans-serif",
                            fontSize: "20px",
                            color: "secondary.main",
                            "&:hover": {
                                color: "white",
                            },
                        }}
                        onClick={() => {
                            router.push("/lockout");
                        }}
                    >
                        User Statistics
                    </Button>
                </Grid>

                {username == "" && (
                    <Button
                        onClick={handleLogin}
                        variant="text"
                        size="small"
                        sx={{
                            height: "40px",
                            marginY: "8px",
                            marginLeft: "auto",
                            marginRight: "30px",
                            fontFamily: "'Mukta', sans-serif",
                            fontSize: "20px",
                            color: "secondary.main",
                            "&:hover": {
                                color: "white",
                            },
                        }}
                    >
                        LOGIN
                    </Button>
                )}
                {username != "" && (
                    <Button
                        size="small"
                        variant="text"
                        sx={{
                            height: "40px",
                            marginY: "8px",
                            marginLeft: "auto",
                            marginRight: "30px",
                            fontFamily: "'Mukta', sans-serif",
                            fontSize: "20px",
                            backgroundColor: "primary.main",
                            color: "secondary.main",
                        }}
                    >
                        {username}
                    </Button>
                )}
            </Box>
        </ThemeProvider>
    );
}
