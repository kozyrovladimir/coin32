import React from 'react'
import styled from "styled-components"
import Link from "next/link"
import GameRating from "./GameRating"

const GameCardWrapper = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-image: url("${props => props.imagePath}");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  aspect-ratio: 4 / 5;
  border-radius: 16px;
  cursor: pointer;
`

const GameCardHeader = styled.div`
  display: flex;
  justify-content: end;
  padding: 8px;
  background-color: rgba(3, 3, 3, 0.60);
  backdrop-filter: blur(10px);
`

const GameCardInformation = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 30%;
  padding: 12px;
  color: white;
  background-color: #202020;
  transition: 300ms;

  &:hover {
    color: #b7b7b7;
  }
`

const GameCardName = styled.div`
  font-size: 1.6rem;
  margin-bottom: 10px;
  text-align: center;
`

const GameDate = styled.div`
  align-self: end;
`

const GameCard = ({image, name, rating, released, link}) => {
    return (
        <Link href={link}>
            <GameCardWrapper
                imagePath={image}
            >
                <GameCardHeader>
                    <GameRating rating={rating}/>
                </GameCardHeader>
                <GameCardInformation>
                    <GameCardName>
                        <span>{name}</span>
                    </GameCardName>
                    <GameDate>
                        <span>Released: {released || 'no info'}</span>
                    </GameDate>
                </GameCardInformation>
            </GameCardWrapper>
        </Link>
    );
};

export default GameCard;
