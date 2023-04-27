export const calculateStartTime = (userDifficulty, providedTimeLimit) => {
    if(userDifficulty > 0){
        return providedTimeLimit * 60000
    }
    return 0;
}