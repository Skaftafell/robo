"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("../lodash.custom");
const cli_options_1 = require("../cli/cli-options");
/**
 * @param {BrowserSync} browserSync
 * @param {String} [name] - instance name
 * @param {Object} pjson
 * @returns {Function}
 */
module.exports = function (browserSync, name, pjson) {
    return function () {
        /**
         * Handle new + old signatures for init.
         */
        var args = require("../args")(_.toArray(arguments));
        /**
         * If the current instance is already running, just return an error
         */
        if (browserSync.active) {
            return args.cb(new Error(`Instance: ${name} is already running!`));
        }
        // Env specific items
        args.config.version = pjson.version;
        args.config.cwd = args.config.cwd || process.cwd();
        const [opts, errors] = (0, cli_options_1.merge)(args.config);
        if (errors.length) {
            return args.cb(new Error((0, cli_options_1.printErrors)(errors)));
        }
        return browserSync.init(opts, args.cb);
    };
};
//# sourceMappingURL=init.js.map