
let check = false;

window.citysearch = async function () {
    if (check) {
        const dataparent = document.getElementById("dataparent");
        if (dataparent) {
            dataparent.remove();
        }
        check = false;
    }

    const name = document.getElementById("inp").value;
    try {
        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=81232bf57ca74fc0b07130709242410&q=${name}&aqi=no`);

        if (!response.error && !check) {
            const dataparent = document.createElement("div");
            dataparent.setAttribute("id", "dataparent");

            const databoxparent = document.createElement("div");
            databoxparent.setAttribute("id", "databoxparent");

            const databox = document.createElement("div");
            databox.setAttribute("id", "databox");

            const location = [response.data.location.name , response.data.location.region, response.data.location.country];
            const weatherdetails = [
                response.data.current.temp_c,
                response.data.current.temp_f,
                response.data.current.is_day,
                response.data.current.condition.text,
                response.data.current.wind_kph,
                response.data.current.precip_mm,
                response.data.current.humidity
            ];

            const divValue1 = ['<div class="maindata">Location(Name) = ' ,'<div class="maindata">Location(Region) = ', '<div class="maindata">Location(Country) = '];
            const divValue2 = [
                '<div class="maindata">Current Temperature (Celsius) = ',
                '<div class="maindata">Current Temperature (Fahrenheit) = ',
                '<div class="maindata">Day or Night = ',
                '<div class="maindata">Conditions = ',
                '<div class="maindata">Wind Speed = ',
                '<div class="maindata">Precipitation Index = ',
                '<div class="maindata">Humidity Index = '
            ];

            for (let i = 0; i < divValue1.length; i++) {
                databox.innerHTML += divValue1[i] + location[i] + "</div>";
            }

            for (let i = 0; i < divValue2.length; i++) {
                if(i!=2)
                {
                    databox.innerHTML += divValue2[i] + weatherdetails[i] + "</div>";
                }
                else
                {
                    if(weatherdetails[i] == 0)
                    {
                        databox.innerHTML += divValue2[i] +" Night </div>";
                    }
                    else{
                        databox.innerHTML += divValue2[i] +" Day </div>";
                    }
                }
            }

            databoxparent.appendChild(databox);
            dataparent.appendChild(databoxparent);
            document.body.appendChild(dataparent);
            check = true;
        }
    } catch (error) {
        const dataparent = document.createElement("div");
        dataparent.setAttribute("id", "dataparent");

        const databoxparent = document.createElement("div");
            databoxparent.setAttribute("id", "databoxparent");

            const databox = document.createElement("div");
            databox.setAttribute("id", "databox");
        
        databox.innerHTML = '<div id="maindata">Geolocation is not supported by this browser.</div>';
        databoxparent.appendChild(databox);
            dataparent.appendChild(databoxparent);
            document.body.appendChild(dataparent);
        check = true;
    }
}

window.currsearch = async function ()
{
    if (check) 
    {
        const dataparent = document.getElementById("dataparent");
        if (dataparent) {
            dataparent.remove();
        }
        check = false;
    }
    
    if(navigator.geolocation) 
    {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } 
    else 
    {
        const dataparent = document.createElement("div");
        dataparent.setAttribute("id", "dataparent");

        const databoxparent = document.createElement("div");
        databoxparent.setAttribute("id", "databoxparent");

        const databox = document.createElement("div");
        databox.setAttribute("id", "databox");
        
        databox.innerHTML = '<div id="maindata">Geolocation is not supported by this browser.</div>';
        databoxparent.appendChild(databox);
        dataparent.appendChild(databoxparent);
        document.body.appendChild(dataparent);
        check = true;
    }
    
    async function showPosition(position) {
        try {
            const locationResponse = await axios.get(`https://us1.locationiq.com/v1/reverse?key=pk.ef755946b4e02032b79d7d19f9a84ad8&lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`);
            
            console.log(locationResponse.data); // Log the entire response to understand its structure
    
            const town = locationResponse.data.address.town || 
                         locationResponse.data.address.city || 
                         locationResponse.data.address.village || 
                         locationResponse.data.address.state_district;
    
            if (!town) {
                throw new Error("Location not specific enough");
            }
    
            const weatherResponse = await axios.get(`http://api.weatherapi.com/v1/current.json?key=81232bf57ca74fc0b07130709242410&q=${town}&aqi=no`);
    
            if (!weatherResponse.error && !check) {
                const dataparent = document.createElement("div");
                dataparent.setAttribute("id", "dataparent");
    
                const databoxparent = document.createElement("div");
                databoxparent.setAttribute("id", "databoxparent");
    
                const databox = document.createElement("div");
                databox.setAttribute("id", "databox");
    
                const location = [weatherResponse.data.location.name , weatherResponse.data.location.region, weatherResponse.data.location.country];
                const weatherdetails = [
                    weatherResponse.data.current.temp_c,
                    weatherResponse.data.current.temp_f,
                    weatherResponse.data.current.is_day,
                    weatherResponse.data.current.condition.text,
                    weatherResponse.data.current.wind_kph,
                    weatherResponse.data.current.precip_mm,
                    weatherResponse.data.current.humidity
                ];
    
                const divValue1 = ['<div class="maindata">Location(Name) = ' ,'<div class="maindata">Location(Region) = ', '<div class="maindata">Location(Country) = '];
                const divValue2 = [
                    '<div class="maindata">Current Temperature (Celsius) = ',
                    '<div class="maindata">Current Temperature (Fahrenheit) = ',
                    '<div class="maindata">Day or Night = ',
                    '<div class="maindata">Conditions = ',
                    '<div class="maindata">Wind Speed = ',
                    '<div class="maindata">Precipitation Index = ',
                    '<div class="maindata">Humidity Index = '
                ];
    
                for (let i = 0; i < divValue1.length; i++) {
                    databox.innerHTML += divValue1[i] + location[i] + "</div>";
                }
    
                for (let i = 0; i < divValue2.length; i++) {
                    if(i!=2)
                    {
                        databox.innerHTML += divValue2[i] + weatherdetails[i] + "</div>";
                    }
                    else
                    {
                        databox.innerHTML += divValue2[i] + (weatherdetails[i] == 0 ? " Night </div>" : " Day </div>");
                    }
                }
    
                databoxparent.appendChild(databox);
                dataparent.appendChild(databoxparent);
                document.body.appendChild(dataparent);
                check = true;
            }
        } catch (error) {
            console.log(error);
            const dataparent = document.createElement("div");
            dataparent.setAttribute("id", "dataparent");
    
            const databoxparent = document.createElement("div");
            databoxparent.setAttribute("id", "databoxparent");
    
            const databox = document.createElement("div");
            databox.setAttribute("id", "databox");
    
            databox.innerHTML = '<div class="maindata">No Such Location Exists! Please Check and Try Again!</div>';
            databoxparent.appendChild(databox);
            dataparent.appendChild(databoxparent);
            document.body.appendChild(dataparent);
            check = true;
        }
    }
    

    function showError(error) {

        const dataparent = document.createElement("div");
        dataparent.setAttribute("id", "dataparent");

        const databoxparent = document.createElement("div");
            databoxparent.setAttribute("id", "databoxparent");

            const databox = document.createElement("div");
            databox.setAttribute("id", "databox");

            switch(error.code) {
                case error.PERMISSION_DENIED:
                    databox.innerHTML = '<div class="maindata">User denied the request for Geolocation.</div>';
                    break;
                case error.POSITION_UNAVAILABLE:
                    databox.innerHTML = '<div class="maindata">Location information is unavailable.</div>';
                    break;
                case error.TIMEOUT:
                    databox.innerHTML = '<div class="maindata">The request to get user location timed out.';
                    break;
                case error.UNKNOWN_ERROR:
                    databox.innerHTML = '<div class="maindata">An unknown error occurred.';
                    break;
            }
        databoxparent.appendChild(databox);
            dataparent.appendChild(databoxparent);
            document.body.appendChild(dataparent);
        check = true;
        }
    }
