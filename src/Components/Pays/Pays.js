import React, { useState, useEffect } from "react";
import { TextField, Box, Autocomplete } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

const Pays = () => {
  const [state, setState] = useState(null);
  const [listStates, setlistStates] = useState([]);
  //choix du pays
  const [country, setCountry] = useState(null);
  //a partir api
  const [listCountries, setlistCountries] = useState([]);
  //fetch country api
  useEffect(() => {
    axios
      .get("https://www.universal-tutorial.com/api/countries/", {
        headers: {
          Accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJqZWRkYWppaGVuZTFAZ21haWwuY29tIiwiYXBpX3Rva2VuIjoiX19mMHBubW9TZDVWVnR6VTg2YTVBY243NjFKV3loLWFWZ1BnSkUzT0E1Ml9xcFphd0pYRW1LcW1oemF4aWVsX2lOZyJ9LCJleHAiOjE2ODA2NDg3MDh9.K8hA74_poCvG17yJaN3mOWQ-U5OA33gi0nrFJl_IboU",
        },
      })
      .then((response) => {
        // If request is good...
        console.log(response.data);
        setlistCountries(response.data);
      })
      .catch((error) => {
        console.log("error " + error);
      });
  }, []);
  //fetch states api
  useEffect(() => {
    if (country) {
      setlistStates([]);
      setState(null);
      axios
        .get(
          `https://www.universal-tutorial.com/api/states/${country.country_name}`,
          {
            headers: {
              Accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJqZWRkYWppaGVuZTFAZ21haWwuY29tIiwiYXBpX3Rva2VuIjoiX19mMHBubW9TZDVWVnR6VTg2YTVBY243NjFKV3loLWFWZ1BnSkUzT0E1Ml9xcFphd0pYRW1LcW1oemF4aWVsX2lOZyJ9LCJleHAiOjE2ODA2NDg3MDh9.K8hA74_poCvG17yJaN3mOWQ-U5OA33gi0nrFJl_IboU",
            },
          }
        )
        .then((response) => {
          // If request is good...
          console.log(response.data);
          setlistStates(response.data);
        })
        .catch((error) => {
          console.log("error " + error);
        });
    }
  }, [country]);

  return (
    <div className="wrapper">
      <div className="pays-container">
        <h1 className="card-title"> CHOISIR LE PAYS</h1>
        <Autocomplete
          value={country}
          onChange={(event, newValue) => {
            setCountry(newValue);
          }}
          id="controllable-states-demo"
          options={listCountries}
          getOptionLabel={(option) => option.country_name}
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              {option.country_name}
            </Box>
          )}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choisir un pays"
              sx={{ backgroundColor: "white" }}
            />
          )}
        />
      </div>
      {country && (
        <div className="pays-container">
          {listStates.length === 0 ? (
            <div className="progress">
              <CircularProgress />
            </div>
          ) : (
            <>
              <h1 className="card-title">CHOISIR LA REGION</h1>
              <Autocomplete
                value={state}
                onChange={(event, newValue) => {
                  setState(newValue);
                }}
                id="controllable-states-demo"
                options={listStates}
                getOptionLabel={(option) => option.state_name}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    {option.state_name}
                  </Box>
                )}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choisir une région"
                    sx={{ backgroundColor: "white" }}
                  />
                )}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Pays;
