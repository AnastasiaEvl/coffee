import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import slider from './slider.module.css'
import slideOne from '../../../assets/images/slider1.jpg'
import slideTwo from '../../../assets/images/slider2.jpg'
import slideThree from '../../../assets/images/slider3.jpg'
import slideFour from '../../../assets/images/slider4.jpg'
import {useNavigate} from "react-router-dom";


export const SimpleSlider = () => {
    const navigate = useNavigate()
    const responsive = {
        desktop: {
            breakpoint: {max: 3000, min: 1024},
            items: 2,
        },
        tablet: {
            breakpoint: { max: 1024, min: 768 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 768, min: 320 },
            items: 1,
        }
    };

    function toDescription(element: any):void {
        if (element.id === '1') {
            navigate('/winterMenu')
        } else if (element.id === '2') {
            navigate('/discountForCup')
        }
        else if (element.id === '3') {
            navigate('/loyaltySystem')
        }
        else if (element.id === '4') {
            navigate('/pointsForRegistration')
        }
    }

    return (
        <Carousel
            swipeable={true}
            draggable={false}
            showDots={true}
            responsive={responsive}
            ssr={true}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={2000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-1-px"
            className={slider.carousel}
        >
            <div className={slider.slide} onClick={(e) => toDescription(e.target)}>
                <img className={slider.photo} src={slideOne} alt='coffee-cafe-design' id='1'/>
                <div className={slider.smallTitle}><span>Special winter menu</span></div>
            </div>
            <div className={slider.slide} onClick={(e) => toDescription(e.target)}><img className={slider.photo} src={slideTwo} alt='coffee-cafe-design' id='2'/>
                <div className={slider.smallTitle}><span>Discount for your cup</span></div>
            </div>
            <div className={slider.slide} onClick={(e) => toDescription(e.target)}><img className={slider.photo} src={slideThree} alt='coffee-cafe-design'
                                               id='3'/>
                <div className={slider.smallTitle}><span>Loyalty system</span></div>
            </div>
            <div className={slider.slide} onClick={(e) => toDescription(e.target)}><img className={slider.photo} src={slideFour} alt='coffee-cafe-design'
                                               id='4'/>
                <div className={slider.smallTitle}><span>Welcome points for registration</span></div>
            </div>
        </Carousel>)
}
