import logo from "../../Images/logo.png";
import "./Heading.css"

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  
  const date = new Date();
  const Todaydate = date.getDate();
  const day = days[date.getDay()];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  const minutes = date.getMinutes();
  const ampm = date.getHours() >= 12 ? "pm" : "am";

const Heading = () => {
  return (
    <div >
      <div className="heading">
        <img src={logo} alt="logo" className="logo"/>
        <h2 className="title">Rewards & Recognition Program</h2>
        <h3>
          {day}, {month} {Todaydate}, {year} {hour}:{minutes}
          {ampm}
        </h3>
      </div>
    </div>
  )
}

export default Heading
