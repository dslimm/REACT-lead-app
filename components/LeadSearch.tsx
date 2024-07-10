import React, { useState, ChangeEvent } from 'react';
import { Input } from 'antd';

interface LeadSearchProps {
  setFilteredLeads: Function;
}

const LeadSearch: React.FC<LeadSearchProps> = ({ setFilteredLeads }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setFilteredLeads(value);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleSearch(e.target.value);
  };

  return (
    <Input
      placeholder="Поиск по ФИО..."
      value={searchTerm}
      onChange={handleChange}
      style={{ width: 200, marginBottom: 10 }}
    />
  );
};

export default LeadSearch;
