# Hightechu Academy Group Project :metal:

HighTechU Group Project

## Stickyboard

### Website :star:

https://stickyboard-hightechu.herokuapp.com/

### Mini Pitch :ghost:

Stickyboard is an easy to use collaboration and teaching software. Powered off of TogetherJS by Mozilla, it includes a chat room, VC (beta), and custom usernames for each user. It centers around the whiteboard, where ideas can easily be shared by any participants. It only takes 10 seconds to set up a room, where you can even choose your own special code. Especially during this time of pandemic, what better way to teach remotely than with Stickyboard?

### Problem Statment :mega:

What if you needed a way to visually communicate ideas, but without the hassle of travel?

### User Stories :snowboarder:

As a host, I want:
1. To be able to draw something that my students/attendees can see
2. A strong server so that I can keep sharing ideas without interruptions
3. To choose my own room code, and choose who joins

As an attendee, I want:
1. To be able to communicate ideas with others both visually and textually

### Website Pages :speedboat:

Landing and Login: index.html

Chat room with whiteboard: page.html#&togetherjs=[room code]

### Promo :grinning:



## Getting Started :thinking:

### Requirements :dog:

* [git](https://git-scm.com)
* [Node.js](https://nodejs.org/en/)
* [npm](https://www.npmjs.com) (**Installed with Node.js**)
* [LoopBack CLI Tool](https://loopback.io/lb3/getting-started)

### Obtaining the Project :cat:

1. Open the terminal

2. Change into your working directory

```
cd working/directory
```

3. Clone the repository 

```
git clone URL
```

4. Change into the repository

```
cd REPO_NAME
```

### Running the Application :deer:

1. Install the node_modules

```
npm install
```

2. Run the application locally

```
node .
```

3. Head over to [http://0.0.0.0:3000](http://0.0.0.0:3000) and [http://0.0.0.0:3000/explorer](http://0.0.0.0:3000/explorer) in the browser of your choice.

### Adding Custom Models :ocean:

1. Add Custom Models

```
lb model
```

2. Follow command prompts

## Deploying :bear:

We are using Heroku to host our application. The following steps should only be done once. After setting up the application to deploy with GitHub, everytime you push to the master branch you will re-deploy your application.

1. Log into [Heroku](https://id.heroku.com/login)

1. Create a new app

1. Setup `Deploy with GitHub` (Deploy -> GitHub -> Select Repository)

1. Setup a `mongodb datasource for loopback` using [mLab MongoDB addon](https://elements.heroku.com/addons/mongolab)

1. Replace the `server/datasources.json` with the following:

```json
{
  "db": {
    "db": {
      "url": "mongodb://URL",
      "name": "mongoDS",
      "useNewUrlParser": true,
      "connector": "mongodb"
    }
  }
}
```

**Make sure to replace `URL` with the URL the Heroku mLab MongoDB addon provides.**

## Resources :blue_book:

* [GitHub](https://github.com)
* [GitHub Help](https://help.github.com/)
* [GitHub Markdown Help](https://help.github.com/en/articles/basic-writing-and-formatting-syntax)
* [GIT Command Line Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
* [Heroku](https://www.heroku.com)
* [Heroku Documentation](https://devcenter.heroku.com/categories/reference)
* [Loopback](http://loopback.io)
* [Loopback Documentation](https://loopback.io/lb3/getting-started)

## Support :grey_question:

For support, visit the [HighTechU Academy Slack]().
