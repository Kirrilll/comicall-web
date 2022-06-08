import React, { useEffect, useState } from "react";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import styled from "styled-components";
import Comics from "../components/comics";
import AuthorComics from "../components/authorComicsTab";
import { Background } from "../shared/background";
import { Center } from "../shared/center";
import { Title } from "../shared/title";
import ComicsStepper from "../components/stepper/comicsStepper";
import CreateComics from "../components/createComicsTab";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {comicsCreationSlice} from "../store/comics/slices/comicsCreationSlice";

const COMICS = 'comics';
const CREATION = 'creation';

const WorkplacePage: React.FC = () => {

    const [openTabKey, setOpenTabKey] = useState(COMICS);
    const dispatch = useAppDispatch();
    const isUpdating = useAppSelector(state => state.comicsCreationReducer.isUpdating);

    const selectHandler = (key: string | null) => {
        if(key == COMICS) dispatch(comicsCreationSlice.actions.reset());
        else dispatch(comicsCreationSlice.actions.startUpdate(null));
        setOpenTabKey(key!)
    };
    

    return (
        <Background>
            <Header>
            </Header>
            <Tab.Container id = 'workplace-tabs' activeKey = {openTabKey} onSelect = {selectHandler}>
                <Col className = 'pt-4'>
                    <Nav variant='pills' style = {{display: 'block'}}>
                        <div className='gx-0 d-flex justify-content-around'>
                            <Nav.Item>
                                <NavLink eventKey={COMICS}>Мои комиксы</NavLink>
                            </Nav.Item>
                            <Nav.Item>
                                <NavLink eventKey={CREATION}> Создать комикс</NavLink>
                            </Nav.Item>
                        </div>
                    </Nav>
                </Col>
                <Col>
                    <Tab.Content>
                        <Tab.Pane eventKey={COMICS} className = 'p-2'>
                            <AuthorComics></AuthorComics>
                        </Tab.Pane>
                        <Tab.Pane eventKey={CREATION} className = 'p-2'>
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