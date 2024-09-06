import { Box, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import OneProblem from "./OneProblem";

export default function ProblemDetails(props) {

    const { problems, setProblems } = props

    const addProblem = (e) => {
        let index=0
        if(problems.length){
            index = problems[problems.length-1].index + 1
        }
        const prob = {
            "index": index,
            "rating": "800",
            "score": "100"
        }
        setProblems([...problems, prob]);
    };

    return (
        <Box
            sx={{
                width: "85%",
                height: "auto",
                padding: "5%",
                marginX: "2.5%",
                marginY: "20px",
                border: "2px solid #555555",
            }}
        >
            {
                problems.map((problem, index) => (
                    <Grid container key={problem.index}>
                        <OneProblem index={index} problems={problems} setProblems={setProblems} />
                    </Grid>
                ))
            }
            <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={addProblem}
                sx={{
                    marginTop: "20px",
                    "&:hover": {
                        cursor: "pointer",
                        backgroundColor: "#dff3e4",
                    },
                }}
            >
                ADD PROBLEM
            </Button>
        </Box>
    );
}
