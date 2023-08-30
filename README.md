
<a href="https://github.com/standard/standard"><img src="https://cdn.rawgit.com/standard/standard/master/badge.svg"></a>
<a href="https://github.com/electron/electron"><img src="https://img.shields.io/badge/Electron-2B2E3A?style=for-the-badge&logo=electron&logoColor=9FEAF9"></a>
<a href="https://github.com/nodejs"><img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"></a>

# POS ELECTRON APP

Repo for the project of updating the current version of the POS application, which ease the textile management for the business in San Victorino



## Steps for clone  the project

In a terminal write the following line


Create the folder.

> mkdir pos-electron-app && cd pos-electron-app

Clone the repo.

> git clone https://github.com/jose827corrza/pos-electron-app.git .

Install all the dependencies

> npm install

## Most common scripts

To run the app in dev mode in our computer

> npm start

To create a distributable

> npm make

To publish the app (requires a deeper configuration, such as digital signing)

> npm publish

## Scripts for code formatting

To run standard and see the corrections that must be applied run

> npx standard

On the other hand, if you want to set that automatically fix the formatting, run the following script.

> npm run clean:code