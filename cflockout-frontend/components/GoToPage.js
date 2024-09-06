import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";

export default function GoToPage(props){

    const pg = props.page;
    const setPg = props.setPage
    const numPgs = props.numPages
    const dummy = props.dummy
    const setDummy = props.setDummy

    const handleSubmit = (e) => {
        e.preventDefault();
        if(dummy > numPgs || dummy<1)     return
        setPg(parseInt(dummy, 10))
    };

    return (
        <Box
            component="form"
            sx={{
                textAlign: "center"
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <TextField
                id="filled-hidden-label-small"
                value={dummy}
                onChange={(e) => {
                    setDummy(e.target.value);
                }}
                size="small"
                variant="outlined"
                color="grey"
                sx={{
                    height: "30px",
                    width: "5ch",
                }}
            />
            <Button
                type="submit"
                variant="contained"
                onClick={handleSubmit}
                sx={{
                    height: "40px",
                    marginX: "5px",
                    paddingX: "0px",
                    width: "0px",
                    backgroundColor: "#2b2d42",
                    '&:hover': {
                        backgroundColor: "#222222",
                    },
                }}
            >
                GO
            </Button>
        </Box>
    )
}