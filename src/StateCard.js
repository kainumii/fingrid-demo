import {
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import CircleIcon from "@mui/icons-material/Circle";
import axios from "axios";
import { useEffect, useState } from "react";

const StateCard = (props) => {
  const [data, setData] = useState([]);

  const constructIcon = () => {
    if (data[data.length - 1]?.value === 1)
      return <CircleIcon fontSize="large" color="success" />;
    else if (data[data.length - 1]?.value === 2)
      return <CircleIcon fontSize="large" color="warning" />;
    else if (data[data.length - 1]?.value === 3)
      return <CircleIcon fontSize="large" color="error" />;
    else if (data[data.length - 1]?.value === 4)
      return <CircleIcon fontSize="large" color="inherit" />;
    else if (data[data.length - 1]?.value === 5)
      return <CircleIcon fontSize="large" color="primary" />;
  };
  const constructText = () => {
    if (data[data.length - 1]?.value === 1) return "Normaali";
    else if (data[data.length - 1]?.value === 2) return "Heikentynyt";
    else if (data[data.length - 1]?.value === 3) return "Vaarassa";
    else if (data[data.length - 1]?.value === 4) return "Vakava häiriö";
    else if (data[data.length - 1]?.value === 5) return "Palautus menossa";
  };

  function subtract(minutes, date = new Date()) {
    date.setMinutes(date.getMinutes() - minutes);

    console.log(date);
    return date;
  }

  // Subtract 5 minutes from current date
  const result = subtract(10);

  var end = "2023-12-31T00:00:00Z";
  var start = result.toISOString().split(".")[0].concat("Z");

  useEffect(() => {
    async function getData() {
      const resp = await axios.get(
        `https://api.fingrid.fi/v1/variable/${props.api_id}/events/json`,
        {
          params: {
            start_time: start,
            end_time: end,
          },
          headers: {
            "x-api-key": "DibonxMZUP2rXxMgCtam68G23yQmqV71Jt1FT5c1",
          },
        }
      );

      setData(resp.data);
      console.log(resp.data);
    }

    getData();
  }, []);

  return (
    <>
      <Card
        sx={{
          marginTop: 1,
          backgroundColor: props.color,
          borderColor: "black",
          borderRadius: "8px",
          borderStyle: "solid",
          borderWidth: 1,
        }}
      >
        <CardContent>
          <Typography variant="h6">{props.title}</Typography>
          {props.api_id === 209 && (
            <Grid sx={{ marginTop: 1 }} container spacing={2}>
              <Grid item xs={4}>
                {/* <CircleIcon fontSize="large" color="warning" /> */}
                {constructIcon()}
              </Grid>
              <Grid>
                <Typography sx={{ marginTop: 3 }} variant="body2">
                  {constructText()}
                </Typography>
              </Grid>
            </Grid>
          )}
          {props.api_id === 192 && (
            <Typography variant="h5">
              {data[data.length - 1]?.value} MW{" "}
            </Typography>
          )}
          {props.api_id === 193 && (
            <Typography variant="h5">
              {" "}
              {data[data.length - 1]?.value} MW{" "}
            </Typography>
          )}
          <Typography variant="body2" sx={{ marginTop: 2 }}>
            {data[data.length - 1]?.start_time}
          </Typography>
        </CardContent>

        {/* <CardActions>
          <a
            href="https://data.fingrid.fi/fi/dataset/power-system-state-real-time-data"
            target="_blank"
          >
            <Button size="small">Learn More</Button>
          </a>
        </CardActions> */}
      </Card>
    </>
  );
};

export default StateCard;
