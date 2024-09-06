import * as React from "react";
import Countdown from "react-countdown";
import { Box } from "@mui/material";

const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
        return <div></div>;
    } else {
        return (
            <Box
                sx={{
                    minWidth: "120px",
                    paddingBottom: "5px",
                    borderBottom: "2px solid #9C27B0",
                }}
            >
                <span>
                    {(hours < 10 ? "0" : "") + hours} :{" "}
                    {(minutes < 10 ? "0" : "") + minutes} :{" "}
                    {(seconds < 10 ? "0" : "") + seconds}
                </span>
            </Box>
        );
    }
};

export default function Component(props) {


    var end = props.end * 1000;
    var text = props.text;

    return (
        <Box
            sx={{
                textAlign: "center",
                color: "#9C27B0",
            }}
        >
            <Box
                sx={{
                    fontSize: "24px",
                    fontFamily: "'PT Sans', sans-serif",
                    paddingBottom: "5px",
                    width: "120px",
                }}
            >
                {text}
            </Box>
            <Countdown date={end} renderer={renderer} />
        </Box>
    );
}
