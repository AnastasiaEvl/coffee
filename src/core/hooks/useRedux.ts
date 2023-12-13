import {TypedUseSelectorHook, useDispatch, useSelector, useStore} from 'react-redux';
import {RootState } from '../../redux/store/store'
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";


export const useAppDispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore = useStore<RootState>
