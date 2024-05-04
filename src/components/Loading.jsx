import spinner from "../images/spinner.svg"

const Loading = ({loadingStyle}) => {
 return <div>
<img className={`${loadingStyle} w-[3rem] bg-transparent`} src={spinner} alt="loading..." />
 </div>
}

export default Loading;