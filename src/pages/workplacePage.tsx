import React from "react";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import styled from "styled-components";
import Comics from "../components/comics";
import AuthorComics from "../components/authorComicsTab";
import { Background } from "../shared/background";
import { Center } from "../shared/center";
import { Title } from "../shared/title";
import ComicsStepper from "../components/stepper/comicsStepper";
import CreateComics from "../components/createComicsTab";

const WorkplacePage: React.FC = () => {
    return (
        <Background>
            <Header>
            </Header>
            <Tab.Container id = 'workplace-tabs' defaultActiveKey="first">
                <Col className = 'pt-4'>
                    <Nav variant='pills' style = {{display: 'block'}}>
                        <div className='gx-0 d-flex justify-content-around'>
                            <Nav.Item>
                                <NavLink eventKey="first">Мои комиксы</NavLink>
                            </Nav.Item>
                            <Nav.Item>
                                <NavLink eventKey="second"> Создать комикс</NavLink>
                            </Nav.Item>
                        </div>
                    </Nav>
                </Col>
                <Col>
                    <Tab.Content>
                        <Tab.Pane eventKey="first" className = 'p-2'>
                            <AuthorComics></AuthorComics>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second" className = 'p-2'>
                            <CreateComics></CreateComics>
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Tab.Container>
        </Background>

    )
}

export default WorkplacePage;

const NavLink = styled(Nav.Link)`
    font-weight: 700;
    color: rgba(54, 54, 54, 0.8);
    font-size: 48px;
    line-height: 30px;
    border-radius: 0 !important;

    &:hover{
        color: #000000;
    }

    &.active{
        background-color: transparent !important;
        color: #363636 !important;
        position: relative;
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
    }
`

const Header = styled.header`
    width: 100%;
    height: 92px;
    background-color: #FFC204;
    display:flex;
`