import React from 'react';
import '/REACT-lead-app/App.css';
import LeadList from '/REACT-lead-app/components/LeadList';

const App: React.FC = () => {
  return (
    <div className="app-h1">
      <h1>Список новых клиентов:</h1>
      <LeadList />
    </div>
  );
};

export default App;
