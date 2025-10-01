import "./Home.css"
import Sidebar from "../../Components/Sidebar/Siderbar"

function Home({sidebar}) {
  return (
    <>
      <Sidebar sidebar={sidebar}/>
    </>
  )
}

export default Home