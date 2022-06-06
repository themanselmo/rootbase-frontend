import styled from 'styled-components';

export const LandingForm = styled.form<{ theme: any; isLoading?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  button {
    border: none;
    width: 93%;
    height: 25px;
    background: ${({ theme }) => theme.palette.secondary.main};
    border-radius: 4px;
    cursor: pointer;
    color: white;
    padding: 5px;
    font-weight: 700;
    transition: 250ms all;
    display: flex;
    align-items: center;
    justify-content: center;
    filter: ${({ isLoading }) => (isLoading ? 'brightness(85%)' : 'unset')};
    :hover {
      filter: brightness(85%);
    }
  }

  input {
    background: white;
    border: 1px solid gray;
    outline: none !important;
    color: #1e2124;
    transition: 250ms all;
    width: 90%;
    ::placeholder {
      color: #1e2124;
    }

    :focus {
      outline: none !important;
      border: 1px solid ${({ theme }) => theme.palette.secondary.main};
    }
  }
`;
