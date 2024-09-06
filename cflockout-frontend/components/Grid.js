import * as React from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Row from "./Row";
import { Stack, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { lastContestStore } from "./GetProblems";
import GoToPage from "./GoToPage";

export default function ProblemGrid(props) {
    
    const problemData = props.problems;
    const lc = lastContestStore((state) => state.lastContest);
    const [page, setPage] = useState(1);
    const [dummy, setDummy] = useState(1);
    const numPages = Math.ceil(lc / 50);
    const handleChange = (e, value) => {
        setPage(value);
        setDummy(value);
    };

    const getRows = () => {
        if (lc === 0 || problemData.length === 0) return;

        let inRows = [];
        let row = [];
        let prev = lc - 50 * (page - 1);
        let first = prev;

        let nn = -1,
            yy = problemData.length;
        while (nn + 1 < yy) {
            var mid = Math.floor((yy + nn) / 2);
            if (problemData[mid].contestId <= prev) {
                yy = mid;
            } else {
                nn = mid;
            }
        }

        let start = yy;
        for (let i = start; i < problemData.length; i += 1) {
            let x = problemData[i];
            if (x.contestId <= first - 50) {
                break;
            }
            if (x.contestId != prev) {
                if (row.length) {
                    inRows.push(row);
                }
                row = [x];
            } else {
                row.push(x);
            }
            prev = x.contestId;
        }
        if (row.length) {
            inRows.push(row);
        }
        return inRows;
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page]);

    let i = 0;
    return (
        <Box sx={{ flexGrow: 1, marginTop: "30px" }}>
            <Grid container>
                {lc &&
                    problemData.length > 1 &&
                    getRows().map((problemRow) => (
                        <Grid item xs={12} key={(i = i + 1)}>
                            <Row problems={problemRow} />
                        </Grid>
                    ))}
            </Grid>
            {(numPages === 0 ? "" : numPages) && (
                <Stack>
                    <Pagination
                        count={numPages}
                        siblingCount={1}
                        boundaryCount={1}
                        color="grey"
                        shape="rounded"
                        sx={{
                            marginTop: "20px",
                            marginBottom: "8px",
                            display: "flex",
                            justifyContent: "center",
                        }}
                        renderItem={(item) => (
                            <PaginationItem
                                slots={{
                                    previous: ArrowBackIcon,
                                    next: ArrowForwardIcon,
                                }}
                                {...item}
                            />
                        )}
                        page={page}
                        onChange={handleChange}
                    />
                    <Box
                        sx={{
                            textAlign: "center",
                            fontFamily: "'Mukta', sans-serif",
                            marginBottom: "20px",
                        }}
                    >
                        Go to page :{" "}
                        <GoToPage
                            page={page}
                            setPage={setPage}
                            numPages={numPages}
                            dummy={dummy}
                            setDummy={setDummy}
                        />
                    </Box>
                </Stack>
            )}
        </Box>
    );
}
