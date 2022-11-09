import React from 'react';

export default function ConfirmationModal({ open, children, onClose }) {
    if (!open) {
        return null;
    }

    return (
        <div>
            <h1>Are you sure?</h1>
            <button onClick={onClose}>No</button>

            <button onClick={onClose}>Yes</button>
        </div>
    );
}
