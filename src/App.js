import {
  Container,
  CssBaseline,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
} from "@material-ui/core";
import "./App.css";
import covidLogo from "./coronavirus.svg";
import { fetchCountries } from "./api";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AreaChart from "./components/AreaChart";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("turkey");

  useEffect(() => {
    const fetchCountriesData = async () => {
      const countries = await fetchCountries();
      setCountries(countries);
    };

    fetchCountriesData();
  }, []);

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: "50px auto",
      minWidth: "50%",
    },
  }));

  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid container>
          <img
            src={covidLogo}
            alt="Logo"
            style={{ width: 100, height: 100, marginTop: 20 }}
          />
          <FormControl className={classes.formControl}>
            <Select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              {countries.map((c) => (
                <MenuItem value={c.Slug}>{c.Country}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Grid item xs={12}>
            <Paper>
              <AreaChart country={country} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
