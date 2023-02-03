import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import FetchData from './components/FetchData';

const App = () => {
  const [location, setLocation] = useState('');
  const [condition, setCondition] = useState('');
  const [dataFetched, setDataFetched] = useState(false);

  return (
    <div className='main-container'>
      <Header />
      <FetchData
        location={location}
        setLocation={setLocation}
        condition={condition}
        setCondition={setCondition}
        dataFetched={dataFetched}
        setDataFetched={setDataFetched}
      />
    </div>
  );
};

export default App;
