import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QrReader } from "react-qr-reader";
import Heading from "../Components/Heading";
import "./Scan.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";

const Scan = ({ handleData }) => {
  const [data, setData] = useState(null);
  const [qrData, setQrData] = useState("");
  const [isdataValid, setIsDataValid] = useState(false);

  const navigate = useNavigate();


  useEffect(() => {
    !data ||
      fetch(`https://dev.tsapplications.in/api/v1/amenity/${data}`)
        .then((response) => response.json())
        .then((e) => setQrData(e));
  }, [data]);

  useEffect(() => {
    qrData.house_id
      ? setIsDataValid(true)
      : setIsDataValid(false);

      handleData(qrData)
  }, [qrData]);

  const handleOnClick = () => {
    navigate("/forms");
  };

  return (
    <>
      <Heading />
      <div className="scanner">
        <p className="scan_title">Please scan house id QR code</p>
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              setData(result?.text);
            }

            if (!!error) {
              console.info(error);
            }
          }}
          className="scan_scanner"
          constraints={ {facingMode: 'environment'} }
        />

        <div className="scan_form">
          <h4 className="scan_houseId">Your house id is = {qrData.house_id}</h4>
          <h4>Medium of the survey</h4>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Select Language
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="English"
                control={<Radio />}
                label="English"
              />
              <FormControlLabel
                value="Hindi"
                control={<Radio />}
                label="Hindi"
              />
            </RadioGroup>
          </FormControl>
          {isdataValid && (
            <Button
              variant="contained"
              className="start_button"
              onClick={handleOnClick}
            >
              Click here to start the survey
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Scan;
