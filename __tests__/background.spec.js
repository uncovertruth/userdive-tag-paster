"use strict";
exports.__esModule = true;
/* @flow */
var sinon_chrome_1 = require("sinon-chrome");
var mock_local_storage_1 = require("mock-local-storage");
var faker_1 = require("faker");
var jest_1 = require("jest");
jest_1.describe('background', function () {
    var bg;
    jest_1.beforeEach(function () {
        global.localStorage = mock_local_storage_1["default"];
        global.chrome = sinon_chrome_1["default"];
        var BG = require('../app/actions/background')["default"];
        bg = new BG();
    });
    jest_1.test('defined', function () {
        jest_1.expect(bg).toBeDefined();
    });
    jest_1.test('get / set', function () {
        var key = faker_1.random.alphaNumeric();
        var value = faker_1.random.alphaNumeric();
        jest_1.expect(bg.get(key)).toBe('');
        jest_1.expect(bg.set(key, value)).toBe(undefined);
        jest_1.expect(bg.get(key)).toBe(value);
    });
    jest_1.test('toggle', function () {
        jest_1.expect(bg.toggle()).toBe('active');
        jest_1.expect(bg.toggle()).toBe('');
    });
    jest_1.test('badge', function () {
        jest_1.expect(bg.updateBadge(faker_1.random.word()));
        jest_1.expect(bg.updateBadge(faker_1.random.number()));
    });
});
