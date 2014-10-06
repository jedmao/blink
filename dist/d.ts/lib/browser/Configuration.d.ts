import ConfigurationOptions = require('../interfaces/ConfigurationOptions');
import Extenders = require('../interfaces/Extenders');
import Overrides = require('../interfaces/Overrides');
declare class Configuration implements ConfigurationOptions {
    constructor(options?: ConfigurationOptions);
    public clone(): Configuration;
    public set(options: ConfigurationOptions): Configuration;
    public raw: ConfigurationOptions;
    public toString(): string;
    /**
    * The location of the config file
    */
    public config : string;
    public quiet : boolean;
    public trace : boolean;
    public force : boolean;
    public boring : boolean;
    public style : string;
    public oneIndent : any;
    public newline : string;
    public quote : string;
    public oneSpace : string;
    public declarationSeparator : string;
    public ruleSeparator : any;
    public block : string;
    public element : string;
    public modifier : string;
    public chrome : number;
    public firefox : number;
    public ie : number;
    public opera : number;
    public safari : number;
    public android : number;
    public firefoxMobile : number;
    public ieMobile : number;
    public operaMobile : number;
    public safariMobile : number;
    public webkitPrefix : boolean;
    public khtmlPrefix : boolean;
    public mozPrefix : boolean;
    public msPrefix : boolean;
    public oPrefix : boolean;
    public extenders : Extenders;
    public overrides : Overrides;
}
export = Configuration;
