import styled from 'styled-components'

export const MainContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    position: absolute;
`;

export const BuildingCard = styled.div`
    background: "#fff";
    width: 300px;
    height: 200px;
    margin: 10px;
    margin-top: 40px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    box-shadow: 2px 2px 14px -3px rgba(22,30,84,0.79);
`;

export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const BuildingName = styled.h2`
    margin: 5px;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 15px
`