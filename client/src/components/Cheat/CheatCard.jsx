import React from 'react';
import styled from 'styled-components';
import CheatCommand from './CheatCommand';

const Container = styled.div`
  margin: 0 2%;
  padding-bottom: 20px;
  min-width: 300px;
  break-inside: avoid;

  header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;

    .heading {
      color: #6756b3;
      font-size: 18px;
      padding: 14px 0;
      font-family: Roboto, sans-serif;
      font-weight: 400;

      @media only screen and (max-width: 768px) {
        font-size: 16px;
      }
    }

    &::after {
      content: "";
      flex-grow: 1;
      border-bottom: 1px solid transparent;
      border-image-source: linear-gradient(
        90deg, rgba(0,0,0,0.2) 20%, rgba(0,0,0,0.05) 80%);
      border-image-slice: 1;
      margin-left: 24px;
    }
  }

  .body-area {
    box-shadow: inset 1px 4px 20px 0px rgba(0,0,0,0.1),
      1px 4px 20px -4px rgba(0,0,0,0.1),
      -1px 3px 20px -4px rgba(0,0,0,0.1);
  
    .commands {
      background: #FFF;
      padding: 16px 20px;

      .command {
        font-family: Cousine, sans-serif;
        line-height: 20px;
        font-size: 13px;

        .git {
          color: teal;
        }

        @media only screen and (max-width: 768px) {
          font-size: 12px;
        }
      }
    }

    .description {
      background: #f5f6f7;
      padding: 12px 20px;
      font-size: 14px;
      font-family: Prompt;
      font-weight: 100;
      color: #668090;

      @media only screen and (max-width: 768px) {
        font-size: 12px;
      }
    }
  }
`;

const CheatCard = () => (
  <Container>
    <header>
      <h6 className="heading">Install Git From Homebrew</h6>
    </header>
    <main className="body-area">
      <div className="commands">
        <CheatCommand />
        <CheatCommand />
      </div>
      <div className="description">
        Description of command goes here of command goes here
      </div>
    </main>
  </Container>
);

export default CheatCard;
