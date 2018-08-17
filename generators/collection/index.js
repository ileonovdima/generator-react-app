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
    const capitalizeName = _.upperFirst(_.camelCase(this.name));

    return {
      name: this.name,
      camelCaseName: _.camelCase(this.name),
      upperCaseName: this.name.toUpperCase().replace(/-/g, '_'),
      capitalizeName: capitalizeName,
      capitalizeNameSingle: capitalizeName.substring(0, capitalizeName.length - 1),
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
      this.templatePath('types.txt'),
      this.destinationPath(`public/js/types/State/${params.capitalizeName}.js`),
      params
    );
  }
};
