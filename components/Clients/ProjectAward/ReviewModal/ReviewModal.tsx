import Modal from 'react-modal';

interface ModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    content: any;
}

const ReviewModal: React.FC<ModalProps> = ({ isOpen, onRequestClose, content }) => {
    return (
        <Modal
            isOpen={isOpen}
            className="fixed inset-0 flex items-center justify-center p-4"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-[300]"
            onRequestClose={onRequestClose}
        >
            <div className="p-2 rounded-md shadow-lg w-full">
                {content}
            </div>
        </Modal>
    );
};

export default ReviewModal;
