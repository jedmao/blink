var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var _Block = require('./Block');
var _Compiler = require('./Compiler');
var _Element = require('./Element');

var _MediaAtRule = require('./MediaAtRule');
var _Modifier = require('./Modifier');
var _Rule = require('./Rule');
var Configuration = require('./Configuration');

var Blink;
(function (Blink) {
    Blink.config = new Configuration();

    function compile(options, sources, callback) {
        var tempConfig = Blink.config.clone().set(options);
        var compiler = new Compiler(tempConfig);
        compiler.compile(sources, function (err, file) {
            callback(err, tempConfig, file);
        });
    }
    Blink.compile = compile;

    function compileStream(options, stream, callback) {
        var tempConfig = Blink.config.clone().set(options);
        var compiler = new Compiler(tempConfig);
        compiler.compileStream(stream, function (err, file) {
            callback(err, tempConfig, file);
        });
    }
    Blink.compileStream = compileStream;

    function compileContents(options, file, callback) {
        var tempConfig = Blink.config.clone().set(options);
        var compiler = new Compiler(tempConfig);
        compiler.tryCompileContents(file, function (err, compiled) {
            callback(err, tempConfig, compiled);
        });
    }
    Blink.compileContents = compileContents;

    var Compiler = (function (_super) {
        __extends(Compiler, _super);
        function Compiler() {
            _super.apply(this, arguments);
        }
        return Compiler;
    })(_Compiler);
    Blink.Compiler = Compiler;
    var Rule = (function (_super) {
        __extends(Rule, _super);
        function Rule() {
            _super.apply(this, arguments);
        }
        return Rule;
    })(_Rule);
    Blink.Rule = Rule;
    var Block = (function (_super) {
        __extends(Block, _super);
        function Block() {
            _super.apply(this, arguments);
        }
        return Block;
    })(_Block);
    Blink.Block = Block;
    var Element = (function (_super) {
        __extends(Element, _super);
        function Element() {
            _super.apply(this, arguments);
        }
        return Element;
    })(_Element);
    Blink.Element = Element;
    var MediaAtRule = (function (_super) {
        __extends(MediaAtRule, _super);
        function MediaAtRule() {
            _super.apply(this, arguments);
        }
        return MediaAtRule;
    })(_MediaAtRule);
    Blink.MediaAtRule = MediaAtRule;
    var Modifier = (function (_super) {
        __extends(Modifier, _super);
        function Modifier() {
            _super.apply(this, arguments);
        }
        return Modifier;
    })(_Modifier);
    Blink.Modifier = Modifier;
})(Blink || (Blink = {}));

module.exports = Blink;
