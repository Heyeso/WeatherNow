[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<div align="center">
  <a href="https://weathernowjs.web.app/">
   <img alt="Logo" src="https://github.com/Heyeso/WeatherNow/blob/dev/public/assets/logo192.png?raw=true" width="100" />
  </a>

  <h3 align="center">WeatherNow</h3>

  <p align="center">
    A user friendly web application that provides information on the weather condition of a location
    <br />
    <br />
    <a href="https://weathernowjs.web.app/">View Demo</a>
    ·
    <a href="https://github.com/Heyeso/WeatherNow/issues">Report Bug</a>
    ·
    <a href="https://github.com/Heyeso/WeatherNow/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

![image](https://user-images.githubusercontent.com/60695851/150865949-1e5322fe-ad52-477a-b6ec-0a0665239597.png)

Get simplified information on the current weather with WeatherNow. A user friendly web application that provides information on the weather condition of a location. Created with react and`Open Weather API`.
WeatherNow uses `Open Weather API` new API called `onecall` along with their existing services to display useful information to users.

Features:
* Using Javascript's geolocation feature, application is able to request current weather conditions of the user's location.
* WeatherNow has a search feature to request for the data on weather conditions around the world.
* User's searches are stored locally and are displayed on application launch.
* Application features a light/dark mode reflecting the time of the day in the user's location.

While the current version of the application delivers useful features, there are more features to be implemented.

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [React.Ts](https://www.typescriptlang.org/docs/handbook/react.html)
* [JQuery](https://jquery.com)
* [Styled-Components](https://styled-components.com/)
* [Typescript](https://www.typescriptlang.org/)
* [react-router-dom](https://v5.reactrouter.com/web/guides/quick-start)
* [Open Weather API](https://openweathermap.org/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

* npm
  ```sh
  npm i npm@latest -g
  ```

### Installation

1. Get a free API Key at [https://openweathermap.org/api](https://openweathermap.org/api)
2. Clone the repo
   ```sh
   git clone https://github.com/Heyeso/WeatherNow.git
   ```
3. Install NPM packages
   ```sh
   npm i
   ```
4. Enter your API in `.env`
   ```js
   REACT_APP_API_KEY = 'ENTER YOUR API'
   REACT_APP_API_URL = "https://api.openweathermap.org/data/2.5/onecall?appid={API key}&"
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] GET and display weather data on user's current Location
- [x] Search weather data on locations around the world.
- [ ] Change Temperature Unit

See the [open issues](https://github.com/Heyeso/WeatherNow/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>


## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Abdulsalam Odetayo - [@LinkedIn](https://www.linkedin.com/in/abdulsalam-odetayo-87ba72202/) - adeodetayo@gmail.com

Project Link: [https://github.com/Heyeso/WeatherNow](https://github.com/Heyeso/WeatherNow)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Google Fonts](https://fonts.google.com/)
* [Feather Icons](https://feathericons.com/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/Heyeso/WeatherNow.svg?style=for-the-badge
[contributors-url]: https://github.com/Heyeso/WeatherNow/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Heyeso/WeatherNow.svg?style=for-the-badge
[forks-url]: https://github.com/Heyeso/WeatherNow/network/members
[stars-shield]: https://img.shields.io/github/stars/Heyeso/WeatherNow.svg?style=for-the-badge
[stars-url]: https://github.com/Heyeso/WeatherNow/stargazers
[issues-shield]: https://img.shields.io/github/issues/Heyeso/WeatherNow.svg?style=for-the-badge
[issues-url]:https://github.com/Heyeso/WeatherNow/issues
[license-shield]: https://img.shields.io/github/license/Heyeso/WeatherNow.svg?style=for-the-badge
[license-url]: https://github.com/Heyeso/WeatherNow/blob/dev/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/abdulsalam-odetayo-87ba72202/
