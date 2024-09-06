import { Box, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

export default function OneProblem(props) {
    
    const { index, problems, setProblems } = props;
    const [rating, setRating] = useState(problems[index].rating);
    const [score, setScore] = useState(problems[index].score);

    const handleRating = (e) => {
        setRating(e.target.value);
        let copyProblems = problems;
        copyProblems[index].rating = e.target.value;
        setProblems(copyProblems);
    };
    
    const handleScore = (e) => {
        setScore(e.target.value);
        let copyProblems = problems;
        copyProblems[index].score = e.target.value;
        setProblems(copyProblems);
    };

    const handleRemove = (e) => {
        let newProblems = []
        for(let i=0; i<problems.length; i++){
            if(i != index){
                newProblems.push(problems[i])
            }
        }
        setProblems(newProblems)
    }

    return (
        <Grid container>
            <Box
                sx={{
                    marginRight: "5%",
                    marginY: "10px",
                }}
            >
                <TextField
                    fullWidth
                    required
                    label="Rating"
                    id={"Rating"+index}
                    type="number"
                    value={rating}
                    onChange={handleRating}
                    sx={{
                        marginX: "0.8%",
                    }}
                />
            </Box>
            <Box
                sx={{
                    marginRight: "5%",
                    marginY: "10px",
                }}
            >
                <TextField
                    fullWidth
                    required
                    label="Points"
                    type="number"
                    id={"Score"+index}
                    value={score}
                    onChange={handleScore}
                    sx={{
                        marginX: "0.8%",
                    }}
                />
            </Box>
            <IconButton
                aria-label="delete"
                onClick={handleRemove}
                sx={{
                    width: "60px",
                }}
            >
                <DeleteIcon />
            </IconButton>
        </Grid>
    );
}
