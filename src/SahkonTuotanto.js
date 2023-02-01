import { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Typography, Box } from "@mui/material";

import Grid from "@mui/material/Grid";
import SingleCard from "./SingleCard";

const SahkonTuotanto = ({ item }) => {
  const [vesivoimatuotanto, setVesivoimatuotanto] = useState([]);
  const [tuulivoimatuotanto, setTuulivoimatuotanto] = useState([]);
  const [ydinvoimatuotanto, setYdinvoimatuotanto] = useState([]);
  const [teollisuudenYhteistuotanto, setTeollisuudenYhteistuotanto] = useState(
    []
  );
  const [kaukolampoYhteistuotanto, setKaukolampoYhteistuotanto] = useState([]);
  const [muuTuotanto, setMuuTuotanto] = useState([]);

  // *******************************************************

  const [isVesiLoaded, setIsVesiLoaded] = useState(false);
  const [isTuuliLoaded, setIsTuuliLoaded] = useState(false);
  const [isYdinvoimaLoaded, setIsYdinvoimaLoaded] = useState(false);
  const [
    isTeollisuudenYhteistuotantoLoaded,
    setIsTeollisuudenYhteistuotantoLoaded,
  ] = useState(false);
  const [
    isKaukolampoYhteistuotantoLoaded,
    setIsKaukolampoYhteistuotantoLoaded,
  ] = useState(false);
  const [isMuuTuotantoLoaded, setIsMuuTuotantoLoaded] = useState(false);

  // **********************************************

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
    setIsVesiLoaded(false);
    async function getData() {
      const resp = await axios.get(
        "https://api.fingrid.fi/v1/variable/191/events/json",
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

      setVesivoimatuotanto(resp.data);
      setIsVesiLoaded(true);
    }

    getData();
  }, []);

  useEffect(() => {
    setIsTuuliLoaded(false);
    async function getData() {
      const resp = await axios.get(
        "https://api.fingrid.fi/v1/variable/181/events/json",
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

      setTuulivoimatuotanto(resp.data);
      setIsTuuliLoaded(true);
    }

    getData();
  }, []);

  useEffect(() => {
    setIsYdinvoimaLoaded(false);
    async function getData() {
      const resp = await axios.get(
        "https://api.fingrid.fi/v1/variable/188/events/json",
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

      setYdinvoimatuotanto(resp.data);
      setIsYdinvoimaLoaded(true);
    }

    getData();
  }, []);

  useEffect(() => {
    setIsTeollisuudenYhteistuotantoLoaded(false);
    async function getData() {
      const resp = await axios.get(
        "https://api.fingrid.fi/v1/variable/202/events/json",
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

      setTeollisuudenYhteistuotanto(resp.data);
      setIsTeollisuudenYhteistuotantoLoaded(true);
    }

    getData();
  }, []);

  useEffect(() => {
    setIsKaukolampoYhteistuotantoLoaded(false);
    async function getData() {
      const resp = await axios.get(
        "https://api.fingrid.fi/v1/variable/201/events/json",
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

      setKaukolampoYhteistuotanto(resp.data);
      setIsKaukolampoYhteistuotantoLoaded(true);
    }

    getData();
  }, []);

  useEffect(() => {
    setIsMuuTuotantoLoaded(false);
    async function getData() {
      const resp = await axios.get(
        "https://api.fingrid.fi/v1/variable/205/events/json",
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

      setMuuTuotanto(resp.data);
      setIsMuuTuotantoLoaded(true);
    }

    getData();
  }, []);

  if (
    !isVesiLoaded ||
    !isTuuliLoaded ||
    !isYdinvoimaLoaded ||
    !isTeollisuudenYhteistuotantoLoaded ||
    !isKaukolampoYhteistuotantoLoaded ||
    !isMuuTuotantoLoaded
  ) {
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
        <Typography sx={{ marginTop: 3 }} variant="h5">
          Sähköntuotanto Suomessa - reaaliaikatieto
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={2}>
            <SingleCard
              name="Vesivoima"
              data={vesivoimatuotanto}
              color="pink"
            />
          </Grid>
          <Grid item xs={2}>
            <SingleCard
              name="Tuulivoima"
              data={tuulivoimatuotanto}
              color="lightblue"
            />
          </Grid>
          <Grid item xs={2}>
            <SingleCard
              name="Ydinvoima"
              data={ydinvoimatuotanto}
              color="lightgray"
            />
          </Grid>
          <Grid item xs={2}>
            <SingleCard
              name="Yhteistuotanto (teollisuus)"
              data={teollisuudenYhteistuotanto}
              color="gray"
            />
          </Grid>
          <Grid item xs={2}>
            <SingleCard
              name="Yhteistuotanto (kaukolämpö)"
              data={kaukolampoYhteistuotanto}
              color="lightgoldenrodyellow"
            />
          </Grid>
          <Grid item xs={2}>
            <SingleCard
              name="Muu tuotanto"
              description="Varavoimalaitokset ja pientuotanto"
              data={muuTuotanto}
              color="green"
            />
          </Grid>
        </Grid>
      </>
    );
  }
};

export default SahkonTuotanto;
