import { Box, Typography, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../../components/Header";
import { useRouter } from "next/router";


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

export default function Lockout() {

    const router = useRouter()

    return (
        <ThemeProvider theme={defaultTheme}>
            <Header />

            <Button
                variant="contained"
                onClick={() => {router.push("./lockout/newLockout")}}
                sx={{
                    backgroundColor: "#38b000",
                    marginLeft: "40px",
                    marginTop: "30px",
                    "&:hover": {
                        backgroundColor: "green",
                    },
                }}
            >
                Create New Lockout
            </Button>
        </ThemeProvider>
    );
}
