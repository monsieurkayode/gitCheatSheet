import styled from 'styled-components';

export default styled.main`
  max-width: 740px;
  margin-top: 5%;
  margin-bottom: 60px;
  padding: 0 1%;
  flex: 1;
  width: 100%;
  z-index: 100;

  @media only screen and (max-width: 424px) {
    align-self: normal;
    margin-top: 10%;
    padding: 0 2%;
  }
`;
