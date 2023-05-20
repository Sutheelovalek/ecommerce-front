/* eslint-disable @next/next/no-img-element */
import Center from "@/components/Center";
import styled from "styled-components";
import Button from "@/components/Button";
import ButtonLink from "@/components/ButtonLink";
import CartIcon from "@/components/icons/CartIcon";
import { useContext } from "react";
import { CartContext, setCartProducts } from "@/components/CartContext";

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`;
const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 3rem;
`;
const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;
const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 40px;
  img {
    max-width: 100%;
  }
`;
const Column = styled.div`
  display: flex;
  align-items: center;
`;
const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;
export default function Featured({product}) {
  const {addProduct} = useContext(CartContext)
  function addFeaturedToCart() {
    addProduct(product._id);
  }
  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <Title>{product.title}</Title>
              <Desc>
                {product.description}
                <ButtonWrapper>
                  <ButtonLink 
                  href={'/products/' + product._id}
                  outline={1} white={1}>
                    Read more
                  </ButtonLink>
                  <Button white onClick={addFeaturedToCart}>
                    <CartIcon />
                    Add to cart
                  </Button>
                </ButtonWrapper>
              </Desc>
            </div>
          </Column>
          <Column>
            <img
              src="https://images.unsplash.com/photo-1537498425277-c283d32ef9db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fG1hY2Jvb2t8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
              title="Title of image"
              alt="alt text here"
            />
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
}
