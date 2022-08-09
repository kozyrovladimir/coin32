import React from 'react';
import {gamesAPI} from "../services/api";
import styled from "styled-components";

const GamePageWrapper = styled.div`
  width: 100%;
  background-image: url("${props => props.imagePath}");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  min-height: 100vh;
`

const GameDarkBackground = styled.div`
  padding: 20px;
  width: 100%;
  height: 100%;
  background-color: rgba(3, 3, 3, 0.80);
  min-height: 100vh;
`

const MainInfoWrapper = styled.div`
  min-height: 50vh;
  width: 50%;
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const MainInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
`

const SubInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const GameName = styled.h2`
  text-align: center;
  color: white;
  font-weight: bold;
`

const SubInfo = styled.span`
  color: white;
  font-weight: bold;
`;

const Link = styled.a`
  font-weight: bold;
  color: white;
`

const GameDescription = styled.p`
  color: white;
`

const ScreenshotsWrapper = styled.div`
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  width: 50%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  @media (max-width: 768px) {
    width: 100%;
  }
`

const ScreenShot = styled.div`
  border-radius: 8px;
  background-image: url("${props => props.imagePath}");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  aspect-ratio: 1/1;
`

const Flex = styled.div`
  width: 100%;
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export async function getServerSideProps(context) {
    const {id} = context.params;
    const gameResponse = await gamesAPI.getGame(id);
    const game = gameResponse.data;
    const screenshotsResponse = await gamesAPI.getScreenshots(id);
    const screenshots = screenshotsResponse.data;

    if (!game) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            game: game,
            screenshots: screenshots
        }
    }
}

const Game = ({game, screenshots}) => {
    const name = game.name;
    const image = game.background_image;
    const website = game.website;
    const rating = game.rating;
    const released = game.released;

    const countOfScreenshots = screenshots.count;
    const listOfScreenshots = screenshots.results;
    const ShortlistOfScreenshots = screenshots.results.slice(0,4);


    return (
        <GamePageWrapper imagePath={image}>
            <GameDarkBackground>
                <Flex>
                    <MainInfoWrapper>
                        <MainInfo>
                            <div><GameName>{name}</GameName></div>
                            <SubInfoWrapper>
                                <SubInfo>Rating {rating}</SubInfo>
                                <SubInfo>Released: {released}</SubInfo>
                                <Link href={website}>Website</Link>
                            </SubInfoWrapper>
                        </MainInfo>
                    </MainInfoWrapper>
                    <ScreenshotsWrapper>
                        {ShortlistOfScreenshots.map(({image}, index) => {
                            return (<ScreenShot key={index} imagePath={image} ></ScreenShot>);
                        })}
                    </ScreenshotsWrapper>
                </Flex>
                <GameDescription>
                    {game.description_raw}
                </GameDescription>
            </GameDarkBackground>
        </GamePageWrapper>
    );
};

export default Game;
