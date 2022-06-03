import React, { useState } from "react";
import { useEffect } from "react";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import styled from "styled-components";
import { Center } from "../../shared/center";
import { FormPanel } from "../../shared/formPanel";
import InfoStep from "../steps/infoStep";
import { SubmitButton } from "../../shared/submit";
import { SecondaryButton } from '../../shared/secondaryButton';
import { Text } from "../../shared/text";
import HeaderStepperItem from "./headerStepperitem";

const INFORMATION: string = 'info';
const GENRES: string = 'genres';
const PAGES: string = 'pages';
const PUBLISH: string = 'publish';


const ComicsStepper: React.FC = () => {

    const [stepIndex, setStepIndex] = useState(0);
    const steps: Array<{ name: string, label: string }> = [
        { name: INFORMATION, label: 'Основы' },
        { name: GENRES, label: 'Жанры' },
        { name: PAGES, label: 'Страницы' },
        { name: PUBLISH, label: 'Публикация' }
    ];

    const togleNext = () => {
        if (!isLast()) setStepIndex(stepIndex + 1);
    }
    const toglePrev = () => {
        if (!isFirst()) setStepIndex(stepIndex - 1);
    }
    const isFirst = () => stepIndex == 0;
    const isLast = () => stepIndex == steps.length - 1;


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
                        <Col>
                            <ContentLayout>
                                <TabContent>
                                    <TabPane eventKey={INFORMATION}>
                                        <InfoStep></InfoStep>
                                    </TabPane>
                                    <TabPane eventKey={GENRES}>
                                        <div>sfsf</div>
                                    </TabPane>
                                    <TabPane eventKey={PAGES}>
                                        <div>wvw eb</div>
                                    </TabPane>
                                    <TabPane eventKey={PUBLISH}>
                                        <div>464646</div>
                                    </TabPane>
                                </TabContent>
                                <div className='d-flex flex-row gap-2 justify-content-center'>
                                    <PrevButton onClick={toglePrev}>Назад</PrevButton>
                                    <NextButton onClick={togleNext}>Далее</NextButton>
                                </div>
                            </ContentLayout>

                        </Col>
                    </Row>
                </Tab.Container>
            </StepperPanel>
        </Center>
    )
}

const ContentLayout = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const NextButton = styled(SubmitButton)`
    min-width: 120px;
`

const PrevButton = styled(SecondaryButton)`
    min-width: 120px;
`

const TabPane = styled(Tab.Pane)`
    height: 100%;
`

const TabContent = styled(Tab.Content)`
    height: 100%;
`

const StepperPanel = styled(FormPanel)`
    max-width: 1080px;
    width: 100%;
    height: 780px;
`

export default ComicsStepper;