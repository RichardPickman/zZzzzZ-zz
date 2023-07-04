import React from 'react';
import Board from '@lourenci/react-kanban';
import { Row, Col, Button } from 'reactstrap';
import CardTaskBox from './taskCard';
import RenderCardTitle from './HeaderComponets';

const UncontrolledBoard = props => {
    const content = props.board;

    return (
        <React.Fragment>
            <Row className="mb-4">
                <Col>
                    <Board
                        initialBoard={content}
                        renderColumnHeader={({ id, name, badge, badgeClass }) => (
                            <Col className="me-4">
                                <RenderCardTitle
                                    name={name}
                                    badge={badge}
                                    badgeClass={badgeClass}
                                />
                                <Button
                                    color="info"
                                    className="btn-soft-info w-100 p-r-2"
                                    onClick={() => {
                                        props.toggleNewTaskModal(id);
                                    }}
                                >
                                    Add More
                                </Button>
                            </Col>
                        )}
                        renderCard={(data, { dragging }) => (
                            <CardTaskBox
                                data={data}
                                dragging={dragging}
                                updateBoards={props.updateBoards}
                                toggleNewTaskModal={props.toggleNewTaskModal}
                            >
                                {data}
                            </CardTaskBox>
                        )}
                        onNewCardConfirm={draftCard => ({
                            id: new Date().getTime(),
                            ...draftCard,
                        })}
                    />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default UncontrolledBoard;
