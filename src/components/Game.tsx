import React, {useEffect, useState} from "react";
import {Player} from "../models/Player";
import {Frame, getTotalFrameSum} from "../models/Frame";
import {ScoreMenu} from "./score-menu/ScoreMenu";
import {PlayerBoard} from "./score-board/PlayerBoard";
import {useAddRegularFrame} from "../hooks/AddFrameManager";



export const Game = () => {
    const [player, setPlayer] = useState<Player>({name:"Yuval", frames:[], totalScore:0});
    const setFrames = (frames: Frame[]) => setPlayer(Object.assign({}, player, {frames:frames}));
    const [isPlayerFinished, setIsPlayerFinished] = useState(false);
    const [currAddingFrame, handleSubmittedKnockedPins] = useAddRegularFrame({player: player, setPlayerFrames: setFrames});
    const[framesToShow,setFramesToShow] = useState<Frame[]>([]);

    useEffect(() => {
        if(player.frames.length===10) {
            setFramesToShow(player.frames);
        } else {
            setFramesToShow(player.frames.concat(currAddingFrame));
        }
    },[player.frames, currAddingFrame])

    useEffect(() => {
        if(player.frames.length===10) {
            setIsPlayerFinished(true);
        }
    }, [player.frames])

    useEffect(() => {
        setPlayer(Object.assign({}, player,
            {totalScore : framesToShow.length===0 ? 0 : getTotalFrameSum(framesToShow[framesToShow.length-1])}))
    }, [framesToShow]);

    // const resetGame = () :void => {
    //     setFramesToShow([]);
    //     setPlayer(Object.assign({}, player, {frames:[], totalScore:0}));
    // }


return (<>
    <ScoreMenu isInLastFrame={player.frames.length===9} handleAddedRoll={handleSubmittedKnockedPins} disabled={isPlayerFinished}/>
    {/*{isPlayerFinished && <Button variant="contained" size="small" onClick={resetGame}>איפוס משחק</Button>}*/}
    <PlayerBoard player={player} framesToShow={framesToShow}/>
</>);
}
