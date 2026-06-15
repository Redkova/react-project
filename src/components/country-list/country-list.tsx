import { memo, useMemo } from 'react';
import { List, type RowComponentProps } from 'react-window';
import type { Country } from '../../types';
import { CountryCard } from '../country-card/country-card';
import { getPopulationForYear, createYearDataMap } from '../../utils/data-transformers';
import styles from './country-list.module.css';

const CARD_HEIGHT = 280;
const GAP = 12;

type CountryListProps = {
  countries: Country[];
  searchQuery: string;
  selectedColumns: string[];
  selectedRegion: string;
  selectedYear: number;
  sortField: 'name' | 'population';
  sortOrder: 'asc' | 'desc';
  onYearChange: (year: number) => void;
};

type CountryRowProps = {
  countries: Country[];
  selectedYear: number;
  selectedColumns: string[];
};

const CountryRow = ({
  index,
  style,
  countries,
  selectedYear,
  selectedColumns,
}: RowComponentProps<CountryRowProps>) => {
  const country = countries[index];

  if (!country) return null;

  return (
    <div style={{ ...style, height: CARD_HEIGHT + GAP }}>
      <CountryCard
        country={country}
        selectedYear={selectedYear}
        selectedColumns={selectedColumns}
      />
    </div>
  );
};

export const CountryList = memo(function CountryList({
  countries,
  searchQuery,
  selectedColumns,
  selectedRegion,
  selectedYear,
  sortField,
  sortOrder,
}: CountryListProps) {
  const filteredCountries = useMemo(() => {
    return countries
      .filter((c) => {
        const matchesSearch = c.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRegion = !selectedRegion || c.data.some((d) => d.region === selectedRegion);
        return matchesSearch && matchesRegion;
      })
      .sort((a, b) => {
        if (sortField === 'name') {
          return sortOrder === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
        }

        const mapA = createYearDataMap(a.data);
        const mapB = createYearDataMap(b.data);

        const popA = getPopulationForYear(mapA, selectedYear) || 0;
        const popB = getPopulationForYear(mapB, selectedYear) || 0;

        return sortOrder === 'asc' ? popA - popB : popB - popA;
      });
  }, [countries, searchQuery, selectedRegion, selectedYear, sortField, sortOrder]);

  const rowData = useMemo(
    () => ({
      countries: filteredCountries,
      selectedYear,
      selectedColumns,
    }),
    [filteredCountries, selectedYear, selectedColumns]
  );

  return (
    <div className={styles.countryList}>
      <List
        rowCount={filteredCountries.length}
        rowHeight={CARD_HEIGHT + GAP}
        rowComponent={CountryRow}
        rowProps={rowData}
        style={{
          height: 700,
          width: '100%',
        }}
      />
    </div>
  );
});
