import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class index extends React.Component {
     
    constructor(props) {
        super(props);
        this.state = {
            modal: true,
            message: props.message
        };
    }

    render() {
        const { className, headerClassName } = this.props;
        const { modal } = this.state;
        const backdrop = this.props.backdrop ? this.props.backdrop : true;
        return (
            <Modal isOpen={modal} toggle={this.toggleModal} className={className} backdrop={backdrop} size="lg my-10" style={{ width: '760px' }}>
                <ModalHeader className={headerClassName} toggle={this.toggleModal}>{this.props.title}</ModalHeader>
                <ModalBody>{this.props.children}</ModalBody>
            </Modal>
        );
    }

    toggleModal = () => {
        this.setState((prevState) => ({ modal: !prevState.modal }));
        this.props.toggleModal();
    }
}

export default index;