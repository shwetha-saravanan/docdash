// script.js

document.addEventListener("DOMContentLoaded", function () {
    // Dummy data for OGTT values (replace with actual patient data)
    const patientsData = [
        { id: 1, name: "Emily Johnson", age: 28, weight: 60, phone: "+1 (555) 123-4567", email: "emily@example.com", ogttData: [ /* ... */ ] },
        { id: 2, name: "Susan Williams", age: 31, weight: 65, phone: "+1 (555) 987-6543", email: "susan@example.com", ogttData: [ /* ... */ ] },
        { id: 3, name: "Michael Smith", age: 29, weight: 70, phone: "+1 (555) 555-5555", email: "michael@example.com", ogttData: [ /* ... */ ] },
        { id: 4, name: "John Doe", age: 32, weight: 75, phone: "+1 (555) 111-2222", email: "john@example.com", ogttData: [ /* ... */ ] },
        { id: 5, name: "Jane Smith", age: 30, weight: 68, phone: "+1 (555) 222-3333", email: "jane@example.com", ogttData: [ /* ... */ ] }
    ];

    // Create OGTT charts for each patient
    patientsData.forEach(patient => createOGTTChart(patient.id, patient.ogttData));

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

    // Function to handle GDM prediction for a specific patient
    function predictGDM(patientId) {
        // Fetch patient data based on the ID
        const selectedPatient = patientsData.find(patient => patient.id === patientId);

        // Get the latest OGTT value for prediction
        const ogttValues = selectedPatient.ogttData.map(item => item.value);
        const latestValue = ogttValues[ogttValues.length - 1];

        // Perform GDM prediction (replace with actual API call)
        // Dummy function for illustration (replace with actual API call)
        function predictGDMFromBackend(ogttValue) {
            // Replace this with your actual backend API call to predict GDM
            // For demonstration purposes, let's assume a simple threshold-based classification
            const threshold = 140;
            return ogttValue >= threshold ? "GDM" : "non-GDM";
        }

        const predictionResult = predictGDMFromBackend(latestValue);

        // Display the prediction result
        const predictionElement = document.getElementById(`prediction-result-${patientId}`);
        if (predictionResult === "GDM") {
            predictionElement.textContent = "Prediction: Gestational Diabetes Mellitus (GDM)";
        } else if (predictionResult === "non-GDM") {
            predictionElement.textContent = "Prediction: Non-Gestational Diabetes Mellitus (non-GDM)";
        } else {
            predictionElement.textContent = "Prediction: Not available";
        }
    }

    // Function to show patient details on click
    function showPatientDetails(patientId) {
        const patientContainers = document.querySelectorAll(".patient");
        for (const container of patientContainers) {
            container.style.display = "none";
        }
        const selectedContainer = document.getElementById(`patient-${patientId}`);
        selectedContainer.style.display = "block";
    }

    // Event listeners for patient clicks and GDM prediction buttons
    const patientListItems = document.querySelectorAll(".patient-list li");
    patientListItems.forEach((item, index) => {
        const patientId = index + 1;
        item.addEventListener("click", () => showPatientDetails(patientId));

        const predictButton = document.getElementById(`predict-button-${patientId}`);
        predictButton.addEventListener("click", () => predictGDM(patientId));
    });
});

