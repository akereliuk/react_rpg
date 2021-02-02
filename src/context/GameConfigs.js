import React, { useContext } from "react";

const GameConfigsContext = React.createContext();

export function useGameConfigs(){
    return useContext(GameConfigsContext);
}

export function GameConfigsProvider({ children }){

    const GameConfigs = {
        GameTitle: "React RPG"
    };

    return (
        <GameConfigsContext.Provider value={GameConfigs}>
            { children }
        </GameConfigsContext.Provider>
    )
}