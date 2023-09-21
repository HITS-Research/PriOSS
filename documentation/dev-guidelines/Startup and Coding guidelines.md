# Angular

## Startup Guidelines
- It is recommended to use Visual studio code for development with angular. You can download it from here https://code.visualstudio.com/download.
- Install nodejs before installing Angular. Download from https://nodejs.org/en/download/ and recommend version for node is 18.14.0
  - After the installation you can verify that node is correctly installed by running `node --version` and `npm --version` in a terminal, for example from inside visual studio code.

- To install angular please follow this link  https://code.visualstudio.com/docs/nodejs/angular-tutorial. Recommend version for angular is 15.1.0
- After angular is installed, open a terminal (if you don't have one open already), navigate inside the `prioss/prototype/prioss` folder and run `npm install` to install all necessary packages for the project
- After that, run `ng serve` to compile the project and start a development server for testing under localhost
  - If you get an error, saying that you can't execute a script called ng.ps1, you have to edit your execution policies, like shown here: https://stackoverflow.com/questions/68178101/angular-ng-ps1-cannot-be-loaded-because-running-scripts-is-disabled-on-this-sy

- When ng serve succeeds, it should print to the console under which URL you can reach your development server. By default this should be  http://localhost:4200/

The Angular CLI is a command-line interface tool that is used to initialize, develop, scaffold, maintain, and even test and debug Angular applications.
- ng new -  To create a new project in angular
- ng generate - To generate new components, routes, services and pipes
- ng serve - To run the project
- ng test - To test your unit test and end-to-end test
- ng build - To build your project

## Coding guidelines

This document contains the coding guidelines for project PriOSS. It is divides into four sections

1) File and Folder Structure Guidelines
2) CSS Guidelines
3) Typescript Guidelines
4) Best Practices

### File and Folder Structure Guidelines

Naming conventions are hugely important to maintainability and readability and helps to provide a consistent way to find the content at a glance. Consistency within the project is vital which helps in tremendous efficiency.

1) File Naming  
- Names of the folder and files should clearly convey their intent e.g.:  app/country/country-list.component.ts may contain a component that manages a list of a country.
- Names should be consistent with the same pattern in which we mention the file’s feature first and then the type, dot separated e.g.: consultation.component.ts or home.component.html or auth.service.ts
- For adding more descriptive text to the file name use a dash(-) to seperate the words e.g country-list.component.ts
- Use lowercase for file and folder names.

2) Class Name:
- The nam of a class should use upper camel case style with an added suffix representing the type of our file e.g: DatePickerDirective, HomeComponent, AuthService.

3) Folder structure
- Our top-level folder of the angular project is ```prototype/prioss``` and it contains all of our application's code and resources.
- Use a subfolder for each component: Divide each module into components, and create a separate subfolder for each component. 
- Store component-related files in the component folder: Store each component's template file, style file, and component class file in the component folder. 
- Store shared resources in a shared folder: Store shared resources, such as images, fonts, and other assets, in a shared folder.
- Store services in a separate folder: Store services in a separate folder, and organize services into subfolders based on their functionality.  maintain.
- Store environment-specific configuration in an environment folder: Store environment-specific configuration in an environment folder, and use environment files to configure your application for different environments.
- Store testing files in a separate folder: Store testing files, such as test cases and test utilities, in a separate folder.
- Please see below image for your reference to understand folder structure of an sample angular project.
![alt text](./folder-structure-eg.png)

### CSS styling guidelines

In this project we would be using LESS(Leaner style sheets) for styling. It is an extension for CSS. Here are some guidelines which can help while styling with LESS.
- Use variables: Store values that you want to reuse throughout your stylesheet in variables.

```LESS
@width: 10px;
@height: @width + 10px;

#header {
width: @width;
height: @height;
}
```

- Use mixins: Group common styles and reuse them throughout your stylesheet.
```LESS
.bordered {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}
```
And we want to use these properties inside other rule-sets. Well, we just have to drop in the name of the class where we want the properties, like so:
```LESS
#menu a {
  color: #111;
  .bordered();
}

.post a {
  color: red;
  .bordered();
}
```

- Nest selectors: Keep your styles organized by nesting selectors inside one another.

```LESS
#header {
  color: black;
  .navigation {
    font-size: 12px;
  }
  .logo {
    width: 300px;
  }
}
```

- Use operations: Perform mathematical operations on variables and values in your stylesheet.

