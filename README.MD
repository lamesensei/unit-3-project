# RUMU

![screenshot](docs/screenshots/screenshot.png)

_Ready Up; Meet Up_

 Friends all over the place? Can't decide where to meet?
 Let RUMU do all the heavy lifting!

## Features

- Sign up and create groups
- Join existing groups with a simple code (no registration required!)
	- Set your location via GPS or search for it
	- Custom avatars
- Calculate the best meeting point between all members
	- Get the best coffee places, bars, restaurant or shopping recommendations
	- Show travel time and distance for each individual member
- Don't like the meeting point? Drag it around to get new results!

## Installation

Install the required gem dependencies

```
bundle install
```

Initate the Rails DB (postgresql)

```
rails db:create
rails db:migrate
```

Start the server
```
rails server
```
Your local copy of RUMU should be up and running at http://localhost:3000

## Technologies

- **[Ruby 2.5.1](https://www.ruby-lang.org/en/)** - Main Language
- **[Rails 5.2.1](https://rubyonrails.org)** - Backend Framework
- **[PostgreSQL 10.5]()** - SQL Database
- **[Bootstrap](https://getbootstrap.com/)** - CSS Framework
- **[Google Maps API](https://developers.google.com/maps/documentation/)** - Geolocation Features
- **[Heroku](https://heroku.com)** - Demo Deployment

## Team

- [LJ](https://www.github.com/lamesensei)
- [Chris](https://github.com/chrismintan)
- [Mervyn](https://github.com/mervyns)

### Docs

- [Ideas](docs/ideas.md)
- [User Stories](docs/user-stories.md)
- [Wireframes](docs/wireframes)
- [ERD](docs/ERD)


