const searchBtn = document.getElementById("searchBtn");
const userInput = document.getElementById("searchInput");
const errorAlert = document.getElementById("errorAlert");

userInput.addEventListener("input", () => {
  if (userInput.value.trim() !== "") {
    searchBtn.removeAttribute("disabled");
    searchBtn.classList.remove("bg-gray-700");
    searchBtn.classList.add("bg-gray-500");
  } else {
    searchBtn.setAttribute("disabled", true);
    searchBtn.classList.remove("bg-gray-500");
    searchBtn.classList.add("bg-gray-700");
  }
});

// All countries by continent
const continentSelect = document.getElementById("continentSelect");
continentSelect.addEventListener("change", () => {
  document.getElementById("continentProfile").classList.remove('hidden')
  document.getElementById("continentProfile").innerHTML=''
  const API = "https://restcountries.com/v3.1/all";
  fetch(API)
    .then((response) => {
      return response.json();
    })
    .then((datas) => {
      datas.map((data) => {
        if (data.continents == continentSelect.value) {
          let output = "";
          output += `
          <div>
            <img src=${data.flags.png} class="h-84 w-full" />
            <h1 class="text-xl bg-blue-700 py-2 px-8 rounded-sm mt-4">Country: ${data.name.common}</h1>
            <p class="text-xl bg-blue-500 py-2 px-8 rounded-sm mb-4">Population: ${data.population}</p>
          </div>
          `;
          document.getElementById('countryProfile').classList.add('hidden');

          document.getElementById("continentProfile").innerHTML += output;
        }
      });
    });
});

// Country Search

searchBtn.addEventListener("click", () => {
  const userValue = document.getElementById("searchInput").value;

  const API = `https://restcountries.com/v3.1/name/${userValue}`;

  const showVal = setTimeout(() => {
    fetch(API)
    .then((response) => {
      return response.json();
    })
    .then((datas) => {
        datas.map((data) => {
        console.log(data);

        document.getElementById("continentProfile").classList.add('hidden')

        document.getElementById("countryProfile").classList.remove("hidden");
        document.getElementById("countryName").classList.remove("hidden");
        document.getElementById("continent").classList.remove("hidden");
        document.getElementById("countryPopulation").classList.remove("hidden");

        document.getElementById("countryName").innerHTML =
          "Country: " + data.name.common;
        document.getElementById("continent").innerHTML =
          "Continent: " + data.continents;
        document.getElementById("countryPopulation").innerHTML =
          "Country Population: " + data.population;
        document.getElementById("countryImage").src = data.flags.png;
      });
    })
    .catch(() => {
      console.log("Country Not Found");
        errorAlert.classList.remove("hidden");
        errorAlert.innerHTML = "Country Not Found";
        setTimeout(() => {
          errorAlert.classList.add("hidden");
        }, 3000);
    });
  }, 3000);
  
  if(showVal){
    document.getElementById('fetching').classList.remove('hidden')
    setTimeout(() => {
      document.getElementById('fetching').classList.add('hidden')  
    }, 3000);
  }
  
});
