import React from 'react';
import Modal from 'react-modal';

export default (props) => (
    <Modal
        isOpen={props.removeClicked}
        onRequestClose={props.cancelRemove}
        contentLabel="Selected Option"
        closeTimeoutMS={200}
        className="modal"
    >
        <h3 className='modal__title'>Remove this expense?</h3>
        <div className="modal__group">
            <button
                className='modal__item button' 
                onClick={props.removeConfirmed}
            >OK</button>

            <button 
                className='modal__item button--secondary' 
                onClick={props.cancelRemove}
            >Cancel</button>
        </div>
    </Modal>
);
