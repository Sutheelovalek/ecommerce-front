import { useState } from "react";
import styled from "styled-components";

const Image = styled.img`
max-width: 100%;
max-height: 100%;
`;
const BigImage = styled.img`
  max-width: 100%;
  max-height: 200px;
`;
const ImageButtons = styled.div`
display: flex;
gap: 10px;
flex-grow: 0;
margin-top: 10px;
`;
const ImageButton = styled.div`
${props => props.active 
  ? `border-color: #ccc;`
  : `border-color: transparent;
      opacity: 0.9;`
}
border: 1px solid #ccc;
height: 35px;
padding: 5px;
cursor: pointer;
border-radius: 5px;
`;
const BigImageWrapper = styled.div`
  text-align: center;
`;
export default function ProductImages({ images }) {
const [activeImage, setActiveImage] = useState(images?.[0])
  return (
    <>
      <BigImageWrapper>
       <BigImage src={activeImage} alt="product" />

      </BigImageWrapper>
      <ImageButtons>
        {images?.map((image, index) => (
          <ImageButton 
          active={image===activeImage} 
          onClick={() => setActiveImage(image)}
          key={index}>
            <Image src={image} alt="product" />
          </ImageButton>
        ))}
      </ImageButtons>
    </>
  );
}
