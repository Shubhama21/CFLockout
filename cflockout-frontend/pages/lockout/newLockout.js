import { Box, Typography, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ContestDetails from "../../components/contestDetails";
import ProblemDetails from "../../components/problemDetails";
import { useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import useStore from "../../components/store";
import { BASE_URL } from "../../constants/constants";

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

export default function Lockout() {
    const token = useStore((state) => state.token);
    const [participants, setParticipants] = useState("");
    const after5min = dayjs().add(5, "minute");
    const [startTime, setStartTime] = useState(
        Math.floor(after5min.valueOf() / 1000)
    );
    const [duration, setDuration] = useState("");
    const [Error, setError] = useState("No error");
    const [problems, setProblems] = useState([
        {
            index: 0,
            rating: "800",
            score: "100",
        },
    ]);

    const handleCreateLockout = () => {
        let lockoutDetails = {};
        lockoutDetails.participants = participants.split(" ");
        lockoutDetails.start_time = startTime;
        lockoutDetails.ratings = [];
        lockoutDetails.score = [];
        lockoutDetails.duration = parseInt(duration, 10) * 60;
        for (let i = 0; i < problems.length; i++) {
            lockoutDetails.ratings.push(problems[i].rating);
            lockoutDetails.score.push(problems[i].score);
        }

        const headers = {
            "Content-Type": "application/json",
            token: token,
        };
        console.log(lockoutDetails);
        axios
            .post(BASE_URL + "lockout/create", lockoutDetails, {
                headers,
            })
            .then((res) => {
                window.location.href =
                    "/lockout/" + res.data.session_id;
            })
            .catch((error) => {
                setError(error.response.data.error)
                console.log(error);
            });
    };

    const handleRemove = (index) => {
        let newProblems = [];
        let idx = 0;
        for (let i = 0; i < problems.length; i++) {
            if (i != index) {
                newProblems.push(problems[i]);
                newProblems[idx].index = idx;
                idx += 1;
            }
        }
        setProblems(newProblems);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Header />
            <Typography
                sx={{
                    marginTop: "30px",
                    marginLeft: "2.5%",
                    fontSize: "30px",
                    color: "#696969",
                }}
            >
                CONTEST DETAILS
            </Typography>
            <ContestDetails
                participants={participants}
                setParticipants={setParticipants}
                startTime={startTime}
                setStartTime={setStartTime}
                duration={duration}
                setDuration={setDuration}
            />
            <Typography
                sx={{
                    marginTop: "30px",
                    marginLeft: "2.5%",
                    fontSize: "30px",
                    color: "#696969",
                }}
            >
                SELECT PROBLEMS
            </Typography>
            <ProblemDetails
                problems={problems}
                setProblems={setProblems}
                handleRemove={handleRemove}
            />

            {Error != "No error" && (
                <Typography
                    sx={{
                        marginBottom: "10px",
                        marginLeft: "2.5%",
                        color: "red",
                    }}
                >
                    {Error}
                </Typography>
            )}

            <Button
                variant="contained"
                onClick={handleCreateLockout}
                sx={{
                    backgroundColor: "#494647",
                    marginLeft: "2.5%",
                    marginBottom: "30px",
                    "&:hover": {
                        backgroundColor: "primary.main",
                    },
                }}
            >
                CREATE
            </Button>
            <Footer />
        </ThemeProvider>
    );
}
