import cup from '../../../assets/video/cup.mp4'
import banner from './video.module.css'

export const Video = () => {
    return (
        <div>
            <h1 className={banner.title}>The Coffee</h1>
            <video autoPlay loop muted playsInline className={banner.content}>
                <source src={cup} type='video/mp4'/>
            </video>
        </div>
    )
}
