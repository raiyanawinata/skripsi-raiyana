import React  from "react";

const AlertNotif = (props) => {
    if (props.title) {
        return (
            <MessageBodyWithTitle
                color={props.color}
                message={props.message}
                title={props.title}
            />
        );
    }

    return (
        <MessageBodyWithoutTitle color={props.color} message={props.message} />
    );
};

const MessageBodyWithTitle = ({ color, message, title }) => {
    return (
        <div
            className={"mb-5 p-5 alert alert-dismissible alert-" + color}
            role="alert"
        >
            <h4 className="alert-heading">{title}</h4>
            <p>{message}</p>
            <button
                type="button"
                className="btn-close"
                data-dismiss="alert"
                aria-label="Close"
            ></button>
        </div>
    );
};

const MessageBodyWithoutTitle = ({ color, message }) => {
    return (
        <div
            className={"alert alert-dismissible alert-" + color + " fade show"}
            role="alert"
        >
            <div className="text-start">
                <span>
                    <i className={"bi bi-exclamation-octagon-fill fs-1hx text-" + color}></i>
                    <span className="ms-1">{message}</span>
                </span>
            </div>
            <button
                type="button"
                className="btn-close"
                data-dismiss="alert"
                aria-label="Close"
            ></button>
        </div>
    );
};

export { AlertNotif };