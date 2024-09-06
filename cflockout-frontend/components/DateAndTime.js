import { useState } from "react";
import { Box, TextField }  from "@mui/material"
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function SelectDateAndTime(props) {
    
    const { duration, setDuration, setStartTime } = props   
    const handleDuration = (e) => {
        setDuration(e.target.value);
    };

    const currentTime = dayjs();
    const after5min = currentTime.add(5, 'minute');
    const [selectedDateTime, setSelectedDateTime] = useState(after5min);
    const handleDateTimeChange = (newDateTime) => {
        setSelectedDateTime(newDateTime);
        setStartTime(newDateTime.unix())
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box display="flex">
                <Box
                    flexGrow={1}
                    sx={{
                        marginY: "20px",
                        marginLeft: "0.8%",
                    }}
                >
                    <DateTimePicker
                        label="Select Start Date and Time"
                        ampm={false}
                        value={selectedDateTime}
                        onChange={handleDateTimeChange}
                        minDateTime={currentTime}
                        sx={{
                            width: "100%",
                        }}
                    />
                </Box>
                <Box
                    flexGrow={1}
                    sx={{
                        marginY: "20px",
                        marginLeft: "0.8%",
                    }}
                >
                    <TextField
                        required
                        label="Duration(in minutes)"
                        id="duration"
                        type="number"
                        value={duration}
                        onChange={handleDuration}
                        sx={{
                            width: "100%",
                        }}
                    />
                </Box>
            </Box>
        </LocalizationProvider>
    );
}
