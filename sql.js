var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./gold_medals.sqlite');

/*
Returns a SQL query string that will create the Country table with four columns: name (required), code (required), gdp, and population.
*/

const createCountryTable = () => {
  let sqlcommand = "CREATE TABLE Country ('name' TEXT NOT NULL, 'code' TEXT NOT NULL, 'gdp' int, 'population' int);"
  return sqlcommand;
};

/*
Returns a SQL query string that will create the GoldMedal table with ten columns (all required): id, year, city, season, name, country, gender, sport, discipline, and event.
*/

const createGoldMedalTable = () => {
  let sqlcommand =
`CREATE TABLE GoldMedal (
  'id' int PRIMARY KEY,
  'year' int NOT NULL,
  'city' TEXT NOT NULL,
  'season' TEXT NOT NULL,
  'name' TEXT NOT NULL,
  'country' TEXT NOT NULL,
  'gender' TEXT NOT NULL,
  'sport' TEXT NOT NULL,
  'discipline' TEXT NOT NULL,
  'event' TEXT NOT NULL)`;

  return sqlcommand;

};

/*
Returns a SQL query string that will find the number of gold medals for the given country.
*/

const goldMedalNumber = country => {

  let sqlcommand =
  `SELECT count(*) as 'count' from GoldMedal where country='${country}'`;
  return sqlcommand;

};

/*
Returns a SQL query string that will find the year where the given country
won the most summer medals, along with the number of medals aliased to 'count'.
*/

const mostSummerWins = country => {

  let sqlcommand =
  `SELECT year, count(*) as 'count' from GoldMedal where country='${country}' and season='Summer' group by year order by count(*) desc limit 1`;
  return sqlcommand;
};

/*
Returns a SQL query string that will find the year where the given country
won the most winter medals, along with the number of medals aliased to 'count'.
*/

const mostWinterWins = country => {
  let sqlcommand =
  `SELECT year, count(*) as 'count' from GoldMedal where country='${country}' and season='Winter' group by year order by count(*) desc limit 1`;
  return sqlcommand;
};

/*
Returns a SQL query string that will find the year where the given country
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestYear = country => {
  let sqlcommand =
  `SELECT year, count(*) as 'count' from GoldMedal where country='${country}' group by year order by count(*) desc limit 1`;
  return sqlcommand;
};

/*
Returns a SQL query string that will find the discipline this country has
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestDiscipline = country => {
  let sqlcommand =
  `SELECT discipline, count(*) as 'count' from GoldMedal where country='${country}' group by discipline order by count(*) desc limit 1`;
  return sqlcommand;
};

/*
Returns a SQL query string that will find the sport this country has
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestSport = country => {
  let sqlcommand =
  `SELECT sport, count(*) as 'count' from GoldMedal where country='${country}' group by sport order by count(*) desc limit 1`;
  return sqlcommand;
};

/*
Returns a SQL query string that will find the event this country has
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestEvent = country => {
  let sqlcommand =
  `SELECT event, count(*) as 'count' from GoldMedal where country='${country}' group by event order by count(*) desc limit 1`;
  return sqlcommand;
};

/*
Returns a SQL query string that will find the number of male medalists.
*/

const numberMenMedalists = country => {
  let sqlcommand =
  `SELECT count(distinct name) from GoldMedal WHERE gender = 'Men' AND country =  '${country}'`;
  return sqlcommand;
};

/*
Returns a SQL query string that will find the number of female medalists.
*/

const numberWomenMedalists = country => {
  let sqlcommand =
  `SELECT count(distinct name) from GoldMedal WHERE gender = 'Women' AND country =  '${country}'`
  return sqlcommand;
};

/*
Returns a SQL query string that will find the athlete with the most medals.
*/

const mostMedaledAthlete = country => {
  let sqlcommand =
  `SELECT name, count(*) as 'count' from GoldMedal WHERE country =  '${country}' group by name order by count desc limit 1`
  return sqlcommand;
};

/*
Returns a SQL query string that will find the medals a country has won
optionally ordered by the given field in the specified direction.
*/

const orderedMedals = (country, field, sortAscending) => {

  if (sortAscending){
    ascdesc = 'ASC'
  } else {
    ascdesc = 'DESC'
  }

  let sqlcommand =
  `SELECT * from GoldMedal WHERE country = '${country}' order by ${field} ${ascdesc}`
  return sqlcommand;
};

/*
Returns a SQL query string that will find the sports a country has
won medals in. It should include the number of medals, aliased as 'count',
as well as the percentage of this country's wins the sport represents,
aliased as 'percent'. Optionally ordered by the given field in the specified direction.
*/

const orderedSports = (country, field, sortAscending) => {
  if (sortAscending){
    ascdesc = 'ASC'
  } else {
    ascdesc = 'DESC'
  }

  let sqlcommand =
  `SELECT sport, count(sport) as 'count', (count(sport) * 100/(select count(*) from GoldMedal where country='${country}')) as 'percent' from GoldMedal WHERE country = '${country}' group by sport order by ${field} ${ascdesc}`
  return sqlcommand;
};

module.exports = {
  createCountryTable,
  createGoldMedalTable,
  goldMedalNumber,
  mostSummerWins,
  mostWinterWins,
  bestDiscipline,
  bestSport,
  bestYear,
  bestEvent,
  numberMenMedalists,
  numberWomenMedalists,
  mostMedaledAthlete,
  orderedMedals,
  orderedSports
};
