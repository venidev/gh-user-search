import styled from "styled-components";

//Div that will contain the search bar
export const DivStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Search Box input field
export const InputStyle = styled.input`
  border-radius: 0;
  height: 40px;
  width: 40%;
  text-align: center;
  &:focus {
    outline: none;
  }
`;
