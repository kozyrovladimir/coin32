import React from 'react'
import {gamesAPI} from "../services/api"
import styled from "styled-components"
import PhotoSlider from "../components/PhotoSlider"
import {useRouter} from "next/router"

const GamePageWrapper = styled.div`
  width: 100%;
  background-image: url("${props => props.imagePath}");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  min-height: 100vh;
`

const ContentWrapper = styled.div`
  padding-right: 20px;
  padding-left: 20px;
  max-width: 1100px;
  margin: 0 auto;
`

const GameDarkBackground = styled.div`
  padding: 20px;
  width: 100%;
  height: 100%;
  background-color: rgba(3, 3, 3, 0.80);
  min-height: 100vh;
`

const PhotoSliderWrapper = styled.div`
  width: 60%;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const MainInfo = styled.div`
  height: 100%;
  width: 40%;
  padding-right: 10px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    width: 100%;
  }
`

const SubInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const GameName = styled.h2`
  text-align: center;
  color: white;
  font-weight: bold;
`

const SubInfo = styled.span`
  color: white;
  font-weight: bold;
  padding-bottom: 10px;
`;

const Link = styled.a`
  font-weight: bold;
  color: white;
`

const GameDescription = styled.p`
  color: white;
`

const Flex = styled.div`
  width: 100%;
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const BackButton = styled.button`
  padding: 14px;
  border-radius: 8px;
  border: none;
  background-color: #262626;
  color: white;
  cursor: pointer;
  font-size: 1.1rem;
  transition: 200ms;
  margin-bottom: 30px;

  &:hover {
    background-color: #626262;
  }

  &:active {
    color: white;
  }

  &:disabled {
    background-color: #c9c9c9;
  }
`

export async function getServerSideProps(context) {
    const {slug} = context.params;
    const gameResponse = await gamesAPI.getGame(slug);
    const game = gameResponse.data;
    const screenshotsResponse = await gamesAPI.getScreenshots(slug);
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
    const listOfScreenshots = screenshots.results;

    const router = useRouter();

    return (
        <GamePageWrapper imagePath={image}>
            <GameDarkBackground>
                <ContentWrapper>
                    <Flex>
                        <MainInfo>
                            <BackButton onClick={() => {
                                router.back()
                            }}>Back</BackButton>
                            <div><GameName>{name}</GameName></div>
                            <SubInfoWrapper>
                                <SubInfo>Rating: {rating}</SubInfo>
                                <SubInfo>Released: {released}</SubInfo>
                                <Link href={website}>Website</Link>
                            </SubInfoWrapper>
                        </MainInfo>
                        <PhotoSliderWrapper>
                            <PhotoSlider images={listOfScreenshots}/>
                        </PhotoSliderWrapper>
                    </Flex>
                    <GameDescription>
                        {game.description_raw}
                    </GameDescription>
                </ContentWrapper>
            </GameDarkBackground>
        </GamePageWrapper>
    );
};

export default Game;
