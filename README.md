# CovidWatch -- The app

## What is CovidWatch?

CovidWatch uses externally sourced COVID-19 information and calculates some country-specific data about the number of cases. The data calculated by the CovidWatch app can be sent to a client where it can be represented visually on charts :bar_chart:. An interesting feature of our app is that it also connected to a series of LED ligths :bulb: controlled by an external program, and the data calculated by the CovidWatch app is visualized with the help of these lights.

## The aim of CovidWatch

The main reason for creating CovidWatch is to represent COVID-19-related, country-specific data in an easily accessible manner. Our calculations are based on just a couple of variables, thus the data represented by the app is not meant for scientific use, rather it meant to inform the public about the COVID-19 pandemic.

## Implemented features

### Data transformation and calculations

The app relies on the data extracted from two publicly available API: the COVID-19-related data comes from [Covid19API](https://covid19api.com/), and the population data is from [RestCountries](https://restcountries.eu/). Upon the first request arriving at the `/api/summary` endpoint, the app fetches the data from these two soruces (https://api.covid19api.com/summary and https://restcountries.eu/rest/v2/all), then filters the country-specific covid data, and adds the population informatin from the population data. It also calculates the degree of severity (see below) for each country.

#### Degrees of severity

**Low**: the number of active cases is lower than 10 per 10 0000.

**Medium**: the number of active cases is between a 10 an 100 per 10 000.

**High**: the number of active cases is higher than 100 per 10 000.

### LED lights :bulb:

The CovidWatch app uses the LED lights to represent the ratio of three numbers, where the numbers represent the number of daily new recoveries, new cases, and new deaths. These are represented as green, yellow, and red, respectively, on the LED strip, where the lenght of the three segments is in proportion to the ratio of the three numbers.

### Future extensions

**The speed of the new cases**: Visually representing the frequency of the identification of new cases based on the ratio of new cases and minutes/seconds in a day.

**Longitudinal data**: Currently, our app only processes daily COVID-19 data. A future extension of the app is to process longitudinal data, so that it can provide inforamtion on trends in the spread of the virus :chart_with_upwards_trend: :chart_with_downwards_trend:.

## The frontend

The client-side application that relies on the CovidWatch app can be found [HERE](https://github.com/tkardos/covidwatch-front/tree/dev). It visualizes the data created by the app on different charts :bar_chart:.
