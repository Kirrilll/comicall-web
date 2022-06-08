import React, { useState } from "react";
import { Col, Nav, Row, Spinner, Tab } from "react-bootstrap";
import styled from "styled-components";
import { Center } from "../../shared/center";
import { FormPanel } from "../../shared/formPanel";
import InfoStep from "../steps/infoStep";
import { SubmitButton } from "../../shared/submit";
import { SecondaryButton } from '../../shared/secondaryButton';
import HeaderStepperItem from "./headerStepperitem";
import { Step, useStepper } from "../../hooks/useStepper";
import { useContext } from "react";
import { ComicsCreationContext } from "../createComicsTab";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import GenresStep from "../steps/genresStep";
import PagesStep from "../steps/pagesStep";
import PublishStep from "../steps/publisStep";
import { FetchingState } from "../../enums/fetchingState";
import { create } from "../../store/comics/thunkes/createThunk";

export interface IStep {
    content: React.ReactElement,
    name: string,
    label: string,
    isFinished: boolean
}

const ComicsStepper: React.FC<{ steps: IStep[] }> = (props) => {

    const { steps } = props;
    const {isUpdating} = useAppSelector(state => state.comicsCreationReducer)

    const { stepIndex, togleNext, toglePrev, isFirst, isLast } = useStepper(steps.map<Step>(step => ({ name: step.name, label: step.label })), [isUpdating]);

    return (
        <Center>
            <StepperPanel >
                <Tab.Container
                    id='stepper'
                    activeKey={steps[stepIndex].name}>
                    <Row style={{ height: '100%' }}>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column align-items-start">
                                {steps.map((step, index) => <HeaderStepperItem
                                    key={index}
                                    eventKey={step.name}
                                    currStepIndex={stepIndex}
                                    stepIndex={index}
                                    isLast={index === steps.length - 1}
                                    label={step.label}
                                />)}

                            </Nav>
                        </Col>
                        <Col style={{ height: '100%' }}>
                            <ContentLayout>
                                <TabContent>
                                    {steps.map((step, index) => (
                                        <TabPane key={step.name} eventKey={step.name}>
                                            {step.content}
                                        </TabPane>
                                    ))}
                                </TabContent>
                                <ControlPanel className='gap-2'>
                                    <PrevButton disabled={isFirst()} onClick={toglePrev}>Назад</PrevButton>
                                    <NextButton disabled={isLast() || !steps[stepIndex].isFinished} onClick={togleNext}>Далее</NextButton>
                                </ControlPanel>
                            </ContentLayout>
                        </Col>
                    </Row>
                </Tab.Container>
            </StepperPanel>
        </Center>
    )
}

const ControlPanel = styled.div`
    display: flex;
    justify-content: center;
    height: 42px;
`

const ContentLayout = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    gap: 10px;
`

const NextButton = styled(SubmitButton)`
    min-width: 120px;
    &:disabled{
        opacity: 0.5;
    }
`

const PrevButton = styled(SecondaryButton)`
    min-width: 120px;
    &:disabled{
        opacity: 0.5;
    }
`

const TabPane = styled(Tab.Pane)`
    height: 100%;
`

const TabContent = styled(Tab.Content)`
    height: 100%;
    max-height: 672px;
`

const StepperPanel = styled(FormPanel)`
    max-width: 1080px;
    width: 100%;
    height: 780px;
    overflow: hidden;
`

export default ComicsStepper;

function as(arg0: (step: IStep) => void, as: any, Step: any): Step[] {
    throw new Error("Function not implemented.");
}
