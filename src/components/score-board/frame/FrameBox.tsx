import React, {useEffect, useState} from "react";
import {Frame, getTotalFrameSum} from "../../../models/Frame";
import {TableCell} from "@mui/material";
import './FrameBox.css'

const MAX_PINS=10;
export function FrameBox(props: { frame?: Frame }) {
    const [sumValue, setSumValue] = useState<number>();

    const getGuiNumberForFirstFrame = (): string => {
        if (props.frame?.firstRoll!==undefined && props.frame?.firstRoll< MAX_PINS) {
            return props.frame.firstRoll.toString();
        } else {
            return '';
        }
    }

    const getGuiNumberForSecondFrame = (): string => {
        if (props.frame?.firstRoll!==undefined && props.frame?.firstRoll=== MAX_PINS) {
            return 'X';
        } else if ((props.frame?.firstRoll||0) + (props.frame?.secondRoll || 0) === MAX_PINS){
            return '/';
        } else {
            return props.frame?.secondRoll?.toString() || '';
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
                {getGuiNumberForFirstFrame()}
            </div>
            <div className={"last-rolls"}>
                <div className={"last-rolls-container"}>
                    <div className={"second-roll-regular"}>
                        {getGuiNumberForSecondFrame()}
                    </div>
                </div>
            </div>
            <div className={"sum-box"}>
                {sumValue}
            </div>
        </TableCell>
    );
}
