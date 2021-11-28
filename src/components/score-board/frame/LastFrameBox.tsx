import React, {useEffect, useState} from "react";
import {Frame, getTotalFrameSum} from "../../../models/Frame";
import {TableCell} from "@mui/material";
import './LastFrameBox.css'

const MAX_PINS = 10;

export function LastFrameBox(props: { frame?: Frame,}) {
    const [sumValue, setSumValue] = useState<number>();
    const getGuiNumber = (value: number): string => {
        if (value < MAX_PINS) {
            return value.toString();
        } else {
            return 'X';
        }
    }

    useEffect(() => {
        if (props.frame?.firstRoll !== undefined) {
            setSumValue(getTotalFrameSum(props.frame));
        }
    }, [props.frame?.firstRoll, props.frame?.secondRoll, props.frame?.thirdRoll, props.frame?.bonus, props.frame?.sumBefore])

    return (
        <TableCell className={"cell"} padding={"none"}>
            <div className={"first-roll"}>
                {props.frame?.firstRoll !== undefined && getGuiNumber(props.frame.firstRoll)}
            </div>
            <div className={"last-rolls"}>
                <div className={"last-rolls-container"}>
                    <div className={"second-roll "}>
                        {props.frame?.secondRoll !== undefined && getGuiNumber(props.frame.secondRoll)}
                    </div>
                    <div className={"third-roll"}>
                        {props.frame?.thirdRoll !== undefined && getGuiNumber(props.frame.thirdRoll)}
                    </div>
                </div>
            </div>
            <div className={"sum-box"}>
                {sumValue}
            </div>
        </TableCell>
    );
}
