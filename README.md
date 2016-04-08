# kicks-app-cli
Install project templates from the command line

## Install
Since kicks-app-cli is still under development and not available via npm, you need to install it manually:

```cli
git clone https://github.com/kicks-app/kicks-app-cli.git ./kicks-app-cli
npm install ./kicks-app-cli
```

## Usage
Enter `kicks-app -h` to see arguments and options

```cli
Usage: kicks-app [options] <src> [<dest>]

Options:

  -h, --help                       output usage information
  -V, --version                    output the version number
  -n, --name [name]                set project name
  -d, --description [description]  set project description
  -f, --force                      force clean install in a non-empty directory

```