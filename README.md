# kicks-app
Install project templates from the command line

KicksApp's command line tool lets you download a project template to a local folder and automatically replace project title and other individual data in common places like package.json   

## Install

For the command line tool to work, you need [nodejs](https://nodejs.org) installed on your machine.

KicksApp CLI is still under development and not available via npm, so you need to clone this repository and install it manually from the source directory.

```cli
npm i . -g
```

## Usage

Enter `kicks-app -h` to see a list of arguments and options

```cli
Usage: kicks-app [options] <src> [<dest>]

Options:

  -h, --help                       output usage information
  -V, --version                    output the version number
  -n, --name [name]                set project name
  -d, --description [description]  set project description

```

Download an application template by kicks-app to the current working directory

```
kicks-app wordpress -t 'my-project' -d 'My Project'
```

Download a repository to a local folder

```cli
kicks-app https://github.com/kicks-app/kicks-app-wordpress.git my-project -d 'My Project'
```

Note that the destination directory should either not exist or be empty. To do it anyway, you can use the `--force`-option.