import React, { useCallback, useLayoutEffect, useState } from 'react';
import SimpleBar from 'simplebar-react';
import { Button, Card, CardBody, Col, Container, Form, Input, Label, Modal, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { map } from 'lodash';
import UncontrolledBoard from './UncontrolledBoard';
import BreadCrumb from '../../../Components/Common/BreadCrumb';

// Import Images
import avatar1 from '../../../assets/images/users/avatar-1.jpg';
import avatar2 from '../../../assets/images/users/avatar-2.jpg';
import avatar3 from '../../../assets/images/users/avatar-3.jpg';
import avatar5 from '../../../assets/images/users/avatar-5.jpg';
import avatar6 from '../../../assets/images/users/avatar-6.jpg';
import avatar7 from '../../../assets/images/users/avatar-7.jpg';
import avatar8 from '../../../assets/images/users/avatar-8.jpg';
import avatar10 from '../../../assets/images/users/avatar-10.jpg';
import { APIClient } from '../../../helpers/api_helper';
import { NewBoardForm } from './NewBoardForm';
import { NewTaskForm } from './NewTaskForm';

const KanbanBoard = () => {
    const [modal_board, setmodal_board] = useState(false);
    const tog_board = () => {
        setmodal_board(!modal_board);
    };

    const [modal_member, setmodal_member] = useState(false);
    const tog_member = () => {
        setmodal_member(!modal_member);
    };

    const [modal_newTask, setmodal_newTask] = useState(false);
    const tog_newTask = () => {
        setmodal_newTask(!modal_newTask);
    };

    const [modal_delete, setmodal_delete] = useState(false);
    const tog_delete = () => {
        setmodal_delete(!modal_delete);
    };

    const [boards, setBoards] = useState([]);
    const [data, setData] = useState([]);

    // Данная функция отправляет Гет запрос в базу и потом сетает стейт для борды.
    const updateBoards = useCallback(async () => {
        const client = new APIClient();
        const response = await client.get(`/boards`);

        const columns = map(response, task => ({ ...task, cards: task.tasks }));

        setData(columns);
        setBoards(response);
    }, []);

    // Этот лейаут эффект нужен для самого первого загрузки страницы, чтобы отрисовать текущие борды
    useLayoutEffect(() => {
        updateBoards();
    }, [updateBoards]);

    data.length = Math.min(data.length, 6);

    document.title = 'Kanban Board | Velzon - React Admin & Dashboard Template';
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb
                        title="Kanban Board"
                        pageTitle="Tasks"
                    />
                    <Card>
                        <CardBody>
                            <Row className="g-2">
                                <Col className="col-lg-auto">
                                    <div className="hstack gap-2">
                                        <Button
                                            color="primary"
                                            onClick={() => {
                                                tog_board();
                                            }}
                                        >
                                            <i className="ri-add-line align-bottom me-1"></i> Create
                                            Board
                                        </Button>
                                    </div>
                                </Col>
                                <Col
                                    lg={3}
                                    className="col-auto"
                                >
                                    <div className="search-box">
                                        <Input
                                            type="text"
                                            className="form-control search"
                                            placeholder="Search for project, tasks..."
                                        />
                                        <i className="ri-search-line search-icon"></i>
                                    </div>
                                </Col>
                                <Col className="col-auto ms-sm-auto">
                                    <div
                                        className="avatar-group"
                                        id="newMembar"
                                    >
                                        <Link
                                            to="#"
                                            className="avatar-group-item"
                                        >
                                            <img
                                                src={avatar5}
                                                alt=""
                                                className="rounded-circle avatar-xs"
                                            />
                                        </Link>
                                        <Link
                                            to="#"
                                            className="avatar-group-item"
                                        >
                                            <img
                                                src={avatar3}
                                                alt=""
                                                className="rounded-circle avatar-xs"
                                            />
                                        </Link>
                                        <Link
                                            to="#"
                                            className="avatar-group-item"
                                        >
                                            <img
                                                src={avatar10}
                                                alt=""
                                                className="rounded-circle avatar-xs"
                                            />
                                        </Link>
                                        <Link
                                            to="#"
                                            className="avatar-group-item"
                                        >
                                            <img
                                                src={avatar8}
                                                alt=""
                                                className="rounded-circle avatar-xs"
                                            />
                                        </Link>
                                        <Link
                                            to="#"
                                            className="avatar-group-item"
                                        >
                                            <img
                                                src={avatar2}
                                                alt=""
                                                className="rounded-circle avatar-xs"
                                            />
                                        </Link>
                                        <Link
                                            to="#addmemberModal"
                                            className="avatar-group-item"
                                            onClick={() => tog_member()}
                                        >
                                            <div className="avatar-xs">
                                                <div className="avatar-title rounded-circle">+</div>
                                            </div>
                                        </Link>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>

                    {data.length === 0 ? null : (
                        <UncontrolledBoard
                            board={{ columns: data }}
                            content={boards}
                            updateBoards={updateBoards}
                            toggleNewTaskModal={tog_newTask}
                        />
                    )}

                    {/* Add Member */}
                    <Modal
                        id="addmemberModal"
                        isOpen={modal_member}
                        toggle={() => {
                            tog_member();
                        }}
                        className="border-0"
                    >
                        <div className="modal-header p-3 bg-soft-warning">
                            <h5
                                className="modal-title"
                                id="addmemberModalLabel"
                            >
                                {' '}
                                Add Member{' '}
                            </h5>
                            <Button
                                type="button"
                                className="btn-close"
                                onClick={() => {
                                    setmodal_member(false);
                                }}
                                aria-label="Close"
                            ></Button>
                        </div>
                        <div className="modal-body">
                            <Form>
                                <Row className="g-3">
                                    <Col lg={12}>
                                        <Label
                                            htmlFor="submissionidInput"
                                            className="form-label"
                                        >
                                            Submission ID
                                        </Label>
                                        <Input
                                            type="number"
                                            className="form-control"
                                            id="submissionidInput"
                                            placeholder="Submission ID"
                                        />
                                    </Col>
                                    <Col lg={12}>
                                        <Label
                                            htmlFor="profileimgInput"
                                            className="form-label"
                                        >
                                            Profile Images
                                        </Label>
                                        <Input
                                            className="form-control"
                                            type="file"
                                            id="profileimgInput"
                                        />
                                    </Col>
                                    <Col lg={6}>
                                        <Label
                                            htmlFor="firstnameInput"
                                            className="form-label"
                                        >
                                            First Name
                                        </Label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            id="firstnameInput"
                                            placeholder="Enter firstname"
                                        />
                                    </Col>
                                    <Col lg={6}>
                                        <Label
                                            htmlFor="lastnameInput"
                                            className="form-label"
                                        >
                                            Last Name
                                        </Label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            id="lastnameInput"
                                            placeholder="Enter lastname"
                                        />
                                    </Col>
                                    <Col lg={12}>
                                        <Label
                                            htmlFor="designationInput"
                                            className="form-label"
                                        >
                                            Designation
                                        </Label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            id="designationInput"
                                            placeholder="Designation"
                                        />
                                    </Col>
                                    <Col lg={12}>
                                        <Label
                                            htmlFor="titleInput"
                                            className="form-label"
                                        >
                                            Title
                                        </Label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            id="titleInput"
                                            placeholder="Title"
                                        />
                                    </Col>
                                    <Col lg={6}>
                                        <Label
                                            htmlFor="numberInput"
                                            className="form-label"
                                        >
                                            Phone Number
                                        </Label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            id="numberInput"
                                            placeholder="Phone number"
                                        />
                                    </Col>
                                    <Col lg={6}>
                                        <Label
                                            htmlFor="joiningdateInput"
                                            className="form-label"
                                        >
                                            Joining Date
                                        </Label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            id="joiningdateInput"
                                            data-provider="flatpickr"
                                            placeholder="Select date"
                                        />
                                    </Col>
                                    <Col lg={12}>
                                        <Label
                                            htmlFor="emailInput"
                                            className="form-label"
                                        >
                                            Email ID
                                        </Label>
                                        <Input
                                            type="email"
                                            className="form-control"
                                            id="emailInput"
                                            placeholder="Email"
                                        />
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                        <div className="modal-footer">
                            <Button
                                color="light"
                                onClick={() => {
                                    tog_member();
                                }}
                            >
                                <i className="ri-close-line align-bottom me-1"></i> Close
                            </Button>
                            <Button
                                color="success"
                                id="addMember"
                            >
                                Add Member
                            </Button>
                        </div>
                    </Modal>

                    {/* Add Board */}
                    <Modal
                        isOpen={modal_board}
                        toggle={() => {
                            tog_board();
                        }}
                        centered
                        id="createboardModal"
                        className="border-0"
                    >
                        <NewBoardForm
                            onClose={() => setmodal_board(false)}
                            updateBoards={updateBoards}
                        />
                    </Modal>

                    {/* Create New Task */}
                    <Modal
                        size="lg"
                        isOpen={modal_newTask}
                        toggle={() => {
                            tog_newTask();
                        }}
                        centered
                        id="creatertaskModal"
                        className="border-0"
                    >
                        <NewTaskForm
                            onClose={() => setmodal_newTask(false)}
                            updateBoards={updateBoards}
                        />
                    </Modal>

                    {/* Не понимаю зачем здесь модалка висит, так как выше в UncontrolledBoard создается новая модалка и в том компоненте доступны данные открытой таски */}
                    {/* Delete Record Modal */}
                    <Modal
                        isOpen={modal_delete}
                        toggle={() => {
                            tog_delete();
                        }}
                        centered
                        modalClassName="zoomIn"
                        id="deleteRecordModal"
                    >
                        <div className="modal-header">
                            <Button
                                type="button"
                                onClick={() => {
                                    setmodal_delete(false);
                                }}
                                className="btn-close"
                                aria-label="Close"
                            ></Button>
                        </div>
                        <div className="modal-body">
                            <div className="mt-2 text-center">
                                <lord-icon
                                    src="https://cdn.lordicon.com/gsqxdxog.json"
                                    trigger="loop"
                                    colors="primary:#f7b84b,secondary:#f06548"
                                    style={{ width: '100px', height: '100px' }}
                                ></lord-icon>
                                <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                                    <h4>Are you sure ?</h4>
                                    <p className="text-muted mx-4 mb-0">
                                        Are you sure you want to remove this tasks ?
                                    </p>
                                </div>
                            </div>
                            <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                                <Button
                                    color="light"
                                    className="w-sm"
                                    onClick={() => setmodal_delete(false)}
                                >
                                    Close
                                </Button>
                                <Button
                                    color="danger"
                                    className="w-sm"
                                    id="delete-record"
                                >
                                    Yes, Delete It!
                                </Button>
                            </div>
                        </div>
                    </Modal>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default KanbanBoard;
