import './App.css';
import React, { useEffect, useState } from 'react'
import Cards from './components/Cards';
import { Card, CardContent, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import LineChart from './components/LineChart';
import LiveCases from './components/LiveCases';
import Map from './components/Map';

function App() {
  const [countryData, setCountryData] = useState([])
  const [selected, setSelected] = useState('worldwide')
  const [covidCases, setCovidCases] = useState([])
  const { cases, deaths, recovered } = covidCases
  const [infected, setInfected] = useState([])
  const [deceased, setDeceased] = useState([])
  const [recoveries, setRecoveries] = useState([])

  useEffect(() => {
    const getTimeSeriesData = () => {
        fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=30')
        .then(response => response.json())
        .then(data => {
          const {cases, deaths, recovered} = data;
            setInfected(cases)
            setDeceased(deaths)
            setRecoveries(recovered)
        })
    }
    getTimeSeriesData()
  }, [])

  useEffect(() => {
    const getDataFromCountries = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
      .then((response) => response.json())
      .then((data) => {
        const countriesData = data.map(countryData => 
          ({
        id: countryData.countryInfo.iso2,
        name: countryData.country,
        value: countryData.countryInfo.iso3,
        flag: countryData.countryInfo.flag
      }));
      setCountryData(countriesData);

    })
    };
    getDataFromCountries()
    console.log('data successfuly fetched')
  }, [])

  useEffect(() =>{
    fetch('https://disease.sh/v3/covid-19/all')
    .then(res => res.json())
    .then(data => setCovidCases(data))
  }, [])

  // get case numbers for selected country

  function changeCountry(e){
    const updateCountry = () => {
    const countryCode = e.target.value
    setSelected(countryCode);
    const url = countryCode === 'worldwide' ? 
    `https://disease.sh/v3/covid-19/all` : `https://disease.sh/v3/covid-19/countries/${countryCode}`
    fetch(url)
    .then(response => response.json())
    .then(data => setCovidCases(data))
    .then(console.log(covidCases))
    }
    updateCountry();
}

  return (
    <div className="app">
      <div className="app_left">
        <header className="app_left_header">
        <h1>Covid19 World Tracker</h1>
            <FormControl variant="outlined">
                <InputLabel id="demo-simple-select-outlined-label">Country</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={selected}
                    onChange={changeCountry}
                    label="Country"
                    style={{
                      padding: '0.5em'
                    }}
                >
                  <MenuItem value="worldwide">Worldwide </MenuItem>
                  {countryData.map(item => 
                      <MenuItem value={item.value}>{item.name} <img src={item.flag} alt="country flag"/></MenuItem>
                  )}
                </Select>
            </FormControl>
            {/* TEST */}
          </header>
          <Card>
            <CardContent>
              <Map />
            </CardContent>
          </Card>
      </div>
      <div className="app_right">
      <Card className="app_right_cards">
        <CardContent>
          <Cards 
            title="Infected"
            caseNumbers={cases}
            />
          <Cards
            title="Recovered"
            caseNumbers={recovered}
            />
          <Cards
            title="Deaths"
            caseNumbers={deaths}
            />
          <LiveCases />
        {/* line chart */}
        <LineChart 
          infected={infected}
          deceased={deceased}
          recoveries={recoveries} />
        </CardContent>
      </Card>
      </div>
    </div>
  );
}

export default App;
