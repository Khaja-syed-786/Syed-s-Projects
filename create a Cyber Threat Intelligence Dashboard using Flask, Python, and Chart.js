Flask==2.0.2
pandas==1.3.3
matplotlib==3.4.3
chart.js
from flask import Flask, render_template
import pandas as pd
import os

app = Flask(__name__)

# Load data (this can be from a CSV file, database, or API)
def load_data():
    # Example: Load data from a CSV file
    data_file = os.path.join('data', 'threat_data.csv')
    df = pd.read_csv(data_file)
    return df

@app.route('/')
def index():
    df = load_data()
    # Convert data to JSON for use in JavaScript
    threat_data = df.to_json(orient='records')
    return render_template('index.html', threat_data=threat_data)

if __name__ == '__main__':
    app.run(debug=True)
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cyber Threat Intelligence Dashboard</title>
    <link rel="stylesheet" href="{{ url_for('static', filename='style.css') }}">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <div class="container">
        {% block content %}{% endblock %}
    </div>
    <script src="{{ url_for('static', filename='script.js') }}"></script>
</body>
</html>
{% extends "layout.html" %}

{% block content %}
<h1>Cyber Threat Intelligence Dashboard</h1>
<canvas id="threatChart" width="400" height="200"></canvas>

<script>
    const threatData = {{ threat_data|safe }};
    
    const labels = threatData.map(item => item.threat_name); // Assume the CSV has a 'threat_name' column
    const values = threatData.map(item => item.threat_level); // Assume the CSV has a 'threat_level' column

    const ctx = document.getElementById('threatChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar', // or 'line', 'pie', etc.
        data: {
            labels: labels,
            datasets: [{
                label: 'Threat Levels',
                data: values,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
</script>
{% endblock %}
body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 20px;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background: white;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
    text-align: center;
}

canvas {
    margin: 20px 0;
}
threat_name,threat_level
Phishing,5
Malware,4
Ransomware,5
DDoS,3
SQL Injection,2
pip install -r requirements.txt
python app.py
