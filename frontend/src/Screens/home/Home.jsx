import React from "react";
import Button from "@mui/material/Button";
import Heading from "../Components/Heading";
import { useNavigate } from 'react-router';

function Home  ()  {

  let navigate = useNavigate();

  const handleBtnClick = () => {
    navigate('/scan')
  }

  return (
    <>
    <Heading />
    <div className="start_scanning">
      <h4>Welcome to TSUISL services.</h4>
      <Button variant="contained" onClick={handleBtnClick}>
        Start scanning
      </Button>
    </div>
    </>
  );
};

export default Home;
