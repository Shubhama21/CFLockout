import { Box, Grid, Link } from "@mui/material";

export default function LockoutProblems(props) {
    const { value, index, data, color } = props;

    const getProbs = () => {
        if (data == null) return [];
        let problems = data.session_data.problems;
        return problems;
    };

    const getColor = (problem) => {
        return problem.firstsolvedby != "" ? "white" : "default";
    };

    const getBGcolor1 = (problem, i) => {
        return problem.firstsolvedby != "" ? color[problem.firstsolvedby][0] : "white";
    };

    const getBGcolor2 = (problem, i) => {
        return problem.firstsolvedby != "" ? color[problem.firstsolvedby][1] : "#EAE1DF";
    };

    return (
        <Box>
            {value == index && (
                <Grid
                    container
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        height: "auto",
                        marginX: "2.5%",
                        marginY: "20px",
                        paddingY: "20px",
                    }}
                >
                    {getProbs().map((problem, i) => (
                        <Box
                            key={i}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                width: "280px",
                                height: "180px",
                                marginX: "10px",
                                marginY: "10px",
                                border: "1px solid grey",
                                borderRadius: "5px",
                                backgroundColor: getBGcolor1(problem, i),
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    height: "80px",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontWeight: "600",
                                    fontSize: "24px",
                                    fontFamily: "'Mukta', sans-serif",
                                    backgroundColor: getBGcolor2(problem, i)
                                }}
                            >
                                <Link
                                    href={
                                        "https://codeforces.com/contest/" +
                                        problem.task.contestId +
                                        "/problem/" +
                                        problem.task.index
                                    }
                                    target="_blank"
                                    underline="hover"
                                    sx={{
                                        textAlign: "center",
                                        color: getColor(problem),
                                    }}
                                >
                                    {problem.task.name}
                                </Link>
                            </Box>
                            {problem.firstsolvedby != "" && (
                                <Box
                                    sx={{
                                        display: "flex",
                                        height: "50px",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontWeight: "600",
                                        fontSize: "24px",
                                        fontFamily: "'Mukta', sans-serif",
                                        color: getColor(problem),
                                    }}
                                >
                                    {problem.firstsolvedby}
                                </Box>
                            )}
                            <Box
                                sx={{
                                    display: "flex",
                                    height: "50px",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginY: "auto",
                                    fontWeight: "600",
                                    fontSize: "24px",
                                    fontFamily: "'Mukta', sans-serif",
                                    color: getColor(problem),
                                }}
                            >
                                {problem.firstsolvedby == "" ? "" : "+"}
                                {problem.score} pts
                            </Box>
                        </Box>
                    ))}
                </Grid>
            )}
        </Box>
    );
}
