import React, { useEffect, useLayoutEffect, useState } from "react";
import Heading from "../Components/Heading";
import TextField from "@mui/material/TextField";
import "./Forms.css";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useNavigate } from "react-router-dom";

const Forms = (props) => {
  const houseId = props.mainData.house_id;
  const address = props.mainData.address;
  const zone = props.mainData.zone;
  const area = props.mainData.area;
  const locality = props.mainData.location;
  const latitude = props.mainData.lat;
  const longitude = props.mainData.lng;

  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);
  const [marks, setMarks] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [mobileNo, setMobileNo] = useState(0);
  const [feedback , setFeedback] = useState("")

  let navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/read")
      .then((response) => response.json())
      .then((e) => setQuestions(e[1].body));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/api/read")
      .then((response) => response.json())
      .then((e) => setOptions(e[0].body));
  }, []);

  console.log(answers);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const myData = {
      house_id: houseId,
      customer_name: customerName,
      mobile_no: mobileNo,
      address: address,
      zone: zone,
      area: area,
      location: locality,
      latitude: latitude,
      longitude: longitude,
      feedback: feedback,
      qna: answers,
      
    };
    
    const result = await fetch("http://localhost:3000/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myData),
    });
    
    const resultJSON = await result.json();
    console.log(resultJSON);
    navigate("/");
  };

  return (
    <div>
      <Heading />
      <form className="survey_form" onSubmit={handleOnSubmit}>
        <TextField
          id="outlined-read-only-input"
          label="HouseId"
          className="survey_form_text"
          defaultValue={houseId}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="outlined-read-only-input"
          label="Address"
          className="survey_form_text"
          defaultValue={address}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="outlined-read-only-input"
          label="Zone"
          className="survey_form_text"
          defaultValue={zone}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="outlined-read-only-input"
          label="Area"
          className="survey_form_text"
          defaultValue={area}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="outlined-read-only-input"
          label="Locality"
          className="survey_form_text"
          defaultValue={locality}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="outlined-basic"
          label="Customer Name"
          variant="outlined"
          className="survey_form_text"
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Mobile Number"
          variant="outlined"
          className="survey_form_text"
          onChange={(e) => setMobileNo(e.target.value)}
        />
        {questions.map((item) => (
          <div className="questions_box" key={item.id}>
            <h3>
              {item.id}. {item.question}
            </h3>
            <div
              className="questions_box_choices"
              dangerouslySetInnerHTML={{ __html: item.choice }}
            />
            {/* <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Weitage/Score
              </FormLabel>
              {options.map((e) => (
                <div>
                  <label>
                    <input
                      type="radio"
                      value={e.marks}
                      // name={e.id}
                      key={e.id}
                      onChange={() =>
                        setAnswers((answer) => ({
                          ...answer,
                          [item.id]: e.marks,
                        }))
                      }
                    />
                    {e.label}
                  </label>
                </div>
              ))}
            </FormControl> */}
             <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">Weitage/Score</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
       // value={value}
        onChange={(x) =>
          setAnswers((answer) => ({
            ...answer,
            [item.id]: x.target.value,
          }))
        }
      >
         {options.map((e) => (
        <FormControlLabel value={e.marks} control={<Radio />} label={e.label} />
        ))}
      </RadioGroup>
    </FormControl>
            <TextField
              id="outlined-read-only-input"
              placeholder="Marks"
              value={answers[item.id]}
              InputProps={{
                readOnly: true,
              }}
            />
            <Stack direction="row" alignItems="center" spacing={2}>
              <Button variant="contained" component="label">
                Upload
                <input hidden accept="image/*" multiple type="file" />
              </Button>
            </Stack>
          </div>
        ))}
        <div className="feedback_form">
          <p>Feedback</p>
          <textarea className="feedback_form_area" placeholder="Feedback" cols="40" rows="5" onChange={(e) => setFeedback(e.target.value)}></textarea>
        </div>

        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Forms;
