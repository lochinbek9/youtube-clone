import "./Home.css"
import Sidebar from "../../Components/Sidebar/Siderbar"
import Feed from "../../Components/Feed/Feed"

function Home({sidebar}) {
  return (
    <>
      <Sidebar sidebar={sidebar}/>
      <div className={`container ${sidebar ?  " " : 'large-container'}`}>
        <Feed/>
      </div>
    </>
  )
}

export default Home