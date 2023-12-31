import { useDispatch } from 'react-redux';
import { closeModal } from '../../../redux/modal/modalSlice';
import './modal.css'
import {Button} from "../Button/Button";
import {useAppSelector} from "../../../core/hooks/useRedux";
import bonuses from "../../simple/Bonuses/bonuses.module.css";

const ModalAlert = () => {
    const dispatch = useDispatch();

    const {text} = useAppSelector((state) =>
        state.modal)

    return (
        <aside className='modal-container'>
            <div className='modal-container-frame'>
                <h4 className='modal-text'> {text.payload} </h4>
                    <Button
                        type='button'
                        onClick={() => {
                            dispatch(closeModal());
                        }}
                        className={bonuses.button}
                    >
                        OK
                    </Button>
            </div>
        </aside>
    );
};
export default ModalAlert;
