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

const GameCardHeader = styled.div`
  display: flex;
  justify-content: end;
  padding: 8px;
  background-color: rgba(3, 3, 3, 0.60);
  backdrop-filter: blur(10px);
`

const GameCardRating = styled.div`
  color: ${props => props.ratingColor};
  padding: 4px;
  border-radius: 8px;
  border: 2px solid ${props => props.ratingColor};
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
    const defineRatingColor = (rating) => {
        if (rating >= 4) {
            return '#6ac248';
        }

        if (rating >= 2) {
            return '#ffd560';
        }

        return '#fa1001';
    }

    const ratingColor = defineRatingColor(rating);

    return (
        <Link href={link}>
            <GameCardWrapper
                imagePath={image}
            >
                <GameCardHeader>
                    <GameCardRating ratingColor={ratingColor}>
                        <span>Rating: {rating}</span>
                    </GameCardRating>
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
