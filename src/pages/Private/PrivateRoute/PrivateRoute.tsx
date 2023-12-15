import {useAppSelector} from "../../../core/hooks/useRedux";
import {PersonalCabinet} from "../../../components/smart/PersonalCabinet";
import {Profile} from "../Profile";



export const PrivateRoute = () => {

    const authorization =  useAppSelector((state:any) => state.auth.authorization)

    return authorization ? <Profile/> : <PersonalCabinet/>

}
