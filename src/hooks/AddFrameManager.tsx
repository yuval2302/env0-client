import React, {useEffect, useState} from "react";
import {Player} from "../models/Player";
import {Frame, getTotalFrameSum} from "../models/Frame";

const MAX_PINS=10;
export interface AddFrameProps {
    player:Player,
    setPlayerFrames:(newFrames:Frame[])=>void
}
export const useAddRegularFrame = (props:AddFrameProps) : [Frame, (knockedPins:number) => void]=> {
    const [currFrame, setCurrFrame] = useState<Frame>({sumBefore:0})
    const [frames, setFrames] = useState<Frame[]>([]);

    useEffect(() => {
        props.setPlayerFrames(frames);
        setCurrFrame(prevState =>
            frames.length>0 ?
                Object.assign({}, prevState, {sumBefore: getTotalFrameSum(frames[frames.length-1])}) :
                prevState)
    }, [frames]);

    const handleSubmittedKnockedPins = (currentKnockedPins:number) =>{
        let framesToEdit = frames.slice();
        framesToEdit = handlePrevFrames(framesToEdit, currentKnockedPins);
        framesToEdit = frames.length<9 ?
            addRollToRegularFrame(framesToEdit, currentKnockedPins) :
            addRollToLastFrame(framesToEdit, currentKnockedPins);
        setFrames(framesToEdit);
    }

    const handlePrevFrames = (framesToEdit:Frame[],currentKnockedPins:number) : Frame[] => {
        if(framesToEdit.length>0) {
            let prevFrame=framesToEdit[framesToEdit.length-1];
            if((!currFrame.isLastFrame || !currFrame.firstRoll) &&
                framesToEdit.length>1 && prevFrame.firstRoll===10) {
                let prevPrevFrame=framesToEdit[framesToEdit.length-2];
                if(prevPrevFrame.firstRoll===10) {
                    prevPrevFrame.bonus= (prevPrevFrame.bonus||0) + currentKnockedPins;
                    prevFrame.sumBefore+=currentKnockedPins;
                }
            }
            if((!currFrame.isLastFrame || !currFrame.secondRoll) && (prevFrame.firstRoll!) + ((prevFrame.secondRoll||0))===10) {
                prevFrame.bonus = (prevFrame.bonus||0) + currentKnockedPins;
                currFrame.sumBefore = getTotalFrameSum(prevFrame);
            }
        }
        return framesToEdit;
    }

    const createNewCurrFrame = (length:number) => {
        if(length<9) {
            setCurrFrame({sumBefore : frames.length===0 ? 0 : getTotalFrameSum(frames[frames.length-1])});
        } else {
            setCurrFrame({sumBefore : getTotalFrameSum(frames[frames.length-1]), isLastFrame:true});
        }
    }

    const addRollToRegularFrame = (framesToEdit:Frame[],currentKnockedPins:number) : Frame[]=> {
        let newFrame : Frame = Object.assign({},currFrame);
        if (currFrame.firstRoll===undefined) {
            framesToEdit = addFirstRollToRegularFrame(framesToEdit,newFrame,currentKnockedPins)
        } else {
            newFrame.secondRoll=currentKnockedPins;
            framesToEdit = framesToEdit.concat(newFrame);
            createNewCurrFrame(framesToEdit.length);
        }
        return framesToEdit
    }

    const addFirstRollToRegularFrame = (framesToEdit:Frame[] ,newFrame : Frame,currentKnockedPins:number) => {
        newFrame.firstRoll=currentKnockedPins;
        if (currentKnockedPins === MAX_PINS) {
            framesToEdit = framesToEdit.concat(newFrame);
            createNewCurrFrame(framesToEdit.length)
        } else {
            setCurrFrame(newFrame);
        }
        return framesToEdit
    }

    const addRollToLastFrame = (framesToEdit:Frame[],currentKnockedPins:number) : Frame[]=> {
        let newFrame : Frame = Object.assign({},currFrame);
        if (currFrame.firstRoll===undefined) {
            newFrame.firstRoll=currentKnockedPins;
            setCurrFrame(newFrame);
        } else if (currFrame.secondRoll===undefined){
            newFrame.secondRoll=currentKnockedPins;
            setCurrFrame(newFrame);
            if(newFrame.firstRoll! + currentKnockedPins < 10) {
                framesToEdit = framesToEdit.concat(newFrame)
            }
        } else {
            newFrame.thirdRoll=currentKnockedPins;
            setCurrFrame(newFrame);
            framesToEdit = framesToEdit.concat(newFrame);
        }
        return framesToEdit;
    }

    return [currFrame, handleSubmittedKnockedPins];
}
