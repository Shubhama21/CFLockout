import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import useStore from "./store";

export default function UserInput() {
    const setUser = useStore((state) => state.setCurrentCFID);
    const [input, setInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input == "") return;
        setUser(input);
    };

    return (
        <Box
            component="form"
            sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
                marginLeft: "2%",
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <TextField
                id="filled-hidden-label-small"
                value={input}
                onChange={(e) => {
                    setInput(e.target.value);
                }}
                placeholder="userID"
                size="small"
                variant="outlined"
                color="grey"
                sx={{
                    height: "30px",
                }}
            />
            <Button
                type="submit"
                variant="contained"
                onClick={handleSubmit}
                sx={{
                    height: "40px",
                    margin: "0px",
                    padding: "0px",
                    color: "#d4d4d4",
                    backgroundColor: "#2b2d42",
                    '&:hover': {
                        backgroundColor: "#222222",
                    },
                }}
            >
                Submit
            </Button>
        </Box>
    );
}
