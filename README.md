# PriOSS

This project is an angular based web application designed to inform users about their data-downloads that they can obtain from online services under the European Union's General Data Protection Regulation (GDPR). It helps them to retrieve and visualize their data downloads, while preserving their privacy and offers additional information and advice about online privacy and the GDPR.

## Documentation

All documentation and the coding guidelines used in this project can be found in the documentation folder. Documentation outside of code is generally written in markdown format. We recommend starting to get an overview of the project by reading the content of ``documentation/dev-guidelines/Startup and Coding guidelines`` and ``documentation/Project Structure.md``. The ``documentation/dev-guidelines/Commenting-guidelines.md`` file gives an overview of what kind of documentation you can expect inside the code.

## Starting with angular

In ``documentation/dev-guidelines/Startup and Coding guidelines`` are some useful links to start familiarizing oneself with angular and setting up the development environment for this project. In addition to those, https://angular.io/docs provides a very comprehensive set of explanations and guides to familiarize oneself with angular. Understanding the main concepts of angular, especially components, services and routing, is necessary to understand much of the documentation present in this project.

To clone this project, it is recommended to use ``git clone --filter=blob:limit=100m`` to limit the file size that will be downloaded. Some files in this repository are very large, which can result in long cloning times.

Before the project can be run by node, it's recommended to install all dependencies. Execute ``npm install`` (or ``npm i`` for short) and wait for the installation process to complete.

To run this project, you can use the commands listed in the ``package.json`` file. To start the development server, run ``ng serve`` or ``ng serve -o``, which will open the default browser after the initial build.

## Git LFS

We use git large file support to track large binary files, for example images. To enable it you only have to run the command ``git lfs install`` once on your system. 
If you have done so before for a previous project, you shouldn't have to run it again. Everything should work as normal after that.

## Maintenance

The apps frequently update their data download structure so it is recommended to check the updated download regularly and make the necessary changes in the application with respect to that. Also please update the sample data according to the new structures when required.