'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  prompting() {
    const licenses = [
      {name: 'MIT', value: 'MIT'},
      {name: 'Unlicense', value: 'unlicense'}
    ];
    const transpilers = [
      {name: 'buble', value: 'buble'},
      {name: 'babel', value: 'babel'}
    ]
    const prompts = [
      {
        type: 'input',
        name: 'moduleName',
        message: 'What is your module name?',
        default: 'rollup-module'
      },
      {
        type: 'input',
        name: 'moduleDescription',
        message: 'What is your module description?',
        default: 'My rollup module'
      },
      {
        type: 'input',
        name: 'authorGithub',
        message: 'What is your github username?',
        store: true
      },
      {
        type: 'input',
        name: 'authorWebsite',
        message: 'What is the URL of your website?',
        store: true
      },
      {
        type: 'input',
        name: 'authorEmail',
        message: 'What is your email address?',
        store: true
      },
      {
        type: 'list',
        name: 'transpiler',
        message: 'Which transpiler used in your module?',
        default: transpilers[0],
        choices: transpilers
      }
    ];

    return this.prompt(prompts).then(props => {
      transpilers.forEach(t => {
        props[t.name] = props.transpiler === t.name
      })
      this.props = props;
    });
  }

  default() {
    mkdirp(this.props.moduleName);
    this.destinationRoot(this.destinationPath(this.props.moduleName));
    this.composeWith(require.resolve('generator-license/app'), {
      name: this.props.authorGithub,
      email: this.props.authorEmail,
      website: this.props.authorWebsite
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath(),
      this.destinationPath(),
      this.props
    );
  }

  git() {
    this.spawnCommandSync('git', [ 'init' ]);
  }
  
  install() {
    this.installDependencies({ bower: false });
  }
};
