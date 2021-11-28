import React, {useEffect, useState} from "react";
import {RegularFrame} from "../models/RegularFrame";

export function FrameBox(props: { frame: RegularFrame }) {
    const [sumValue, setSumValue] = useState(props.frame.getTotalSum);

    useEffect(() => {
        setSumValue(props.frame.getTotalSum());
    }, [props.frame._firstTurn, props.frame._secondTurn, props.frame._dependentFrame])
    return (
        <>
            <div>
                {props.frame._firstTurn.value || ""}
            </div>
            <div className={"borderable"}>
                {props.frame._secondTurn?.value || ""}
            </div>
            <div>
                {sumValue}
            </div>
        </>
    );
}
