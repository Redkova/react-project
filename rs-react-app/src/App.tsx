import './style.css';
import MainLayout from './components/layout/Main';
import SearchSection from './components/section/Search';
import ResultsSection from './components/section/Result';

function App() {
  return (
    <>
      <MainLayout>
        <SearchSection></SearchSection>
        <ResultsSection></ResultsSection>
      </MainLayout>
    </>
  );
}

export default App;
