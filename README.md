<img src="./favicon.ico" align="right" width="160px" height="170px"/>

# [COVID-19](http://54.95.189.51:3005/) ![We0mmmBadge](https://img.shields.io/badge/-We0mmm-blue?logo=visual-studio-code)

* This app is designed for gathering covid-19 cases for Irvine, Orange County, and also US on daily bases;
* All data was retrieved from official health department;
* Multi-language is supported in this app: English and Mandarin;
---
* App front end uses React.js, back end uses Java Spring, and database uses MySQL;
* App includes an admin page for CRUDing ***toaster*** notification and potentially for daily data;
* In order to easily switch between multi-language, all texts are stored in a ***.json*** file since there are only few texts needed in this app; 
* React hook ***useContext*** is used to physically switch between languages;
* This app hasn't include back-end authentication, instead, react handles admin page access by using short token and creating variable in local storage which will be removed after 1 hour;