import work from './work.module.css'

export const WorkTime=()=>{
    const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];
    const d = new Date();
    const n = d.getDay();
    console.log(days[n]);

    const workingDays = [
        {day: 'Monday', time:'8:00 a.m. - 10:00 p.m.' },
        {day:'Tuesday', time: '8:00 a.m. - 10:00 p.m.'},
        {day: 'Wednesday', time:'8:00 a.m. - 10:00 p.m.'},
        {day: 'Thursday', time: '8:00 a.m. - 10:00 p.m.'},
        {day: 'Friday', time:'8:00 a.m. - 11:00 p.m.'},
        {day: 'Saturday', time: '10:00 a.m. - 11:30 p.m.'},
        {day: 'Sunday', time: '10:00 a.m. - 11:30 p.m.'}
    ]

    const x = workingDays.find(el => el.day === days[n])


    return (
        <div className={work.container}>
            <table className={work.table}>
                <tbody>
                {workingDays.map((i,index)=>(
                    <tr key={index}>
                        <td className={x?.day === i.day ? `${work.bold}` : `${work.ordinary}`}>
                            {i.day}
                        </td>
                        <td className={x?.day === i.day ? `${work.bold}` : `${work.ordinary}`}>
                            {i.time}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

    )
}
