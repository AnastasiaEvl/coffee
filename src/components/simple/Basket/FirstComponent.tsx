import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export const FirstComponent=({chosenTime, setTime}:{chosenTime:string, setTime:any})=>{
    return (
        <Stack component="form" noValidate spacing={3}>
            <TextField
                id="time"
                label="Chose time"
                type="time"
                defaultValue={chosenTime}
                onChange={e=>{setTime(e.target.value)}}
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    step: 300,
                }}
                sx={{ width: 150 }}
            />
        </Stack>
    );
}
