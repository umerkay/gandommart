import React, { Fragment, useState } from "react";
import { Grid, Box, Paper, Tab, Tabs } from "@material-ui/core";
import Inventory from "./inventory";
import Measurements from "./measurements";
import StoreAddress from "./storeAddress";
import CurrencyOptions from "./currencyOption";
import { TabPanel, TabProps } from "../../components";

const Store = () => {
  const [tabVal, setTabVal] = useState(0);
  const handleChange = (event, newValue) => {
    setTabVal(newValue);
  };
  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper square>
            <Tabs
              value={tabVal}
              onChange={handleChange}
              aria-label='Shipping Tab'
              indicatorColor='primary'
              textColor='primary'
              variant="scrollable"
            >
              <Tab label='Currency options' {...TabProps(0)} />
              <Tab label='Store Address' {...TabProps(1)} />
              <Tab label='Measurements' {...TabProps(2)} />
              <Tab label='Inventory' {...TabProps(3)} />
            </Tabs>
          </Paper>
          <Box>
            <TabPanel value={tabVal} index={0}>
              <CurrencyOptions />
            </TabPanel>
            <TabPanel value={tabVal} index={1}>
              <StoreAddress />
            </TabPanel>
            <TabPanel value={tabVal} index={2}>
              <Measurements />
            </TabPanel>
            <TabPanel value={tabVal} index={3}>
              <Inventory />
            </TabPanel>
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Store;
