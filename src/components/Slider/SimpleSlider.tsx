import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import slider from './slider.module.css'
import slideOne from '../../assets/images/slider1.jpg'
import slideTwo from '../../assets/images/slider2.jpg'
import slideThree from '../../assets/images/slider3.jpg'
import slideFour from '../../assets/images/slider4.jpg'


export const SimpleSlider=()=> {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        }
    };
    return(
    <Carousel
        swipeable={true}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={2000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-0-px"
        className={slider.carousel}
    >
        <div className={slider.slide}>
            <img  className = {slider.photo} src={slideOne} alt='coffee-cafe-design'/>
            </div>
        <div className={slider.slide}><img className = {slider.photo} src={slideTwo} alt='coffee-cafe-design'/></div>
        <div className={slider.slide}><img className = {slider.photo} src={slideThree} alt='coffee-cafe-design'/></div>
        <div className={slider.slide}><img className = {slider.photo} src={slideFour} alt='coffee-cafe-design'/></div>
    </Carousel>)
}
