import styled from "styled-components";
import Button from "@/components/Button";

import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";

const ProductWrapper = styled.div`

`;

const WhiteBox = styled(Link)`
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
const Title = styled(Link)`
    font-weight: normal;
    font-size: 0.9rem;
    color: inherit;
    text-decoration: none;
    margin: 0;
`;
const ProductInfoBox = styled.div`
    margin-top: 5px;
`;
const PriceRow = styled.div`
    display: block;
    gap: 5px;
    @media screen and (min-width: 768px) {
        display: flex;
        gap: 5px;
      }
    align-items: center;
    justify-content: space-between;
    margin-top: 2px;
`;
const Price = styled.div`
    font-size: 1rem;
    font-weight: 400;
    text-align: right;
    @media screen and (min-width: 768px) {
        font-size: 1.2rem;
        font-weight: 600;
        text-align: left;
      }
`;

export default function ProductBox({_id,title,description,price,images}) {
    const {addProduct} = useContext(CartContext)
    const url = '/products/' + _id;
    return (
        <ProductWrapper>
            <WhiteBox href={url}>
                <picture> 
                    <img src={images[0]} alt={title} />  
                </picture>
            </WhiteBox>
            <ProductInfoBox>
            <Title href={url}>
                    {title}
            </Title>
            <PriceRow>
                <Price>
                ฿{price.toLocaleString()}
                </Price>
            <Button 
            onClick={() => addProduct(_id)}
            primary outline block>
                Add to cart
            </Button>  
            </PriceRow>        
            </ProductInfoBox>
        </ProductWrapper>
    );
}