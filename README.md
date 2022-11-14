# MemLibras - A Digital Memory Game to Learn Brazilian Sign Language (BSL)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.8. It's recommended the use of a [Windows Subsystem for Linux 2.0 (WSL 2.0)](https://learn.microsoft.com/en-us/windows/wsl/install) and [Visual Studio Code](https://code.visualstudio.com/) environment for development purposes. 

## Setup

1. Open **Windows Terminal** and connect to WSL machine. You can also use **Visual Studio Code** with WSL extension to perform the setup.
2. Install the following dependencies:
    - **cURL**: `sudo apt install curl`.
    - **NVM**: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash`.
    - **NodeJS**: `nvm install --lts`.
    - **Angular CLI**: `npm install -g @angular/cli`.
3. Run `git clone https://github.com/herlesonpontes/memlibras.git` to download source code. Access the root folder of the project.
4. Install project modules by running `npm install`.
5. Execute the project by running `ng serve`. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

> If the global Angular version is higher than 10.0.8, some errors will arise. You can overcome then by running `npm install --force`. Also if a *digital envelope routines::initialization error* appear during the execution of the program, run `export NODE_OPTIONS=--openssl-legacy-provider` to bypass the deprecation warning. To run a `git push`, this variable must be unset with `unset NODE_OPTIONS`.