import styled from "styled-components";


export const Title = styled.h3`
    position: relative;
    color: #363636;
    display: inline-block;
    margin: 0;
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 45px;
    text-align: left;
    padding: 0 20px 0 5px;
    &:after{
        content: '';
        position: absolute;
        height: 5px;
        width: 100%;
        bottom: 0;
        left: 0;
        background-color: rgba(255, 194, 4, 0.5);
        transform: translate(0, -100%);
    }
`