import { useState } from 'react';
import { Button, Col, Form, Input, Label, Row } from 'reactstrap';
import SimpleBar from 'simplebar-react';
import { APIClient } from '../../../helpers/api_helper';

const users = [
    {
        id: 1,
        name: 'anna-adame',
        img: 'asdasd',
    },
    {
        id: 2,
        name: 'anna-adame',
        img: 'asdasd',
    },
    {
        id: 3,
        name: 'anna-adame',
        img: 'asdasd',
    },
    {
        id: 4,
        name: 'anna-adame',
        img: 'asdasd',
    },
    {
        id: 5,
        name: 'anna-adame',
        img: 'asdasd',
    },
    {
        id: 6,
        name: 'anna-adame',
        img: 'asdasd',
    },
    {
        id: 7,
        name: 'anna-adame',
        img: 'asdasd',
    },
    {
        id: 8,
        name: 'anna-adame',
        img: 'asdasd',
    },
];

export const NewTaskForm = ({ id, onClose, updateBoards }) => {
    const [task, setTask] = useState({
        name: '',
        title: '',
        description: '',
        members: [],
        date: '',
        tag: '',
        progress: '',
    });

    /*
        Также кастомный сабмит. Пытался использовать формик, но он кусок говна. Мне не понравилось :).
        В целом после сабмита я просто пробегаю по всем значениям и добавляю в форм дату, потому что писать огромный обработчик для картинок это ужас.
    */

    const onSubmit = async event => {
        event.preventDefault();

        const client = new APIClient();

        try {
            await client.create('/tasks', task);

            console.log('Task create successfully');
        } catch (e) {
            console.log(e);
        } finally {
            onClose();
            updateBoards();
        }
    };

    /*
        Ниже обработчик участников текущей таски который хендлит добавление через чекбокс.
    */

    const handleCheckbox = (event, id) => {
        const isChecked = event.target.checked;
        const isIncludes = task.members.includes(id);

        // Удалить айдишник если он присутствует в массиве, иначе ничего не делает
        const removeId = () =>
            isIncludes && setTask({ ...task, members: task.members.filter(item => item !== id) });

        // Здеьс я просто добавляю айдишник в массив
        const addId = () => setTask({ ...task, members: [...task.members, id] });

        // Ну то что ниже происходит думаю понятно.
        if (isChecked) {
            removeId();
            addId();
        }

        if (!isChecked) {
            removeId();
        }
    };

    // Это у нас тут базовый сеттер, который принимает строку в качестве ключа и добавляет его в текущий стейт
    const setValue = (key, value) => setTask({ ...task, [key]: value });

    // Здесь я просто возвращаю массив элементов с типом File, потому что нативный event.target.files возвращает Array Like объект
    const getImages = event => [...Array.from(event.target.files)];

    // ХТМЛ я почти не  менял, единственное что урезал хардкоженное ul -> li дерево с мокнутыми участниками. Так как эндпоинта для получения юзеров у меня нет.
    return (
        <>
            <div className="modal-header p-3 bg-soft-info">
                <h5
                    className="modal-title"
                    id="creatertaskModalLabel"
                >
                    {' '}
                    Create New Task{' '}
                </h5>
                <Button
                    onClick={onClose}
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                ></Button>
            </div>
            <div className="modal-body">
                <Form onSubmit={onSubmit}>
                    <Row className="g-3">
                        <Col lg={12}>
                            <Label
                                htmlFor="projectName"
                                className="form-label"
                            >
                                Project Name
                            </Label>
                            <Input
                                type="text"
                                className="form-control"
                                id="projectName"
                                placeholder="Enter project name"
                                onChange={event => setValue('name', event.target.value)}
                            />
                        </Col>
                        <Col lg={12}>
                            <Label
                                htmlFor="sub-tasks"
                                className="form-label"
                            >
                                Task Title
                            </Label>
                            <Input
                                type="text"
                                className="form-control"
                                id="sub-tasks"
                                placeholder="Task title"
                                onChange={event => setValue('title', event.target.value)}
                            />
                        </Col>
                        <Col lg={12}>
                            <Label
                                htmlFor="task-description"
                                className="form-label"
                            >
                                Task Description
                            </Label>
                            <textarea
                                className="form-control"
                                id="task-description"
                                rows="3"
                                onChange={event => setValue('description', event.target.value)}
                            ></textarea>
                        </Col>
                        <Col lg={12}>
                            <Label
                                htmlFor="tasks-progress"
                                className="form-label"
                            >
                                Add Team Member
                            </Label>
                            <SimpleBar style={{ height: '95px' }}>
                                <ul className="list-unstyled vstack gap-2 mb-0">
                                    {users.map(user => (
                                        <li key={user.id}>
                                            <div className="form-check d-flex align-items-center">
                                                <Input
                                                    className="form-check-input me-3"
                                                    type="checkbox"
                                                    id={user.name}
                                                    onChange={event =>
                                                        handleCheckbox(event, user.id)
                                                    }
                                                />
                                                <Label
                                                    className="form-check-label d-flex align-items-center"
                                                    htmlFor={user.name}
                                                >
                                                    <span className="flex-shrink-0">
                                                        <img
                                                            src={user.img}
                                                            alt=""
                                                            className="avatar-xxs rounded-circle"
                                                        />
                                                    </span>
                                                    <span className="flex-grow-1 ms-2">
                                                        {user.name}
                                                    </span>
                                                </Label>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </SimpleBar>
                        </Col>
                        <Col lg={4}>
                            <Label
                                htmlFor="due-date"
                                className="form-label"
                            >
                                Due Date
                            </Label>
                            <Input
                                type="text"
                                className="form-control"
                                id="due-date"
                                data-provider="flatpickr"
                                placeholder="Select date"
                                onChange={event => setValue('date', event.target.value)}
                            />
                        </Col>
                        <Col lg={4}>
                            <Label
                                htmlFor="categories"
                                className="form-label"
                            >
                                Tags
                            </Label>
                            <Input
                                type="text"
                                className="form-control"
                                id="categories"
                                placeholder="Enter tag"
                                onChange={event => setValue('tag', event.target.value)}
                            />
                        </Col>
                        <Col lg={4}>
                            <Label
                                htmlFor="tasks-progress"
                                className="form-label"
                            >
                                Tasks Progress
                            </Label>
                            <Input
                                type="text"
                                className="form-control"
                                maxLength="3"
                                id="tasks-progress"
                                placeholder="Enter progress"
                                onChange={event => setValue('progress', event.target.value)}
                            />
                        </Col>
                        <div className="mt-4">
                            <div className="hstack gap-2 justify-content-end">
                                <Button
                                    color="light"
                                    onClick={onClose}
                                >
                                    Close
                                </Button>
                                <Button
                                    type="submit"
                                    color="success"
                                >
                                    Add Task
                                </Button>
                            </div>
                        </div>
                    </Row>
                </Form>
            </div>
        </>
    );
};
