import React from 'react'

function SuccessMessage(props) {
    return (
        <React.Fragment>
            <div className="alert alert-success" role="alert">
                <i className="mdi mdi-check-all me-2"></i>{`Success : ${props.message}`}
            </div>
        </React.Fragment>
    )
}

export default SuccessMessage