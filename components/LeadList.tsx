import React, { useState, useEffect } from 'react';
import { List } from 'antd';
import LeadSearch from '/REACT-lead-app/LeadSearch';

interface Lead {
  name: string;
  email: string;
  phone: string;
  location: string;
}

const LeadList: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?results=10&seed=randomSeedValue');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const formattedLeads = data.results.map((lead: any) => ({
          name: `${lead.name.first} ${lead.name.last}`,
          email: lead.email,
          phone: lead.phone,
          location: `${lead.location.city}, ${lead.location.country}`,
        }));
        setLeads(formattedLeads);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!filteredLeads.length) {
      setFilteredLeads(leads);
    }
  }, [leads, filteredLeads.length]);

  const handleSearch = (searchTerm: string) => {
    const filteredData = leads.filter(lead =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLeads(filteredData);
  };

  return (
    <>
      <LeadSearch setFilteredLeads={handleSearch} />
      <List
        size="large"
        header={
          <div style={{ display: 'flex', justifyContent: 'center', fontWeight: 'bold' }}>
            <div style={{ flexBasis: '25%' }}>ФИО</div>
            <div style={{ flexBasis: '25%' }}>Эл. почта</div>
            <div style={{ flexBasis: '25%' }}>Телефон</div>
            <div style={{ flexBasis: '25%' }}>Локация</div>
          </div>
        }
        dataSource={filteredLeads}
        renderItem={lead => (
          <List.Item>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '5%', width: '100%' }}>
              <div style={{ flexBasis: '25%' }}>{lead.name}</div>
              <div style={{ flexBasis: '25%' }}>{lead.email}</div>
              <div style={{ flexBasis: '25%' }}>{lead.phone}</div>
              <div style={{ flexBasis: '25%' }}>{lead.location}</div>
            </div>
          </List.Item>
        )}
      />
    </>
  );
};

export default LeadList;
