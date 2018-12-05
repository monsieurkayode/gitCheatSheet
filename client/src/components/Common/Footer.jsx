import React from 'react';
import styled from 'styled-components';

const Container = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 740px;
  margin: 0 auto;
  padding: 0 8px;
  border-top: 1px solid rgba(0,0,0,0.1);
  padding: 16px;
  font-size: 14px;
  font-family: Prompt, sans-serif;
  width: 100%;
  user-select: none;

  p {
    span {
      background: #6756b3;
      color: #fff;
      padding: 4px 10px;
      border-radius: 15px;
      font-size: 12px;
    }
  }
`;

const Footer = () => (
  <Container>
    <p>&copy;&nbsp;2018</p>
    <p>Inspired By&nbsp;<span>devhints.io</span></p>
  </Container>
);

export default Footer;
