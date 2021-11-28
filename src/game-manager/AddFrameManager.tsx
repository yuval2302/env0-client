import React, {useEffect, useState} from "react";
import {Player} from "../models/Player";
import {Frame} from "../models/Frame";

const MAX_PINS=10;
export interface AddFrameProps {
    player:Player,
    // currentKnockedPins:number|undefined,
    pushFrame:(newFrame:Frame)=>void,
    numOfFrames:number
}
export const useAddRegularFrame = (props:AddFrameProps) : [Frame, (knockedPins:number) => void]=> {
    const [currFrame, setCurrFrame] = useState<Frame>({sumBefore:0})
    
    useEffect(() => {
        setCurrFrame(Object.assign({},currFrame,{sumBefore:props.player._totalScore}) as Frame);
    }, [props.player._totalScore]);

    const handleSubmittedKnockedPins = (currentKnockedPins:number) =>{
        if(props.numOfFrames<9) {
            addRegularFrame(currentKnockedPins);
        } else {
            addLastFrame(currentKnockedPins);
        }
    }
    // useEffect(() => {
    //     if(props.currentKnockedPins!==undefined) {
    //         if(props.numOfFrames<9) {
    //             addRegularFrame();
    //         } else {
    //             addLastFrame();
    //         }
    //     }
    //     },[props.currentKnockedPins])

    const createNewCurrFrame = () => {
        if(props.numOfFrames<9) {
            setCurrFrame({sumBefore : props.player._totalScore});
        } else {
            setCurrFrame({sumBefore : props.player._totalScore, isLastFrame:true});
        }
    }

    const addRegularFrame = (currentKnockedPins:number) => {
        let newFrame : Frame = Object.assign({},currFrame);
        if (!currFrame.firstRoll) {
            newFrame.firstRoll=currentKnockedPins;
            if (currentKnockedPins === MAX_PINS) {
                props.pushFrame(newFrame);
                createNewCurrFrame()
            } else {
                setCurrFrame(newFrame);
            }
        } else {
            newFrame.secondRoll=currentKnockedPins;
            props.pushFrame(newFrame)
            createNewCurrFrame();
        }
    }

    const addLastFrame = (currentKnockedPins:number) => {
        let newFrame : Frame = Object.assign({},currFrame);
        if (!currFrame.firstRoll) {
            newFrame.firstRoll=currentKnockedPins;
            setCurrFrame(newFrame);
        } else if (!currFrame.secondRoll){
            newFrame.secondRoll=currentKnockedPins;
            if(newFrame.firstRoll! + currentKnockedPins < 10) {
                setCurrFrame(newFrame);
                props.pushFrame(newFrame);
            }
        } else {
            newFrame.thirdRoll=currentKnockedPins;
            setCurrFrame(newFrame);
            props.pushFrame(newFrame);
        }
    }

    return [currFrame, handleSubmittedKnockedPins];
}
