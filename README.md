# CovidWatch -- The app

## What is CovidWatch?

CovidWatch is an app that uses externally sourced Covid19 information and calculates some country-specific data concerning the number cases. The data can be sent to a client where it can be represented visually on charts :bar_chart: in an easily comprihesible way. An interesting feature of our app is that it also connected to a series of LED ligths :bulb: controlled by an external program, and the data calculated by the CovidWatch app is visualized on these lights.

## The aim of CovidWatch

The main reason for creatinf CovidWatch is to represent Covid-related, country-specific data in an easily accessible manner. Our calculations are based on just a couple of variables, thus the data represented by the app is not meant for scientific use, rather it meant for public use.

## Implemented features

### Data transformation and calculations

The app relies on the data extracted from two publicly available API: the Covid-related data comes from [Covid19API](https://covid19api.com/), and the population data is from [RestCountries](https://restcountries.eu/). Upon the first request arriving at the ```/api/summary´´´ endpoint, the app fetches the data from these two soruces (https://api.covid19api.com/summary and https://restcountries.eu/rest/v2/all), then filters the country-specific Covid data, and adds the population informatin from the population data. It also calculates the degree of severity (see below) for each country. This information is then sent as a JSON for further use, and is also stored in cache for a restricted amount of time.

#### Degrees of severity

**Low**: the number of active cases is lower than 10 per 10 0000.

**Medium**: the number of active cases is between a 10 an 100 per 10 000.

**High**: the number of active cases is higher than 100 per 10 000.

### LED lights

### Future extensions

**The speed of the new cases**:

**Longitudinal data**:

## The frontend

The client-side application that relies on the CovidWatch app can be found [HERE](https://github.com/tkardos/covidwatch-front/tree/dev).
