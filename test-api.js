// Quick test of the API route
async function testAPI() {
  try {
    console.log('Testing API route...');
    const response = await fetch('http://localhost:3001/api/sanity/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic: 'Test topic: beneficios del ayuno intermitente',
      }),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers));
    
    const text = await response.text();
    console.log('Response body (raw):', text);
    
    try {
      const json = JSON.parse(text);
      console.log('Response body (parsed):', json);
    } catch (e) {
      console.error('Failed to parse JSON:', e.message);
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

testAPI();
