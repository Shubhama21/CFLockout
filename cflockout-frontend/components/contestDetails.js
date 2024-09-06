import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import SelectDateAndTime from "./DateAndTime";

export default function ContestDetails(props) {
    const {
        participants,
        setParticipants,
        startTime,
        setStartTime,
        duration,
        setDuration,
    } = props;

    const handleParticipants = (e) => {
        setParticipants(e.target.value);
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
            <TextField
                fullWidth
                required
                multiline
                label="Participants"
                id="Participants"
                value={participants}
                onChange={handleParticipants}
                helperText="(Codeforces ID of participants seperated by space)"
                sx={{
                    marginX: "0.8%",
                }}
            />
            <SelectDateAndTime
                duration={duration}
                setDuration={setDuration}
                setStartTime={setStartTime}
            />
        </Box>
    );
}
