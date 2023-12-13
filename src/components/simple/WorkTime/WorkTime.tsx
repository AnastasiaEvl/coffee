import work from './work.module.css'
import {BackButton} from "../../UI/BackButton";
import {DAYS} from "../../../core/constants/Days";
import {WORKINGDAYS} from "../../../core/constants/WorkingDays";
import {IWorkingDays} from "../../../core/types/IWorkingDays";

export const WorkTime = () => {

    const date: Date = new Date();
    const current:number = date.getDay();

    const schedule:IWorkingDays | undefined = WORKINGDAYS.find(el => el.day === DAYS[current])

    return (
        <>
            <BackButton/>
            <div className={work.container}>
                <table className={work.table}>
                    <tbody>
                    {WORKINGDAYS.map((i, index) => (
                        <tr key={index}>
                            <td className={schedule?.day === i.day ? `${work.bold}` : `${work.ordinary}`}>
                                {i.day}
                            </td>
                            <td className={schedule?.day === i.day ? `${work.bold}` : `${work.ordinary}`}>
                                {i.time}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
