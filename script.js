// script.js

document.addEventListener("DOMContentLoaded", function () {
    // Dummy data for OGTT values (replace with actual patient data)
    const patientsData = [
        { id: 1, name: "Emily Johnson", age: 28, weight: 60, phone: "+1 (555) 123-4567", email: "emily@example.com", ogttData: [ /* ... */ ] },
        // Add data for other patients...
    ];

    // Loop through the patient data and create OGTT charts for each patient
    patientsData.forEach(patient => createOGTTChart(patient.id, patient.ogttData));
});

// Function to create OGTT chart for a specific patient
function createOGTTChart(patientId, ogttData) {
    // Extracting date labels and values from the data
    const dates = ogttData.map(item => item.date);
    const values = ogttData.map(item => item.value);

    // Creating the OGTT chart using Chart.js
    const ctx = document.getElementById(`ogtt-chart-${patientId}`).getContext("2d");
    const ogttChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: dates,
            datasets: [{
                label: "OGTT Values (mg/dL)",
                data: values,
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderWidth: 2,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: "time",
                    time: {
                        unit: "day",
                        displayFormats: {
                            day: "MMM D"
                        }
                    },
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 10,
                    },
                },
                y: {
                    beginAtZero: true,
                    suggestedMax: 200,
                    stepSize: 20,
                }
            },
        }
    });
}
