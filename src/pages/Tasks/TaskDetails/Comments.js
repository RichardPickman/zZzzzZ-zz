import React, { useId, useState } from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Modal,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    Table,
    TabPane,
    UncontrolledDropdown,
} from 'reactstrap';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

//SimpleBar
import SimpleBar from 'simplebar-react';

import avatar8 from '../../../assets/images/users/avatar-8.jpg';

const Comment = props => {
    return (
        <div className="d-flex mb-4">
            <div className="flex-shrink-0">
                <img
                    src={props.data.image}
                    alt=""
                    className="avatar-xs rounded-circle"
                />
            </div>
            <div className="flex-grow-1 ms-3">
                <h5 className="fs-13">
                    <Link to="/pages-profile">{props.data.user}</Link>{' '}
                    <small className="text-muted">{props.data.time}</small>
                </h5>
                <p className="text-muted">{props.data.text}</p>
                <Link
                    to="#"
                    className="badge text-muted bg-light"
                >
                    <i className="mdi mdi-reply"></i> Reply
                </Link>
                {props.data.replies.map(item => (
                    <div
                        className="d-flex mt-4"
                        key={item.time}
                    >
                        <div className="flex-shrink-0">
                            <img
                                src={item.image}
                                alt=""
                                className="avatar-xs rounded-circle"
                            />
                        </div>
                        <div className="flex-grow-1 ms-3">
                            <h5 className="fs-13">
                                <Link to="/pages-profile">{item.name}</Link>{' '}
                                <small className="text-muted">{item.time}</small>
                            </h5>
                            <p className="text-muted">{item.text}</p>
                            <Link
                                to="#"
                                className="badge text-muted bg-light"
                            >
                                <i className="mdi mdi-reply"></i> Reply
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Comments = ({ task }) => {
    const id = useId();
    const [activeTab, setActiveTab] = useState('1');
    const toggleTab = tab => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    const [modalInfo, setModalInfo] = useState({ isOpen: false, id: '' });

    return (
        <React.Fragment>
            <Card>
                <CardHeader>
                    <div>
                        <Nav
                            className="nav-tabs-custom rounded card-header-tabs border-bottom-0"
                            role="tablist"
                        >
                            <NavItem>
                                <NavLink
                                    href="#"
                                    className={classnames({ active: activeTab === '1' })}
                                    onClick={() => {
                                        toggleTab('1');
                                    }}
                                >
                                    Comments (5)
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    href="#"
                                    className={classnames({ active: activeTab === '2' })}
                                    onClick={() => {
                                        toggleTab('2');
                                    }}
                                >
                                    Time Entries
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </div>
                </CardHeader>
                <CardBody>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            <h5 className="card-title mb-4">Comments</h5>
                            <SimpleBar
                                style={{ height: '508px' }}
                                className="px-3 mx-n3 mb-2"
                            >
                                <div className="d-flex mb-4">
                                    {task.comments.map(item => (
                                        <Comment
                                            key={item.time}
                                            data={item}
                                        />
                                    ))}
                                </div>
                            </SimpleBar>
                            <form className="mt-4">
                                <Row className="g-3">
                                    <Col lg={12}>
                                        <label
                                            htmlFor="exampleFormControlTextarea1"
                                            className="form-label"
                                        >
                                            Leave a Comments
                                        </label>
                                        <textarea
                                            className="form-control bg-light border-light"
                                            id="exampleFormControlTextarea1"
                                            rows="3"
                                            placeholder="Enter comments"
                                        ></textarea>
                                    </Col>
                                    <Col
                                        xs={12}
                                        className="text-end"
                                    >
                                        <button
                                            type="button"
                                            className="btn btn-ghost-secondary btn-icon waves-effect me-1"
                                        >
                                            <i className="ri-attachment-line fs-16"></i>
                                        </button>
                                        <Link
                                            to="#"
                                            className="btn btn-success"
                                        >
                                            Post Comments
                                        </Link>
                                    </Col>
                                </Row>
                            </form>
                        </TabPane>
                        <TabPane tabId="2">
                            <h6 className="card-title mb-4 pb-2">
                                Time Entries - Не реализовано пока что
                            </h6>
                        </TabPane>
                    </TabContent>
                </CardBody>
            </Card>

            <Modal
                id="addmemberModal"
                isOpen={modalInfo.isOpen}
                toggle={() =>
                    setModalInfo({ ...modalInfo, isOpen: modalInfo.isOpen ? false : true })
                }
                className="border-0"
            ></Modal>
        </React.Fragment>
    );
};

export default Comments;
