import React, {useEffect, useState} from "react";
import {Player} from "../../models/Player";
import {FrameBox} from "./frame/FrameBox";
import {Paper, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import {Frame} from "../../models/Frame";
import './PlayerBoard.css'
import {LastFrameBox} from "./frame/LastFrameBox";


export interface PlayerBoardProps {
    player: Player,
    framesToShow: Frame[];
}

export function PlayerBoard(props: PlayerBoardProps) {
    const[framesView, setFramesView] = useState<JSX.Element[]>([]);
    const getFramesView = () => {
        let framesView: JSX.Element[] = [];
        for (let index = 0; index < 10; index++) {
            if (index < props.framesToShow.length) {
                if(index<9) {
                    framesView.push(<FrameBox frame={props.framesToShow[index]}/>);
                } else {
                    framesView.push(<LastFrameBox frame={props.framesToShow[index]}/>);
                }
            } else {
                framesView.push(<FrameBox/>);
            }
        }

        return framesView;
    }

    useEffect(() => setFramesView(getFramesView), [props.framesToShow]);

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650} }>
                <TableBody>
                    <TableRow >
                        {framesView}
                        <TableCell>{props.player.totalScore}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
