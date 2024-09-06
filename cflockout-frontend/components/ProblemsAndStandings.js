import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Standings from "./Standings";
import LockoutProblems from "./lockoutProblems";
import Countdown from "./Countdown";
import { Typography } from "@mui/material";

export default function ProblemsAndStandings(props) {

    const { data, ratings } = props;
    const colors = ["#28a745", "#169db2", "#9933cc", "#E7394B", "#ffc107"];
    const colors2 = ["#2e9145", "#158697", "#721D9C", "#ED142A", "#FFAD08"];
    const [value, setValue] = React.useState(1);

    const getColors = () => {
        if (data == null) return;
        let i = 0;
        let color = {};
        Object.entries(data.session_data.participants).forEach(
            ([key, value]) => {
                let username = key;
                color[username] = [colors[i], colors2[i]];
                i = (i + 1) % colors.length;
            }
        );
        return color;
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: "90%", marginY: "30px", marginX: "5%" }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                    }}
                >
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="secondary"
                        indicatorColor="secondary"
                        sx={{
                            marginY: "30px",
                        }}
                    >
                        <Tab value={1} label="PROBLEMS" />
                        <Tab value={2} label="STANDINGS" />
                    </Tabs>
                </Box>
                {data &&
                    Date.now() >= data.start_time * 1000 &&
                    Date.now() <= (data.duration + data.start_time) * 1000 && (
                        <Box
                            sx={{
                                display: "flex",
                                marginRight: "2.5%",
                                marginLeft: "auto",
                                alignItems: "center",
                            }}
                        >
                            <Countdown
                                start={data.start_time}
                                end={data.duration + data.start_time}
                                text={"Ends in : "}
                            />
                        </Box>
                    )}
                {data && Date.now() <= data.start_time * 1000 && (
                    <Box
                        sx={{
                            display: "flex",
                            marginRight: "2.5%",
                            marginLeft: "auto",
                            alignItems: "center",
                        }}
                    >
                        <Countdown
                            start={0}
                            end={data.start_time}
                            text={"Starts in : "}
                        />
                    </Box>
                )}
            </Box>
            {data &&
                (Date.now() >= data.start_time * 1000 ? (
                    <LockoutProblems
                        value={value}
                        index={1}
                        data={data}
                        color={getColors()}
                    />
                ) : (
                    <Typography sx={{
                        fontSize: "24px",
                        color: "#9C27B0",
                        marginTop: "30px",
                        textAlign : "center",
                    }}>
                        Contest has not started yet
                    </Typography>
                ))}
            <Standings value={value} index={2} data={data} ratings={ratings} />
        </Box>
    );
}
