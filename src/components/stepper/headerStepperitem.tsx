import React from "react";
import { Nav,} from "react-bootstrap";
import styled from "styled-components";
import { Text } from "../../shared/text";


interface IHeaderStepperItemProp {
    stepIndex: number,
    label: string,
    currStepIndex: number,
    eventKey: string,
    isLast: boolean
}

const HeaderStepperItem: React.FC<IHeaderStepperItemProp> = (props) => {
    const { stepIndex, label, currStepIndex, eventKey, isLast } = props;

    const isFinished = () => stepIndex < currStepIndex;
    const buildSeparator = () => {
        if (isLast) return null;
        if (isFinished()) return <SeparatorLine />;
        return <SeparatorLineDisabled />;
    }

    return (
        <>
            <Nav.Item className='gx-0 d-flex gap-1 align-items-start'>
                <div className = 'd-flex flex-column align-items-center'>
                    <StepIcon className={isFinished() ? 'finished' : ''} eventKey={eventKey}>
                        {stepIndex + 1}
                    </StepIcon>
                    {buildSeparator()}
                </div>
                <Text>{label}</Text>
            </Nav.Item>
        </>
    );
}

export default HeaderStepperItem;


const SeparatorLine = styled.div`
    height: 109px;
    width: 4px;
    background-color: #FFC204;
    margin: 10px 0;
    border-radius: 25px;
`

const SeparatorLineDisabled = styled(SeparatorLine)`
    background-color: #D9D9D9;
`



const StepIcon = styled(Nav.Link)`
    background-color: #D9D9D9 !important;
    color: rgba(54, 54, 54, 0.75);
    font-weight: 400;
    font-size: 48px;
    line-height: 60px;
    text-align: center;
    width: 64px;
    height: 64px;
    padding: 0;
    border-radius: 50% !important;
    border: 4px solid transparent;
    &.active{
        background-color: #FFC204 !important;
        color: #F7F7F7 !important;
        border: 4px solid #D19F00 !important;
    }
    &.finished{
        background-color: #FFC204 !important;
        color: #363636;
        border: 4px solid #D19F00 !important;
    }
`