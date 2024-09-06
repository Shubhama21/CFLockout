import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

export default function Footer() {

    return (
        <Box
            sx={{
				marginTop: "auto",
                width: "100%",
				color: "black",
                height: 100,
				fontSize: "30px",
				backgroundColor: "#d4d4d4"
            }}
        >
			<Typography sx={{
				padding: "10px",
				textAlign: "center",
			}}>
				Made by Programming Club IITK
			</Typography>
		</Box>
    );
}
