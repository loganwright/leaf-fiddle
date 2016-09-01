ace.define("ace/mode/sql_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
           "use strict";

           var oop = require("../lib/oop");
           var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

           var SqlHighlightRules = function() {

           var keywords = (
                           "select|insert|update|delete|from|where|and|or|group|by|order|limit|offset|having|as|case|" +
                           "when|else|end|type|left|right|join|on|outer|desc|asc|union|create|table|primary|key|if|" +
                           "foreign|not|references|default|null|inner|cross|natural|database|drop|grant"
                           );

           var builtinConstants = (
                                   "true|false"
                                   );

           var builtinFunctions = (
                                   "avg|count|first|last|max|min|sum|ucase|lcase|mid|len|round|rank|now|format|" +
                                   "coalesce|ifnull|isnull|nvl"
                                   );

           var dataTypes = (
                            "int|numeric|decimal|date|varchar|char|bigint|float|double|bit|binary|text|set|timestamp|" +
                            "money|real|number|integer"
                            );

           var keywordMapper = this.createKeywordMapper({
                                                        "support.function": builtinFunctions,
                                                        "keyword": keywords,
                                                        "constant.language": builtinConstants,
                                                        "storage.type": dataTypes
                                                        }, "identifier", true);

           this.$rules = {
           "start" : [
                      {
                      token : "keyword.operator",
                      regex : "\\#",
                      next: "tag"
                      }
                      ],
           "tag" : [
                    {
                    token : "keyword.operator",
                    regex : "\\(",
                    next : "parameter-list"

                    },
                    {
                    defaultToken : "keyword"

                    }
                    ],
           "parameter-list" : [
                               {
                               token : "string",
                               regex: /"(?:[^#\\]|\\.)*"/
                               },
                               {
                               token : "text",
                               regex : "\\,"
                               },
                               {
                               token : "keyword.operator",
                               regex : "\\)",
                               next : "start"
                               },
                               {
                               defaultToken : "keyword.variable"

                               }
                               ]
           };

           this.normalizeRules();
           };
           
           oop.inherits(SqlHighlightRules, TextHighlightRules);
           
           exports.SqlHighlightRules = SqlHighlightRules;
           });

ace.define("ace/mode/sql",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/sql_highlight_rules","ace/range"], function(require, exports, module) {
           "use strict";
           
           var oop = require("../lib/oop");
           var TextMode = require("./text").Mode;
           var SqlHighlightRules = require("./sql_highlight_rules").SqlHighlightRules;
           var Range = require("../range").Range;
           
           var Mode = function() {
           this.HighlightRules = SqlHighlightRules;
           };
           oop.inherits(Mode, TextMode);
           
           (function() {
            
            this.lineCommentStart = "--";
            
            this.$id = "ace/mode/sql";
            }).call(Mode.prototype);
           
           exports.Mode = Mode;
           
           });
