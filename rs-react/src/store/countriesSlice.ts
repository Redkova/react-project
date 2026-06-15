import { createSlice } from '@reduxjs/toolkit';
import { countries } from '../data/countries';

export type Country = string;

type CountriesState = {
  list: Country[];
};

const initialState: CountriesState = {
  list: countries,
};

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export const selectCountries = (state: { countries: CountriesState }) =>
  state.countries.list;

export default countriesSlice.reducer;
