import React, { useState } from "react";
import { useEffect } from "react";
import { Col, Nav, Row, Spinner, Tab } from "react-bootstrap";
import styled from "styled-components";
import { Center } from "../../shared/center";
import { FormPanel } from "../../shared/formPanel";
import InfoStep from "../steps/infoStep";
import { SubmitButton } from "../../shared/submit";
import { SecondaryButton } from '../../shared/secondaryButton';
import { Text } from "../../shared/text";
import HeaderStepperItem from "./headerStepperitem";
import { useCreateComicsStep1Mutation } from "../../services/authorService";
import { Step, useStepper } from "../../hooks/useStepper";
import { useContext } from "react";
import { ComicsCreationContext } from "../createComicsTab";
import { useAppSelector } from "../../hooks/redux";
import GenresStep from "../steps/genresStep";
import PagesStep from "../steps/pagesStep";
import PublishStep from "../steps/publisStep";

const INFORMATION: string = 'info';
const GENRES: string = 'genres';
const PAGES: string = 'pages';
const PUBLISH: string = 'publish';

interface ComicsStep {
    step: Step,
    additionalAction: () => void;
}

const ComicsStepper: React.FC = () => {

    const user = useAppSelector(state => state.userReducer.user);
    const { information } = useContext(ComicsCreationContext)!;
    const [createComicsStep1, step1Response] = useCreateComicsStep1Mutation();


    const steps: Array<ComicsStep> = [
        {
            step: { name: INFORMATION, label: 'Основы' },
            additionalAction: () => createComicsStep1({ token: user!.token, ...information })
        },
        {
            step: { name: GENRES, label: 'Жанры' },
            additionalAction: () => console.log('жанры')
        },
        {
            step: { name: PAGES, label: 'Страницы' },
            additionalAction: () => console.log('страницы')
        },
        {
            step: { name: PUBLISH, label: 'Публикация' },
            additionalAction: () => console.log('публикация')
        }
    ];

    const { stepIndex, togleNext, toglePrev, isFirst, isLast } = useStepper(steps.map(step => step.step));

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        togleNext();
    }



    return (
        <Center>
            <StepperPanel >
                <Tab.Container
                    id='stepper'
                    activeKey={steps[stepIndex].step.name}>
                    <Row style={{ height: '100%' }}>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column align-items-start">
                                {steps.map((step, index) => <HeaderStepperItem
                                    key={index}
                                    eventKey={step.step.name}
                                    currStepIndex={stepIndex}
                                    stepIndex={index}
                                    isLast={index === steps.length - 1}
                                    label={step.step.label}
                                />)}

                            </Nav>
                        </Col>
                        <Col style = {{height: '100%'}}>
                            <ContentLayout>
                                <TabContent>
                                    <TabPane eventKey={INFORMATION}>
                                        <InfoStep></InfoStep>
                                    </TabPane>
                                    <TabPane eventKey={GENRES}>
                                        <GenresStep></GenresStep>
                                    </TabPane>
                                    <TabPane eventKey={PAGES}>
                                        <PagesStep></PagesStep>
                                    </TabPane>
                                    <TabPane eventKey={PUBLISH}>
                                        <PublishStep></PublishStep>
                                    </TabPane>
                                </TabContent>
                                <ControlPanel className='gap-2'>
                                    <PrevButton disabled = {isFirst()} onClick={toglePrev}>Назад</PrevButton>
                                    <NextButton disabled={step1Response.isLoading || isLast()} type='submit' onClick={togleNext}>
                                        {step1Response.isLoading
                                            ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                            : 'Далее'
                                        }
                                    </NextButton>
                                </ControlPanel>
                            </ContentLayout>
                        </Col>
                    </Row>
                </Tab.Container>
            </StepperPanel>
        </Center>
    )
}

const ControlPanel = styled.div `
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