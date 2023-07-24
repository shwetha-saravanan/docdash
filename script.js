// SIDEBAR DROPDOWN
const allDropdown = document.querySelectorAll('#sidebar .side-dropdown');
const sidebar = document.getElementById('sidebar');

allDropdown.forEach(item=> {
	const a = item.parentElement.querySelector('a:first-child');
	a.addEventListener('click', function (e) {
		e.preventDefault();

		if(!this.classList.contains('active')) {
			allDropdown.forEach(i=> {
				const aLink = i.parentElement.querySelector('a:first-child');

				aLink.classList.remove('active');
				i.classList.remove('show');
			})
		}

		this.classList.toggle('active');
		item.classList.toggle('show');
	})
})





// SIDEBAR COLLAPSE
const toggleSidebar = document.querySelector('nav .toggle-sidebar');
const allSideDivider = document.querySelectorAll('#sidebar .divider');

if(sidebar.classList.contains('hide')) {
	allSideDivider.forEach(item=> {
		item.textContent = '-'
	})
	allDropdown.forEach(item=> {
		const a = item.parentElement.querySelector('a:first-child');
		a.classList.remove('active');
		item.classList.remove('show');
	})
} else {
	allSideDivider.forEach(item=> {
		item.textContent = item.dataset.text;
	})
}

toggleSidebar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');

	if(sidebar.classList.contains('hide')) {
		allSideDivider.forEach(item=> {
			item.textContent = '-'
		})

		allDropdown.forEach(item=> {
			const a = item.parentElement.querySelector('a:first-child');
			a.classList.remove('active');
			item.classList.remove('show');
		})
	} else {
		allSideDivider.forEach(item=> {
			item.textContent = item.dataset.text;
		})
	}
})




sidebar.addEventListener('mouseleave', function () {
	if(this.classList.contains('hide')) {
		allDropdown.forEach(item=> {
			const a = item.parentElement.querySelector('a:first-child');
			a.classList.remove('active');
			item.classList.remove('show');
		})
		allSideDivider.forEach(item=> {
			item.textContent = '-'
		})
	}
})



sidebar.addEventListener('mouseenter', function () {
	if(this.classList.contains('hide')) {
		allDropdown.forEach(item=> {
			const a = item.parentElement.querySelector('a:first-child');
			a.classList.remove('active');
			item.classList.remove('show');
		})
		allSideDivider.forEach(item=> {
			item.textContent = item.dataset.text;
		})
	}
})




// PROFILE DROPDOWN
const profile = document.querySelector('nav .profile');
const imgProfile = profile.querySelector('img');
const dropdownProfile = profile.querySelector('.profile-link');

imgProfile.addEventListener('click', function () {
	dropdownProfile.classList.toggle('show');
})




// MENU
const allMenu = document.querySelectorAll('main .content-data .head .menu');

allMenu.forEach(item=> {
	const icon = item.querySelector('.icon');
	const menuLink = item.querySelector('.menu-link');

	icon.addEventListener('click', function () {
		menuLink.classList.toggle('show');
	})
})



window.addEventListener('click', function (e) {
	if(e.target !== imgProfile) {
		if(e.target !== dropdownProfile) {
			if(dropdownProfile.classList.contains('show')) {
				dropdownProfile.classList.remove('show');
			}
		}
	}

	allMenu.forEach(item=> {
		const icon = item.querySelector('.icon');
		const menuLink = item.querySelector('.menu-link');

		if(e.target !== icon) {
			if(e.target !== menuLink) {
				if (menuLink.classList.contains('show')) {
					menuLink.classList.remove('show')
				}
			}
		}
	})
})





// PROGRESSBAR
const allProgress = document.querySelectorAll('main .card .progress');

allProgress.forEach(item=> {
	item.style.setProperty('--value', item.dataset.value)
})






// APEXCHART
var options = {
  series: [{
  name: 'series1',
  data: [31, 40, 28, 51, 42, 109, 100]
}, {
  name: 'series2',
  data: [11, 32, 45, 32, 34, 52, 41]
}],
  chart: {
  height: 350,
  type: 'area'
},
dataLabels: {
  enabled: false
},
stroke: {
  curve: 'smooth'
},
xaxis: {
  type: 'datetime',
  categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
},
tooltip: {
  x: {
    format: 'dd/MM/yy HH:mm'
  },
},
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();

document.addEventListener("DOMContentLoaded", function () {
    // Dummy data for patient information and OGTT values
    const patientsData = [
        {
            id: 1,
            name: "Emily Johnson",
            age: 28,
            weight: 60,
            phone: "+1 (555) 123-4567",
            email: "emily@example.com",
            ogttData: [
                { time: "Fasting", value: 90 },
                { time: "1 Hour", value: 160 },
                { time: "2 Hours", value: 120 },
                { time: "3 Hours", value: 100 },
                // Add more data points as needed
            ],
        },
        // Add more patient data objects as needed
    ];

    // Function to render the patient list with boxes
    function renderPatientList() {
        const patientListContainer = document.querySelector(".patient-list");
        patientsData.forEach((patient) => {
            const patientBox = document.createElement("div");
            patientBox.classList.add("patient-box");
            patientBox.onclick = () => navigateToPatientDashboard(patient.id);
            const patientImage = document.createElement("img");
            patientImage.src = "https://via.placeholder.com/150"; // Replace with actual patient image URL
            const patientName = document.createElement("p");
            patientName.textContent = patient.name;
            patientBox.appendChild(patientImage);
            patientBox.appendChild(patientName);
            patientListContainer.appendChild(patientBox);
        });
    }

    // Function to navigate to patient dashboard
    function navigateToPatientDashboard(patientId) {
        const patientDashboard = document.querySelector(".patient-dashboard");
        const allPatients = document.querySelectorAll(".patient");
        allPatients.forEach((patient) => {
            patient.style.display = "none";
        });
        const selectedPatient = document.getElementById(`patient-${patientId}`);
        selectedPatient.style.display = "block";
        patientDashboard.style.display = "block";
    }

    // Function to render OGTT chart for each patient
    function renderOGTTCharts() {
        patientsData.forEach((patient) => {
            const ogttData = patient.ogttData;
            const ogttValues = ogttData.map((item) => item.value);
            const ogttTimes = ogttData.map((item) => item.time);

            const options = {
                chart: {
                    type: "line",
                },
                series: [
                    {
                        name: `${patient.name}'s OGTT Values`,
                        data: ogttValues,
                    },
                ],
                xaxis: {
                    categories: ogttTimes,
                },
            };

            const chartContainer = document.createElement("div");
            chartContainer.style.width = "100%";
            chartContainer.style.height = "400px";
            chartContainer.innerHTML = `<canvas id="ogtt-chart-${patient.id}"></canvas>`;
            const patientDetails = document.getElementById(`patient-${patient.id}`);
            patientDetails.appendChild(chartContainer);

            const chart = new ApexCharts(
                document.querySelector(`#ogtt-chart-${patient.id}`),
                options
            );
            chart.render();
        });
    }

    renderPatientList();
    renderOGTTCharts();
});
