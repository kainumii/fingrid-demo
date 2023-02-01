import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import Plot from "react-plotly.js";
import { red } from "@mui/material/colors";
import CircleIcon from "@mui/icons-material/Circle";
import StateCard from "./StateCard";

const Demo = ({ item }) => {
  const [data, setData] = useState([]);
  const [days, setDays] = useState(7);
  const [isLoaded, setIsLoaded] = useState(false);

  function subtract(days, date = new Date()) {
    date.setDate(date.getDate() - days);
    return date;
  }

  // Subtract 7 days from current date
  const result = subtract(days);

  var end = new Date().toISOString().split(".")[0].concat("Z");
  var start = result.toISOString().split(".")[0].concat("Z");

  useEffect(() => {
    setIsLoaded(false);
    async function getData() {
      const resp = await axios.get(
        "https://api.fingrid.fi/v1/variable/193/events/json",
        {
          params: {
            start_time: start, //"2022-11-10T00:00:00Z",
            end_time: end, //"2022-11-30T11:00:00Z",
          },
          headers: {
            "x-api-key": "DibonxMZUP2rXxMgCtam68G23yQmqV71Jt1FT5c1",
          },
        }
      );

      console.log("resp: ", resp.data);
      // alert(resp.data[resp.data.length - 1]?.value);
      setData(resp.data);
      setIsLoaded(true);
    }

    getData();
  }, [days]);

  const transformData = (data) => {
    console.log(data);
    var plot_data = [];
    var x = [];
    var y = [];

    data.forEach((each) => {
      x.push(each.start_time);
      y.push(each.value);
    });

    plot_data["x"] = x;
    plot_data["y"] = y;

    console.log(plot_data);
    return plot_data;
  };

  const items = data.map((joo) => {
    return (
      <Card
        sx={{
          minWidth: 275,
          backgroundColor: "lightgray",
          border: 1,
          borderColor: "black",
          m: "24px",
        }}
      >
        <CardContent>
          <div>{new Date(joo.start_time).toLocaleString("fi")}</div>
          <div>{joo.value} MW</div>
        </CardContent>
      </Card>
    );
  });

  if (!isLoaded) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  } else {
    return (
      <>
        <Typography variant="h5">
          Sähkönkulutus Suomessa - reaaliaikatieto
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={2}>
            <TextField
              type="number"
              value={days}
              label="Näytä päiviä"
              onChange={(e) => {
                setDays(e.target.value);
              }}
            />
            <StateCard
              title={"Voimajärjestelmän käyttötilanne"}
              api_id={209}
              color={"lightblue"}
            />
            <StateCard title={"Kulutus"} api_id={193} color={"whitesmoke"} />
            <StateCard title={"Tuotanto"} api_id={192} color={"lightyellow"} />
          </Grid>

          <Grid item xs={10} justifyContent="center" alignItems="center">
            {/* <TextField fullWidth /> */}
            <Plot
              data={[
                {
                  type: "scatter",
                  mode: "lines",
                  x: transformData(data)["x"],
                  y: transformData(data)["y"],
                },
              ]}
              layout={{
                width: 1200,
                height: 500,
                title: "Sähkönkulutus",
              }}
            />
          </Grid>
        </Grid>

        {/* <Grid

          container
          justifyContent="center"
          spacing={0}
          sx={{ marginTop: 2 }}
        >
          <Grid item xs={2}>
            <TextField
              type="number"
              value={days}
              label="Näytä päiviä"
              onChange={(e) => {
                setDays(e.target.value);
              }}
            />
            <StateCard />
          </Grid>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Plot
              data={[
                {
                  type: "scatter",
                  mode: "lines",
                  x: transformData(data)["x"],
                  y: transformData(data)["y"],
                },
              ]}
              layout={{
                width: 1200,
                height: 500,
                title: "Sähkönkulutus",
              }}
            />
          </Box>
        </Grid> */}

        {/* <p>{items}</p> */}
      </>
    );
  }
};

export default Demo;
