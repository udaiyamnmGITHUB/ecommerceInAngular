# An E-commerce web application - Version - 1.0

***

## Purpose

The idea is to **demonstrate Angular web application using lazy loading, state management framework - ngrx, bootstrap and few other Angular suppported libraies.**. 

This is a responsive Angular web application a clothing retailer. It is mainly catogrised as Men and Women and grouped the products as Formals, Casuals and Footwears.

## Stack

* UI framework: Angular 7 using TypeScript
* UI state management: NgRx 
* UI responsive design framework: ngxBootstrap

### Build

It is a complete project with a build system focused on Angular app and tightly integrated AngularCli
* test written using [Jasmine](http://jasmine.github.io/) syntax
* test are executed by [Karma Test Runner]
* build supporting JS, CSS and Angular templates minification

## Installation

### Platform & tools

You need to install Node.js and then the development tools. Node.js comes with a package manager called [npm](http://npmjs.org) for installing NodeJS applications and libraries.
* [Install node.js](http://nodejs.org/download/) (requires node.js version >= 10.0.0)

### Get the Code

Either clone this repository or fork it on GitHub and clone your fork:

```
git clone https://github.com/udaiyamnmGITHUB/ecommerceInAngular.git
cd ecommerceInAngular
```

## Building
Our client application is a straight HTML/Javascript application but our development process uses a Node.js build tool
which is AngularCli. 

* Install local dependencies (from the project root folder):  ` npm install`
* once node-modules are installed run this command to connect to dev server:  ` npm start`
* Browse to the application at [http://localhost:4200]
* Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


## Browser Support
This is tested on Chrome. 
The application should run on most modern browsers that are supported by the AngularJS framework.

### Unit testing
You can run unit test by using below commands

* Run `npm test`.
* Open one or more browsers and point them to [http://localhost:9876].
* Each time a file changes the tests will be run against each browser.


## Approach to solve the business problem

* I have defined a  json structure and created .json file to list the products. 
* Application captures this product.json on the initialization of app module and stored in NgRx store.
* Child componets like front-page or catogery or product detail are subscribing the NgRx store to display the products and its quantity.
* When user adds the product to the shopping cart, UI triggers the NgRX Actions to update the store with help of Reducers. So, UI state management / availablity of products are refereshed without any hassle. 
* Local stoarege is used to store shopping cart items list.
