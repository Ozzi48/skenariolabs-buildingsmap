import styled from 'styled-components'

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
