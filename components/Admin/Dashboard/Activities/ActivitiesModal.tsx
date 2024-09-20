import { MdOutlineClose } from 'react-icons/md';
import Modal from 'react-modal';

interface ModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    content: any;
}

const ActivitiesModal: React.FC<ModalProps> = ({ isOpen, onRequestClose, content }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="fixed inset-0 flex items-center justify-center p-4"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
            <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-lg">
                <button
                    onClick={onRequestClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                >
                    <MdOutlineClose className='size-[20px] text-white' />
                </button>
                {content}
            </div>
        </Modal>
    );
};

export default ActivitiesModal;
