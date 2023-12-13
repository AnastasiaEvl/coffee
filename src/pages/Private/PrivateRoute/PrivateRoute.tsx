import {Profile} from "../Profile";
import {useAppSelector} from "../../../core/hooks/useRedux";
import {PersonalCabinet} from "../../../components/smart/PersonalCabinet";



export const PrivateRoute = () => {

    const authorization =  useAppSelector((state:any) => state.auth.authorization)

    return authorization ? <Profile /> : <PersonalCabinet/>

}
