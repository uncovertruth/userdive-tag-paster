"use strict";
exports.__esModule = true;
/* @flow */
var faker_1 = require("faker");
var injector_1 = require("../app/injector");
var jest_1 = require("jest");
jest_1.describe('injector', function () {
    var elementId = faker_1.random.uuid();
    jest_1.test('vaild id', function () {
        var config = {
            id: faker_1.random.alphaNumeric(10),
            host: faker_1.random.alphaNumeric(15),
            ignore: faker_1.random.alphaNumeric(15)
        };
        injector_1.inject(elementId, faker_1.random.uuid(), config);
        jest_1.expect(document.getElementById(elementId));
    });
    jest_1.test('ignore domain', function () {
        var config = {
            id: faker_1.random.alphaNumeric(10),
            host: faker_1.random.alphaNumeric(15),
            ignore: 'about:blank'
        };
        injector_1.inject(elementId, faker_1.random.uuid(), config);
        jest_1.expect(document.getElementById(elementId));
    });
});
