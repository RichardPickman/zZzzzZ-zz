import React from 'react';
import {
    Card,
    CardBody,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    UncontrolledDropdown,
} from 'reactstrap';
import { Link } from 'react-router-dom';

const TimeTracking = ({ task, board }) => {
    const { id, title, date, members } = task;

    const onDelete = async userId => console.log('Remove user:', userId);

    return (
        <React.Fragment>
            <Card>
                <CardBody className="text-center">
                    <h6 className="card-title mb-3 flex-grow-1 text-start">Time Tracking</h6>
                    <div className="mb-2">
                        <lord-icon
                            src="https://cdn.lordicon.com/kbtmbyzy.json"
                            trigger="loop"
                            colors="primary:#405189,secondary:#02a8b5"
                            style={{ width: '90px', height: '90px' }}
                        ></lord-icon>
                    </div>
                    <h3 className="mb-1">9 hrs 13 min</h3>
                    <h5 className="fs-14 mb-4">{title}</h5>
                    <div className="hstack gap-2 justify-content-center">
                        <button className="btn btn-danger btn-sm">
                            <i className="ri-stop-circle-line align-bottom me-1"></i> Stop
                        </button>
                        <button className="btn btn-success btn-sm">
                            <i className="ri-play-circle-line align-bottom me-1"></i> Start
                        </button>
                    </div>
                </CardBody>
            </Card>
            <Card className="mb-3">
                <CardBody>
                    <div className="table-card">
                        <table className="table mb-0">
                            <tbody>
                                <tr>
                                    <td className="fw-medium">Tasks No</td>
                                    <td>{id}</td>
                                </tr>
                                <tr>
                                    <td className="fw-medium">Tasks Title</td>
                                    <td>{title}</td>
                                </tr>
                                <tr>
                                    <td className="fw-medium">Project Name</td>
                                    <td>Currently unknown, possibly null</td>
                                </tr>
                                <tr>
                                    <td className="fw-medium">Priority</td>
                                    <td>
                                        <span className="badge badge-soft-danger">High</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="fw-medium">Status</td>
                                    <td>
                                        <span className="badge badge-soft-secondary">
                                            Inprogress
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="fw-medium">Due Date</td>
                                    <td>{date}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>
            <div className="card mb-3">
                <div className="card-body">
                    <div className="d-flex mb-3">
                        <h6 className="card-title mb-0 flex-grow-1">Assigned To</h6>
                        <div className="flex-shrink-0">
                            <button
                                type="button"
                                className="btn btn-soft-danger btn-sm"
                                data-bs-toggle="modal"
                                data-bs-target="#inviteMembersModal"
                            >
                                <i className="ri-share-line me-1 align-bottom"></i> Assigned Member
                            </button>
                        </div>
                    </div>
                    <ul className="list-unstyled vstack gap-3 mb-0">
                        {members.map(item => (
                            <li key={item.user + item.position}>
                                <div className="d-flex align-items-center">
                                    <div className="flex-shrink-0">
                                        <img
                                            src={item.img}
                                            alt=""
                                            className="avatar-xs rounded-circle"
                                        />
                                    </div>
                                    <div className="flex-grow-1 ms-2">
                                        <h6 className="mb-1">
                                            <Link to="/pages-profile">{item.user}</Link>
                                        </h6>
                                        <p className="text-muted mb-0">{item.position}</p>
                                    </div>
                                    <div className="flex-shrink-0">
                                        <UncontrolledDropdown>
                                            <DropdownToggle
                                                tag="button"
                                                className="btn btn-icon btn-sm fs-16 text-muted dropdown"
                                                type="button"
                                            >
                                                <i className="ri-more-fill"></i>
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <div>
                                                    <DropdownItem>
                                                        <i className="ri-eye-fill text-muted me-2 align-bottom"></i>
                                                        View
                                                    </DropdownItem>
                                                </div>
                                                <div>
                                                    <DropdownItem>
                                                        <i className="ri-star-fill text-muted me-2 align-bottom"></i>
                                                        Favourite
                                                    </DropdownItem>
                                                </div>
                                                <div>
                                                    <DropdownItem onClick={() => onDelete(item.id)}>
                                                        <i className="ri-delete-bin-5-fill text-muted me-2 align-bottom"></i>
                                                        Delete
                                                    </DropdownItem>
                                                </div>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </React.Fragment>
    );
};

export default TimeTracking;
