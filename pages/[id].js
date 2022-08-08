import React from 'react';
import {gamesAPI} from "../services/api";

export async function getServerSideProps(context) {
    const {id} = context.params;
    const game = await (await gamesAPI.getGame(id)).data;
    if(!game) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            game: game
        }
    }
}

const Game = ({game}) => {
    return (
        <div>
            <h2>{game.name}</h2>
            {game.description}
        </div>
    );
};

    export default Game;
