import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography, getInitColorSchemeScript } from '@mui/material';

export const ColorMap = (rating) => {
    if(rating === 0 || rating === undefined) return "black"
    if(rating < 1200) return "grey"
    if(rating < 1400) return "green"
    if(rating < 1600) return "#00c0c0"
    if(rating < 1900) return "blue"
    if(rating < 2100) return "#a0a"
    if(rating < 2300) return "#ff8c00"
    if(rating < 2400) return "#ff8c00"
    if(rating < 2600) return "red"
    if(rating < 3000) return "red"
    return "red"
}

const getBGColor = (status) => {
    if(status==="AC"){
        return "#85FFBA"
    }
    else if(status==="WA"){
        return "rgba(247, 124, 124, 0.5)"
    }
    else{
        return "#ffffff"
    }
}

const getColor = (status) => {
    if(status==="AC"){
        return "#2FEE9C"
    }
    else if(status==="WA"){
        return "#ff9999"
    }
    else{
        return "#EAE1DF"
    }
}

export default function ProblemCell( props ) {

    const { problem } = props

    function handleRedirect(){
        window.open("https://codeforces.com/contest/" + problem.contestId + "/problem/" + problem.index)
    }

    return (
        <div>
            <Box onClick={handleRedirect} 
                sx={{
                    height: 45,
                    border: "2px solid #565264",
                    borderCollapse: "collapse",
                    paddingX: "8px",
                    paddingY: "3px",
                    margin: "-1px",
                    backgroundColor: getBGColor(problem.verdict),
                    '&:hover': {
                        cursor: "pointer",
                        backgroundColor: getColor(problem.verdict),
                    },
                }}
                >
                <Grid container spacing={0}>
                    <Grid item sx={{
                        paddingLeft: "2px",
                        width: "100%",
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        '&:hover': {
                            color: ColorMap(problem.rating),
                        },
                    }}>
                        <Typography variant='h6' sx={{
                            fontSize: "18px",
                            fontWeight: "500",
                            fontFamily: "'Mukta', sans-serif",
                            color: ColorMap(problem.rating),
                        }}>{problem.index}. {problem.name}</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{
                        paddingRight: '10px',
                        textAlign: 'right',
                        color: ColorMap(problem.rating),
                    }}>
                        <Typography variant='subtitle2' sx={{
                            fontWeight: "500",
                            fontSize: "13px",
                            fontFamily: "'Mukta', sans-serif",
                        }}>{problem.rating}</Typography>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}