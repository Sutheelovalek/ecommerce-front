import { BounceLoader } from "react-spinners";
import styled from "styled-components";

const Wrapper = styled.div`
    ${
        props => props.fullWidth 
        ? `
        width: 100%;
        height: 100%;
        display: flex;
        margin-top: 60px;
        justify-content: center;
        ` : `
        border: 5px solid blue;
        `}
`;

export default function Spinner({fullWidth}) {
    return (
        <Wrapper fullWidth={fullWidth}>
            <BounceLoader speedMultiplier={3} color={'#555'} />
        </Wrapper>
        
        )
}