import {Bonuses} from "./Bonuses";
import {Location} from "./Location";
import {SimpleSlider} from "./Slider";
import {Content} from "./Content";
import {Header} from "./Header";


export const MainPage = () => {
    return (<>
            <Header/>
            <Bonuses/>
            <Location/>
            <SimpleSlider/>
            <Content/>
        </>
    )
}
