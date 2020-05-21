/* Global Variables */
const appUrl = "http://localhost:3000";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
// Personal API Key for OpenWeatherMap API
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&units=metric&appid=08d9063f4928ccafdba864b895f93204";

// Event listener to add function to existing HTML DOM element
const element = document.getElementById("generate");
element.addEventListener("click", (event) => {
  callback();
});

/* Function called by event listener */
const callback = async () => {
  const zipCode = document.getElementById("zip").value;
  const userResponse = document.getElementById("feelings").value;
  const data = await retrieveData(baseUrl, zipCode, apiKey);
  const newData = {
    temperature: data.main.temp,
    date: newDate,
    userResponse: userResponse,
  };
  await postData(appUrl, newData);
  updateUI();
};

/* Function to GET Web API Data*/
const retrieveData = async (baseUrl, zipCode, apiKey) => {
  const url = `${baseUrl}${zipCode}${apiKey}`;
  const request = await fetch(url);
  try {
    // Transform into JSON
    const allData = await request.json();
    return allData;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

/* Function to POST data */

const postData = async (path, data = {}) => {
  const response = await fetch(path, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
};

/* Function to update UI */
const updateUI = async () => {
  const response = await fetch(`${appUrl}/all`);
  const jsonResponse = await response.json();
  document.getElementById("date").innerHTML = jsonResponse.date;
  document.getElementById("temp").innerHTML = jsonResponse.temperature;
  document.getElementById("content").innerHTML = jsonResponse.userResponse;
};
