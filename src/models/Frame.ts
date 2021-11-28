export interface Frame {
    firstRoll?:number,
    secondRoll?:number,
    sumBefore:number,
    thirdRoll?:number,
    bonus ?: number,
    isLastFrame ?: boolean
}

export function getTotalFrameSum(frame:Frame) : number {
    return frame.sumBefore +
        getCurrFrameSum(frame);
}

export function getCurrFrameSum(frame:Frame) : number {
    return (frame.firstRoll || 0) +
        (frame.secondRoll || 0) +
        (frame.thirdRoll || 0) +
        (frame.bonus|| 0);
}
