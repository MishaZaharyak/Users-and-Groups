import React, {Fragment, useEffect} from 'react';
import { useAlert } from 'react-alert';
import { connect } from 'react-redux';


const Alerts = ({ errors, messages }) => {
    const alert = useAlert();

    const showErrors = (err) => {
        const msg = err.msg;

        for (let key in msg) {

            if (msg.hasOwnProperty(key)) {

                const errText = (<div>
                    { Array.isArray(msg[key]) ?
                        <Fragment>
                            <span style={{fontSize: '15px'}} className="font-weight-bold">{`${(key !== 'group_id') ? key : 'Group'}:`}</span>
                            <ul className="list-unstyled">
                                {msg[key].map((m, i) => (
                                    <li key={i} style={{fontSize: '10px'}}>{m}</li>
                                ))}
                            </ul>
                        </Fragment>

                        : <span style={{fontSize: '15px'}}>{msg[key]}</span>
                    }
                    </div>);

                alert.error(errText);
            }
        }
    };

    const showMessages = (msg) => {

        for (let key in msg) {

            if (msg.hasOwnProperty(key)) {

                const text = <div>
                        <span style={{fontSize: '14px'}}>{msg[key]}</span>
                    </div>;

                (key === 'passwordNotMatch') ? alert.error(text): alert.success(text);
            }
        }
    };

    useEffect(() => {

        if (Object.keys(errors.msg).length > 0) {
            showErrors(errors)
        }

    }, [errors]);

    useEffect(() => {

        if (Object.keys(messages).length > 0) {
            showMessages(messages)
        }const BASE_URL = 'http://127.0.0.1:8000';

    }, [messages]);

    return <Fragment/>
};

const mapStateToProps = state => ({
    errors: state.errorsData,
    messages: state.messageData
});

export default connect(mapStateToProps)(Alerts);
