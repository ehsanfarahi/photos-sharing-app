import spinner from "../images/spinnerPage.svg"

const LoadingPage = ({loadingStyle}) => {
 return <div>
    <div className="w-full h-full bg-black opacity-35 fixed left-0 top-0 right-0 bottom-0"></div>
<img className={`${loadingStyle} absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[5rem] bg-transparent`} src={spinner} alt="loading..." />
 </div>
}

export default LoadingPage;