export async function getN8nWorkflows() {
  const response = await fetch(`${process.env.N8N_API_URL}/workflows`, {
    headers: {
      'X-N8N-API-KEY': process.env.N8N_API_KEY!
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch n8n workflows');
  }

  const data = await response.json();
  return data.data; // n8n wraps response in { data: [...] }
}

export async function getWorkflowExecutions(workflowId: string, limit: number = 5) {
  const response = await fetch(
    `${process.env.N8N_API_URL}/executions?workflowId=${workflowId}&limit=${limit}`,
    {
      headers: {
        'X-N8N-API-KEY': process.env.N8N_API_KEY!
      }
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch workflow executions');
  }

  const data = await response.json();
  return data.data;
}

export async function triggerWorkflow(workflowId: string) {
  const response = await fetch(
    `${process.env.N8N_API_URL}/workflows/${workflowId}/execute`,
    {
      method: 'POST',
      headers: {
        'X-N8N-API-KEY': process.env.N8N_API_KEY!,
        'Content-Type': 'application/json'
      }
    }
  );

  if (!response.ok) {
    throw new Error('Failed to trigger workflow');
  }

  return await response.json();
}

export async function getWorkflowById(workflowId: string) {
  const response = await fetch(`${process.env.N8N_API_URL}/workflows/${workflowId}`, {
    headers: { 'X-N8N-API-KEY': process.env.N8N_API_KEY! }
  });

  const data = await response.json();
  console.log('Raw API response:', JSON.stringify(data, null, 2)); // See exact structure
  
  // Try returning the data directly, not data.data
  return data; // Instead of data.data
}