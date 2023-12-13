import {Video} from "../../components/UI/Video/Video";
import {Bonuses} from "../../components/simple/Bonuses";
import {Location} from "../../components/simple/Location";
import {SimpleSlider} from "../../components/UI/Slider";
import {Content} from "../../components/smart/Content";
import {Footer} from "../../components/simple/Footer";
import {Header} from "../../components/simple/Header";

export const HomePage = () => {
    return (<>
            <Header/>
            <Video/>
            <Bonuses/>
            <Location/>
            <SimpleSlider/>
            <Content/>
            <Footer/>
        </>
    )
}
