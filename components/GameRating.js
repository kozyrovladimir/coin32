import styled from "styled-components";

const GameRatingStyled = styled.div`
  color: ${props => props.ratingColor};
  padding: 4px;
  border-radius: 8px;
  border: 2px solid ${props => props.ratingColor};
`

const GameRating = ({rating}) => {
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
        <GameRatingStyled ratingColor={ratingColor}>
            <span>Rating: {rating}</span>
        </GameRatingStyled>
    );
};

export default GameRating;
