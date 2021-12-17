import styled from 'styled-components'
import { FaTimes } from 'react-icons/fa';

export const FormInput = styled.input`
  padding: 0 31px 0 7px;
  height: 36px;
  margin: 0px;
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.3);
`;

export const FormLabel = styled.p`
  color: black;
  margin: 5px;

  @media screen and (min-width: 668px) and (max-width: 991px) {
    margin: 2px;
    }
`;

export const DescriptionInput = styled.textarea`
  width: 280px;
  height: 100px;
  padding: 6px 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
`;

export const FormButton = styled.button`
  border-radius: 10px;
  background-color: ${({color}) => color};
  border: none;
  color: white;
  padding: 16px 32px;
  cursor: pointer;

  &:disabled {
    opacity: 0.5
  }

  @media screen and (min-width: 668px) and (max-width: 991px) {
        padding: 14px 28px;
    }

  @media screen and (max-width: 668px){
        padding: 8px 14px;
    }
`;

export const FormContainer = styled.div`
    width: 350px;
    background: white;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 5px;
`;

export const MainFormContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px;

  @media screen and (max-width: 668px){
      justify-content: center;
      }
`;

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
`;

export const CloseIcon = styled(FaTimes)`
    color: #000;
`;

export const Icon = styled.div`
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    background: transparent;
    font-size: 2rem;
    cursor: pointer;
    outline: none;
`;