```LESS
// numbers are converted into the same units
@conversion-1: 5cm + 10mm; // result is 6cm
@conversion-2: 2 - 3cm - 5mm; // result is -1.5cm

// conversion is impossible
@incompatible-units: 2 + 5px - 3cm; // result is 4px

// example with variables
@base: 5%;
@filler: @base * 2; // result is 10%
@other: @base + @filler; // result is 15%
```

- Use functions: Use built-in functions or create custom functions to manipulate values in your stylesheet.

```LESS
@base: #f04615;
@width: 0.5;

.class {
  width: percentage(@width); // returns `50%`
  color: saturate(@base, 5%);
  background-color: spin(lighten(@base, 25%), 8);
}
```

- Organize your code: Keep your LESS code organized and easy to read by using clear and descriptive names for variables, mixins, and functions.
- Compile to CSS: Make sure to compile your LESS code to CSS before using it in a web page.
- Use comments: Add comments to your LESS code to explain what it does and make it easier for others to understand and maintain.
- Reference : https://lesscss.org/


### Typescript Guidelines

- Use the latest version of TypeScript: Angular supports the latest version of TypeScript, and it is recommended to use the latest version for the best performance and stability.
- Use the Angular CLI: The Angular CLI is a command-line interface for Angular development, and it can help you generate TypeScript code and manage dependencies.
- Use interfaces for type checking: Interfaces can help you enforce type checking in your TypeScript code and catch errors early in the development process.
- Use classes for component logic: Angular uses classes for component logic, and it is recommended to use classes for component logic in your TypeScript code.
- Use type annotations: Type annotations can help you enforce type checking and make your code more readable.
- Use strict null checks: Strict null checks can help you avoid null reference exceptions and ensure that your code is safer and more robust.
- Use a linter: A linter can help you enforce a consistent code style and catch errors early in the development process.
- Write tests for your code: Writing tests for your code can help you catch bugs early and ensure that your code is working as expected.
- Use the Angular API: Angular provides a comprehensive API for building applications, and it is recommended to use the Angular API where possible to take advantage of its features and performance.
- Use third-party libraries: Angular supports a large ecosystem of third-party libraries, and it is recommended to use third-party libraries where possible to reduce the amount of code you need to write.

### Best practices in Angular

- Use the Angular CLI: The Angular CLI is a command-line interface for Angular development, and it can help you generate code, manage dependencies, and automate tasks.
- Use components: Angular is built around the component architecture, and it is recommended to organize your application into components to make it easier to manage and maintain.
- Use reactive programming: Angular supports reactive programming through RxJS, and it is recommended to use reactive programming where possible to simplify your code and make it more efficient.
- Use modular architecture: Angular supports modular architecture, and it is recommended to divide your application into modules to make it easier to manage and maintain.
- Use AOT (Ahead-of-Time) compilation: AOT is a feature of Angular that compiles your application at build time, rather than at runtime. This can improve the performance and speed of your application.
- Use lazy loading: Angular supports lazy loading, and it is recommended to use lazy loading where possible to improve the loading time of your application and reduce its size.
- Use Angular animations: Angular provides a comprehensive animation library, and it is recommended to use Angular animations where possible to make your application more interactive and engaging.
- Use dependency injection: Angular provides a dependency injection framework, and it is recommended to use dependency injection where possible to simplify your code and make it more maintainable.
- Write tests for your code: Writing tests for your code can help you catch bugs early and ensure that your code is working as expected.
- Follow the Angular style guide: Angular provides a style guide that provides guidelines for writing high-quality code, and it is recommended to follow the Angular style guide to ensure that your code is maintainable and easy to understand https://angular.io/guide/styleguide .


## references
- Angular style guide : https://angular.io/guide/styleguide
- Best practices in angular : https://blogs.halodoc.io/angular-best-practices/

CSS:-
- Sass official documentation: https://sass-lang.com/
- Normalize.css: https://necolas.github.io/normalize.css/
- CSS Variables: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables
- BEM methodology: https://en.bem.info/methodology/
- SMACSS official documentation: https://smacss.com/
- Responsive Web Design basics: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design
- Angular Animations official documentation: https://angular.io/guide/animations
- CSS Flexbox: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox
- CSS Specificity: https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity
- CanIUse for checking browser support: https://caniuse.com/

Typescript guidelines

- TypeScript official documentation: https://www.typescriptlang.org/docs/home.html
- Angular official documentation: https://angular.io/docs
- Reactive Forms in Angular: https://angular.io/guide/reactive-forms
- Dependency Injection in Angular: https://angular.io/guide/dependency-injection
- RXJS official documentation: https://rxjs.dev/api
- Angular CLI official documentation: https://cli.angular.io/
- Angular Material official documentation: https://material.angular.io/



