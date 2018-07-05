'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('lodash');


module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.name = args[0];
  }

  prompting() {
    const prompts = [
      {
        type: 'confirm',
        name: 'isSmartComponent',
        message: 'create smart component ?',
        default: false
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  getParams() {
    const name = this.name || 'test';
    return {
      name: name,
      camelCaseName: _.camelCase(name),
      upperCaseName: name.toUpperCase().replace(/-/g, '_'),
      capitalizeName: _.upperFirst(_.camelCase(this.name)),
    }
  }

  writing() {
    const params = this.getParams();

    if (this.props.isSmartComponent) {
      this.fs.copyTpl(
        this.templatePath('smart.txt'),
        this.destinationPath(`public/js/components/${params.capitalizeName}/index.js`),
        params
      );
    } else {
      this.fs.copyTpl(
        this.templatePath('dumb.txt'),
        this.destinationPath(`public/js/components/${params.capitalizeName}/index.js`),
        params
      );
    }

    this.fs.copyTpl(
      this.templatePath('styles.txt'),
      this.destinationPath(`public/js/components/${params.capitalizeName}/styles.css`),
      params
    );



  }
};
