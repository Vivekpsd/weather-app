import React from 'react';
import Title from './components/Title.component'
import Form from './components/Form.component'
import Weather from './components/Weather.component'

const API_KEY = 'd41651c2dd620758ec4f010c54737ada';

class App extends React.Component{

  state = {
    temperature : undefined,
    city : undefined,
    country : undefined,
    humidity : undefined,
    description : undefined,
    error : undefined
  }

  getWeather = async (e) => {
    e.preventDefault()
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}`)
    const data = await api_call.json();

    if (city && country ) {
      if (data.cod == 404) {
          this.setState({
              temperature: undefined,
              city: undefined,
              country: undefined,
              humidity: undefined,
              description: undefined,
              error: "Input doesn't match any known location!"
          });
          
      } else {
          const temp = (data.main.temp)-273.1
          this.setState({
              temperature:temp.toFixed(2) + " C",
              city: data.name,
              country: data.sys.country,
              humidity: data.main.humidity,
              description: data.weather[0].description,
              error: ""
          });
      }
  }
    else{
      this.setState({
        temperature:undefined,
        city : undefined,
        country : undefined,
        humidity : undefined,
        description : undefined,
        error:'Please enter the values'
      })
    }
  }

  render(){
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-md-5 col-sm-12 title-container">
                  <Title />
                </div>
                <div className="col-md-7 col-sm-12 form-container">
                  <Form getWeather={this.getWeather} />
                  <Weather 
                    temperature={this.state.temperature} 
                    humidity={this.state.humidity}
                    city={this.state.city}
                    country={this.state.country}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

