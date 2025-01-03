
import React, { useState, useEffect } from 'react';
import { Card, Button, TextField, Layout, Page } from '@shopify/polaris';

export function CampaignManager() {
  const [campaigns, setCampaigns] = useState([]);
  const [newCampaign, setNewCampaign] = useState({ name: '', budget: 0 });

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    const response = await fetch('/api/campaigns');
    const data = await response.json();
    setCampaigns(data);
  };

  const createCampaign = async () => {
    await fetch('/api/campaigns', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCampaign)
    });
    fetchCampaigns();
    setNewCampaign({ name: '', budget: 0 });
  };

  return (
    <Page title="Campaign Management">
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <TextField
              label="Campaign Name"
              value={newCampaign.name}
              onChange={(value) => setNewCampaign({...newCampaign, name: value})}
            />
            <TextField
              label="Budget"
              type="number"
              value={newCampaign.budget}
              onChange={(value) => setNewCampaign({...newCampaign, budget: parseFloat(value)})}
            />
            <Button primary onClick={createCampaign}>Create Campaign</Button>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
