import { useRouter } from "next/router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Box } from "@mui/material"
import { useEffect, useState } from "react";
import useStore from "../../components/store";
import axios from "axios";
import ProblemsAndStandings from "../../components/ProblemsAndStandings";
import { BASE_URL } from "../../constants/constants";

export default function Lockout() {

    const router = useRouter();
    const [data, setData] = useState(null);
    const [isDataFetched, setIsDataFetched] = useState(false)
    const [ratings, setRatings] = useState({});

    const token = useStore((state) => state.token);
    const headers = {
        token: token,
    };

    useEffect(() => {
        const getRating = async function (username) {
            const token = localStorage.getItem("token");
            const headers = {
                token: token,
            };
            const url =
                BASE_URL + "lockout/getUserRating?cfid=" + username;
            try {
                const response = await axios.get(url, { headers });
                let rating = response.data.rating;
                    if (rating === null) {
                        rating = 0;
                    }
                    const newRatings = ratings
                    newRatings[username] = rating
                    setRatings(newRatings);
            } catch (err) {
                console.log(err);
            }
        }
        if (data != null) {
            Object.entries(data.session_data.participants).forEach(
                ([key, value]) => {
                    if (!ratings[key]) {
                        getRating(key);
                    }
                }
            );
        }
    }, [router.isReady, isDataFetched]);
    
    useEffect(() => {
        if (!router.isReady) return;
        const fetchData = async function () {
            const token = localStorage.getItem("token");
            const headers = {
                token: token,
            };
            let url =
            BASE_URL + "lockout?session_id=" +
            router.query["id"];
            try {
                const response = await axios.get(url, { headers });
                setData(response.data);
                setIsDataFetched(true)
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
        const interval = setInterval(() => {
            fetchData();
        }, 120 * 1000);

        return () => {
            clearInterval(interval);
        };
    }, [router.isReady]);

    return (
        <Box
            sx={{
                display: "flex",
                minHeight: "100vh",
                flexDirection: "column",
                justifyContent: "flexStart",
            }}
        >
            <Header />
            <ProblemsAndStandings data={data} ratings={ratings}/>
            <Footer />
        </Box>
    );
}
