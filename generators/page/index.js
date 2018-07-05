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

  getParams() {
    return {
      name: this.name,
      camelCaseName: _.camelCase(this.name),
      upperCaseName: this.name.toUpperCase().replace(/-/g, '_'),
      capitalizeName: _.upperFirst(_.camelCase(this.name)),
      titleName: _.upperFirst(this.name.replace(/-/g, ' '))
    }
  }

  writing() {
    const params = this.getParams();

    this.fs.copyTpl(
      this.templatePath('page.txt'),
      this.destinationPath(`public/js/containers/${params.capitalizeName}Page/index.js`),
      params
    );

    this.fs.copyTpl(
      this.templatePath('selectors.txt'),
      this.destinationPath(`public/js/containers/${params.capitalizeName}Page/selectors.js`),
      params
    );
  }
};
