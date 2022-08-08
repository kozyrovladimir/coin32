import React from 'react';
import styled from "styled-components";
import Link from "next/link";

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

const GameCardName = styled.div`
  padding: 12px;
  text-align: center;
  color: white;
  background-color: rgba(3, 3, 3, 0.50);
  backdrop-filter: blur(10px);
`
const GameCardInformation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px;
  color: white;
  background-color: rgba(3, 3, 3, 0.50);
  backdrop-filter: blur(10px);
`

const GameCard = ({image, name, rating, released, link}) => {
    return (
        <Link href={link}>
            <GameCardWrapper
                imagePath={image}
            >
                <GameCardName>
                    <span>{name}</span>
                </GameCardName>
                <GameCardInformation>
                    <span>{rating}</span>
                    <span>{released}</span>
                </GameCardInformation>
            </GameCardWrapper>
        </Link>
    );
};

export default GameCard;
