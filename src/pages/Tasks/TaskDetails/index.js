import React, { useLayoutEffect, useState } from 'react';
import { Container, Col, Row } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import Comments from './Comments';
import Summary from './Summary';
import TimeTracking from './TimeTracking';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { APIClient } from '../../../helpers/api_helper';

const TaskDetails = () => {
    document.title = 'Tasks Details | Velzon - React Admin & Dashboard Template';

    const { id } = useParams();
    const [task, setTask] = useState(null);
    const [board, setBoard] = useState(null);

    useLayoutEffect(() => {
        const getData = async () => {
            const client = new APIClient();

            const taskResponse = await client.get(`/tasks/${id}`);
            const boardsResponse = await client.get(`/boards/${taskResponse.boardId}`);

            setTask(taskResponse);
            setBoard(boardsResponse);
        };

        getData();
    }, [id]);

    if (!task) {
        return null;
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb
                        title="Tasks Details"
                        pageTitle="Tasks"
                    />
                    <Row>
                        <Col xxl={3}>
                            <TimeTracking
                                task={task}
                                board={board}
                            />
                        </Col>
                        <Col xxl={9}>
                            <Summary
                                task={task}
                                board={board}
                            />
                            <Comments
                                task={task}
                                board={board}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default TaskDetails;
