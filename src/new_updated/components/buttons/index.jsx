import { OverlayTrigger, Tooltip } from "react-bootstrap";

const ButtonRefresh = (props) => {
    const { totalItem, ActionClick } = props;
    return (
        <div className="input-group">
            <span className={"input-group-text bg-light fs-7 py-2"} >
                Total {totalItem ? totalItem : 0}
            </span>
        </div>
    )
}

const renderTooltip = (props) => {
    return (
        <Tooltip id="button-tooltip" {...props}>
            {props.title}
        </Tooltip>
    );
};

export { ButtonRefresh }