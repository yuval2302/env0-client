import React, {useState} from "react";
import {Button, ToggleButton, ToggleButtonGroup} from "@mui/material";
import Swal from "sweetalert2";

interface ScoreMenuProps {
    handleAddedRoll:(pinsKnocked:number)=>void,
    isInLastFrame:boolean,
    disabled:boolean;
}

export function ScoreMenu(props:ScoreMenuProps) {
    const MAX_PINS=10;
    const [pinsOnBoard, setPinsOnBoard] = useState(10);
    const [currentRoll, setCurrentRoll] = useState(1);
    const [chosenPins, setChosenPins] = useState<number|undefined>();

    const onChange = (event:React.MouseEvent, value:number) => {
        setChosenPins(value===null ? undefined : value);
    }
    const pins= Array.from({length: pinsOnBoard+1},
        (unused,index) => <ToggleButton key={index} value={index}>{index}</ToggleButton> )

    const handleSubmit = () => {
        if(currentRoll===1) {
            if(chosenPins!==MAX_PINS) {
                setPinsOnBoard(MAX_PINS-chosenPins!);
                setCurrentRoll(2);
            }
        } else {
            if(!props.isInLastFrame) {
                setPinsOnBoard(MAX_PINS);
                setCurrentRoll(1);
            } else if (props.isInLastFrame) {
                if(currentRoll===2 && pinsOnBoard===chosenPins) {
                    setPinsOnBoard(MAX_PINS);
                    setCurrentRoll(1);
                }
            }
        }
        props.handleAddedRoll(chosenPins!);
        setChosenPins(undefined);
    }
    return (
        <>
            <span>Click Number Of Pins Knocked Down</span>
            <ToggleButtonGroup color="primary" value={chosenPins} exclusive={true} onChange={onChange}>
                {pins}
            </ToggleButtonGroup>
            <Button disabled={chosenPins===undefined || props.disabled}  variant="contained" size="small" onClick={handleSubmit}>Submit</Button>
        </>
    );

}
