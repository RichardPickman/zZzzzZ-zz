import React, { useId } from 'react';
import { Card, CardBody, Input, Label } from 'reactstrap';

const Summary = ({ task }) => {
    const { tags, desc } = task;
    const id = useId();

    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <div className="text-muted">
                        <h6 className="mb-3 fw-semibold text-uppercase">Summary</h6>
                        <p>{desc}</p>

                        <div className="pt-3 border-top border-top-dashed mt-4">
                            <h6 className="mb-3 fw-semibold text-uppercase">Tasks Tags</h6>
                            <div className="hstack flex-wrap gap-2 fs-15">
                                {tags.split(' ').map(item => (
                                    <div
                                        key={id + item}
                                        className="badge fw-medium badge-soft-info"
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default Summary;
