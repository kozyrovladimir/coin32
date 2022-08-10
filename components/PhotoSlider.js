import styled from 'styled-components'
import {useState} from "react"
import {BiChevronRight, BiChevronLeft} from "react-icons/bi"

const PhotoSliderWrapper = styled.div`
  width: 100%;
`

const Image = styled.div`
  overflow: hidden;
  background-image: url("${props => props.imagePath}");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  margin-bottom: 20px;
  aspect-ratio: 1 / 1;
  border-radius: 16px;
`

const NoPhoto = styled.div`
  aspect-ratio: 1 / 1;
  border-radius: 16px;
  background-color: rgba(3, 3, 3, 0.60);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
`

const NoPhotosSpan = styled.span`
  color: white;
  font-size: 1.2rem;
`

const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const Button = styled.button`
  display: block;
  margin: 8px;
  padding: 16px 16px 14px;
  border: none;
  border-radius: 8px;
  background-color: #262626;
  color: white;
  cursor: pointer;
  transition: 200ms;

  &:hover {
    background-color: #626262;
  }

  &:active {
    background-color: #545454;
  }

  &:disabled {
    background-color: #c9c9c9;
  }
`

const PhotoSlider = ({images}) => {
    const countOfImages = images.length;
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextSliderHandler = () => {
        if (currentImageIndex === countOfImages - 1) {
            setCurrentImageIndex(0);
            return;
        }
        setCurrentImageIndex(prevState => ++prevState);
    };
    const previousSliderHandler = () => {
        if (currentImageIndex === 0) {
            setCurrentImageIndex(countOfImages - 1);
            return;
        }
        setCurrentImageIndex(prevState => --prevState);
    }

    return (
        <PhotoSliderWrapper>
            {countOfImages ?
                <Image imagePath={images[currentImageIndex].image}></Image> :
                <NoPhoto><NoPhotosSpan>No photos</NoPhotosSpan></NoPhoto>
            }

            <ButtonsWrapper>
                <Button disabled={!countOfImages} onClick={previousSliderHandler}><BiChevronLeft style={{width: '1.5rem', height: '100%'}}/></Button>
                <Button disabled={!countOfImages} onClick={nextSliderHandler}><BiChevronRight style={{width: '1.5rem', height: '100%'}}/></Button>
            </ButtonsWrapper>
        </PhotoSliderWrapper>
    );
};

export default PhotoSlider;
