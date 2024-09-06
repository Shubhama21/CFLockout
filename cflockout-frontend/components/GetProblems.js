import * as React from 'react';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import axios from 'axios';
import useStore from './store';
import { create } from 'zustand'
import ProblemGrid from './Grid';
import Grid from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
import UserInput from "../components/userInput";
import { BASE_URL } from '../constants/constants';

export const lastContestStore = create((set) => ({
    lastContest : "",
    setLastContest: (data) => set(() => ({ lastContest : data })),
}))

export default function Problems() {

    const [probs, setProbs] = useState([])
    const [loading, setLoading] = useState(false);
    const currentCFID = useStore((state) => state.currentCFID)
    const setLC = lastContestStore((state) => state.setLastContest)
    const lc = lastContestStore((state) => state.lastContest)
    
    useEffect(() => {
        const fetchData = async function(){
            setLoading(true);
            let url = BASE_URL + "problems"
            if(currentCFID!="")    url = url + "?user=" + currentCFID
            try{
                const response = await axios.get(url)
                setLC(response.data[0].contestId)
                setProbs(response.data)
            }catch(err){
                console.log(err)
            }
            setLoading(false)
        }
        fetchData()
    },[currentCFID])

    if(loading){
        return(
            <Box sx={{ flexGrow: 1, height: '100%', minHeight: '100vh'}}>
            <Box
                sx={{
                    backgroundColor: "#d4d4d4",
                    height: "60px",
                }}
            >
                <UserInput />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems:'center', height: '100%', minHeight: '100vh'}}>
                <CircularProgress />
            </Box>
            </Box>
        )
    }

    else return (
        
        <Box sx={{ flexGrow: 1 }}>
            <Box
                sx={{
                    backgroundColor: "#d4d4d4",
                    height: "60px",
                }}
            >
                <UserInput />
            </Box>
            <ProblemGrid problems={probs} lastContest={lc} />
        </Box>
    );
}