import styled from 'styled-components'

export const UpdateFormMainContainer = styled.div`
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 900px;

    @media screen and (min-width: 668px) and (max-width: 991px) {
        height: 100%;
    }

    @media screen and (max-width: 668px){
        height: 100%;
        background: transparent;
        align-items: flex-start;
    }
`;

export const UpdateFormContainer = styled.div`
    width: 500px;
    height: 850px;
    background: white;
    justify-content: center;
    align-items: center;
    display: flex;

    @media screen and (min-width: 668px) and (max-width: 991px) {
        width: 450px;
    }

    @media screen and (max-width: 668px){
        width: 350px;
    }
`