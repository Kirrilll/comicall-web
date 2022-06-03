import styled from "styled-components";

export const SamllText = styled.div`
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    text-align: center;
    color: rgba(54, 54, 54, 0.75);
`;

export const Text = styled.div`
    color: #363636;
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 30px;
    font-family: 'Caveat';
`;

export const ErrorText = styled(Text) `
    color: #D22323;
`;

export const SuccessfulText = styled(Text)`
    color: #6ee041;
`
