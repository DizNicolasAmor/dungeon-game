import styled, { css, createGlobalStyle } from 'styled-components';
import { FONT, COLOR } from './variables';

export const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        background: ${COLOR.WHITE};
    }
    h1, h2, h3, h4, p, div {
        font-family: ${FONT.FAMILY.MAIN};
        text-align: center;
        cursor: default;
        letter-spacing: 1px;
    }
`;

export const StatsContainer = styled.div`
    min-width: 250px;
    box-sizing: border-box;
    padding: 36px 15% 24px 15%;
    .data {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 12px auto;
        span {
            margin-left: 10px;
            text-decoration: underline;
            letter-spacing: 1px;
        }
    }
`;

export const Title = styled.div`
    font-family: ${FONT.FAMILY.TITLE};
    font-size: ${FONT.SIZE.TITLE};
    width: 100%;
    text-align: center;
    ${props => props.isResult && css`
        color: ${COLOR.MAIN};
    `}
`;

export const Button = styled.button`
    font-family: ${FONT.FAMILY.MAIN};
    font-size: ${FONT.SIZE.TEXT};
    border-radius: 3px;
    padding: 6px 12px;
    margin: 9px auto;
    color: ${COLOR.BLACK};
    letter-spacing: .6px;
    background: ${COLOR.MAIN_LIGHTER};
    border: 1px solid ${COLOR.MAIN_DARK};
    cursor: pointer;
    transition: .3s;
    &:hover {
        opacity: .8;
    }
    &:focus {
        outline-color: transparent;
    }
`;
