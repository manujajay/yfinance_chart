document.getElementById('tickerForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const ticker = document.getElementById('tickerInput').value;
    if (!ticker) return;  // Prevent empty form submission

    document.getElementById('loading').style.display = 'block';  // Show loading text
    document.getElementById('chart').innerHTML = '';  // Clear previous chart

    try {
        const response = await fetch(`http://127.0.0.1:5000/data/${ticker}`);
        const data = await response.json();
        const dates = data.map(item => item[0]);
        const prices = data.map(item => item[1]);

        const trace = {
            x: dates,
            y: prices,
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'blue'}
        };

        const layout = {
            title: `${ticker.toUpperCase()} Stock Price: Last 3 Years`,
            xaxis: {title: 'Date'},
            yaxis: {title: 'Price'},
            autosize: true,
            responsive: true
        };

        Plotly.newPlot('chart', [trace], layout);
    } catch (error) {
        console.error('Error fetching or plotting data:', error);
    }

    document.getElementById('loading').style.display = 'none';  // Hide loading text
});

