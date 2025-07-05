const testMouseMove = async () => {
  const response = await fetch('http://localhost:3000/api/v1/mouse/move', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      x: 500,
      y: 500,
      smooth: true,
      duration: 1000,
    }),
  });

  const result = await response.json();
  console.log('Mouse move result:', result);
};

const testMouseClick = async () => {
  const response = await fetch('http://localhost:3000/api/v1/mouse/click', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      button: 'left',
    }),
  });

  const result = await response.json();
  console.log('Mouse click result:', result);
};

const testMousePosition = async () => {
  const response = await fetch('http://localhost:3000/api/v1/mouse/position');
  const result = await response.json();
  console.log('Mouse position:', result);
};

const runTests = async () => {
  console.log('Testing NutJS API endpoints...\n');

  try {
    await testMousePosition();
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await testMouseMove();
    await new Promise((resolve) => setTimeout(resolve, 1500));

    await testMouseClick();

    console.log('\nAll tests completed!');
  } catch (error) {
    console.error('Error during tests:', error);
  }
};

runTests();
