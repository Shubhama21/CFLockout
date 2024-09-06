import Head from "next/head";
import { Box } from "@mui/material"
import Header from "../components/Header";
import Footer from "../components/Footer";
import Problems from "../components/GetProblems";
import { ThemeProvider, createTheme } from "@mui/material/styles";


const defaultTheme = createTheme({
    palette: {
        primary: {
            main: "#2b2d42",
        },
        secondary: {
            main: "#8d99ae",
        },
    },
});

export default function Home() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <Box
                sx={{
                    display: "flex",
                    minHeight: "100vh",
                    flexDirection: "column",
                    justifyContent: "flexStart",
                }}
            >
                <Header />
                <Problems />
                <Head>
                    <title>cfLockout</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Footer />
            </Box>
        </ThemeProvider>
    );
}
