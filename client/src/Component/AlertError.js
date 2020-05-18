import React from 'react';
import { Alert, Col } from 'reactstrap';

const AlertError = ({ error }) => {
    // const [visible, setVisible] = useState(true);

    // const onDismiss = () => setVisible(false);

    return (
        <Col>
            {error !== "" && (
            <Alert color="danger">
                {error}
            </Alert>)}
        </Col>
    );
}

export default AlertError;