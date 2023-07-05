import { useState } from 'react';
import { Button, Card, CardBody, Col, Container, Form, Input, Label, Modal, Row } from 'reactstrap';
import { APIClient } from '../../../helpers/api_helper';

// Перенес форму создания борды сюда.

export const NewBoardForm = ({ onClose, updateBoards }) => {
    const [name, setName] = useState('');

    // Сделал кастомный сабмит, потому как нет эндпоинта
    const onSubmit = async event => {
        event.preventDefault();

        const client = new APIClient();

        await client.create('/boards', {
            name,
            badge: 1,
            badgeClass: 'success',
            tasks: [],
        });

        updateBoards();
        onClose();
    };

    return (
        <>
            <div className="modal-header p-3 bg-soft-info">
                <h5
                    className="modal-title"
                    id="createboardModalLabel"
                >
                    {' '}
                    Add Board{' '}
                </h5>
                <Button
                    type="button"
                    onClick={onClose}
                    id="addBoardBtn-close"
                    className="btn-close"
                    aria-label="Close"
                ></Button>
            </div>
            <div className="modal-body">
                <Form onSubmit={onSubmit}>
                    <Row>
                        <Col lg={12}>
                            <Label
                                htmlFor="boardName"
                                className="form-label"
                            >
                                Board Name
                            </Label>
                            <Input
                                type="text"
                                className="form-control"
                                id="boardName"
                                placeholder="Enter board name"
                                value={name}
                                onChange={event => setName(event.target.value)}
                            />
                        </Col>
                        <div className="mt-4">
                            <div className="hstack gap-2 justify-content-end">
                                <button
                                    type="button"
                                    className="btn btn-light"
                                    onClick={onClose}
                                >
                                    Close
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                    id="addNewBoard"
                                >
                                    Add Board
                                </button>
                            </div>
                        </div>
                    </Row>
                </Form>
            </div>
        </>
    );
};
