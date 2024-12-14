const { createCanvas } = require('canvas'); // For graph rendering
const path = require('path');
const fs = require('fs');

// Helper function to plot graphs
exports.plotGraph = async (graphData, fileName) => {
  const canvas = createCanvas(800, 400);
  const ctx = canvas.getContext('2d');

  // Create a simple line chart based on graph data
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 800, 400);
  
  // Plotting basic trends
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#0099ff'; // Blue for income or asset
  ctx.beginPath();
  graphData.dates.forEach((date, index) => {
    const x = (index + 1) * 40;
    const y = graphData.amounts[index] || 0;
    ctx.lineTo(x, 400 - y); // Reverse y-axis to make graph go upwards
  });
  ctx.stroke();

  // Save to a temporary file
  const filePath = path.join(__dirname, `../public/graphs/${fileName}.png`);
  await fs.promises.writeFile(filePath, canvas.toBuffer('image/png'));

  return filePath;
};
