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
    };
  }

  writing() {
    const params = this.getParams();

    this.fs.copyTpl(
      this.templatePath('action.txt'),
      this.destinationPath(`public/js/actions/${this.name}.js`),
      params
    );

    this.fs.copyTpl(
      this.templatePath('reducer.txt'),
      this.destinationPath(`public/js/reducers/${this.name}.js`),
      params
    );

    this.fs.copyTpl(
      this.templatePath('constant.txt'),
      this.destinationPath(`public/js/constants/${this.name}.js`),
      params
    );

    this.fs.copyTpl(
      this.templatePath('type.txt'),
      this.destinationPath(`public/js/types/${params.capitalizeName}.js`),
      params
    );
  }
};
