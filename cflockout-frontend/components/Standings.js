import { Box, Grid, Link } from "@mui/material";
import { ColorMap } from "./Cell";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Standings(props) {

    const { value, index, data, ratings } = props;

    const getParticipants = () => {
        let participants = [];
        if (data != null) {
            Object.entries(data.session_data.participants).forEach(
                ([key, value]) => {
                    let username = key;
                    let score = value;
                    participants.push({ username, score });
                }
            );
            for (let i = 0; i < participants.length; i++) {
                for (let j = 0; j < participants.length - i - 1; j++) {
                    if (participants[j].score < participants[j + 1].score) {
                        let swap = participants[i];
                        participants[i] = participants[j];
                        participants[j] = swap;
                    }
                }
            }
        }
        return participants;
    };

    const getBGcolor = (i) => {
        return i%2===1 ? "#EFF2EF" : "#ffffff"
    }

    return (
        <Box>
            {value == index && (
                <Grid
                    container
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "auto",
                        width: "95%",
                        marginX: "2.5%",
                        marginY: "20px",
                        paddingY: "20px",
                        fontSize: "18px",
                        fontFamily: "'Mukta', sans-serif",
                    }}
                    >
                    <Box
                        sx={{
                            height: "60px",
                            marginTop: "10px",
                            borderBottom: "3px solid black",
                            display: "flex",
                            flexDirection: "row",
                            fontSize: "28px",
                            fontWeight: "bold",
                            fontFamily: "'Mukta', sans-serif",
                            backgroundColor: "#EAE1DF"
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                width: "10%",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            Rank
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                width: "60%",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            Username
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                width: "30%",
                                justifyContent: "center",
                                alignItems: "end",
                                marginRight: "4%",
                            }}
                        >
                            Points
                        </Box>
                    </Box>
                    {getParticipants().map((participant, i) => (
                        <Box
                            key={i}
                            sx={{
                                height: "60px",
                                borderBottom: "1px solid grey",
                                display: "flex",
                                flexDirection: "row",
                                backgroundColor: getBGcolor(i),
                                "&:hover": {
                                    backgroundColor: "#D9D9D9",
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "10%",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                {i + 1}
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "60%",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Link
                                    href={
                                        "https://codeforces.com/profile/" +
                                        participant.username
                                    }
                                    target="blank"
                                    sx={{
                                        textDecoration: "none",
                                        color: ColorMap(
                                            ratings[participant.username]
                                        ),
                                        fontWeight: "bold",
                                        textShadow: "none",
                                        "&:hover": {
                                            cursor: "pointer",
                                        },
                                    }}
                                >
                                    {participant.username}
                                </Link>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "30%",
                                    justifyContent: "center",
                                    alignItems: "end",
                                    marginRight: "5%",
                                }}
                            >
                                {participant.score}
                            </Box>
                        </Box>
                    ))}
                </Grid>
            )}
        </Box>
    );
}
