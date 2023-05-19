import styled from "styled-components";
import Button from "@/components/Button";

const ProductWrapper = styled.div`

`;

const WhiteBox = styled.div`
    background-color: #fff;
    padding: 20px;
    height: 120px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    img {
        max-width: 100%;
        max-height: 90px;
    }
`;
const Title = styled.h2`
    font-weight: normal;
    font-size: 0.9rem;
    margin: 0;
`;


export default function ProductBox({_id,title,description,price,images}) {
    return (
        <ProductWrapper>
            <WhiteBox>
                <picture> 
                    <img src={images[0]} alt={title} />  
                </picture>
            </WhiteBox>
                <Title>
                    {title}
                </Title>
            <Button primary>Add to cart</Button>
        </ProductWrapper>
    );
}