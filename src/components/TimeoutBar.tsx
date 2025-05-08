
interface params {
    percentage: number
}

const TimeoutBar = ({ percentage }: params) => {

    return (
        <div className={`h-full bg-blue transition-transform ease-linear duration-[2s]`} style={{ width: `${percentage}%` }} />
    )
}

export default TimeoutBar