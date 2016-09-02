ace.define("ace/mode/leaf_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
           "use strict";

           var oop = require("../lib/oop");
           var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

           var LeafHighlightRules = function() {

           this.$rules = {
           "start" : [
                      {
                      token : "constant.language",
                      regex : "\\#",
                      next: "tag"
                      }
                      ],
           "tag" : [
                    {
                    token : "constant.language",
                    regex : "\\#",
                    next: "tag"
                    },
                    {
                    token : "constant.language",
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
                               token : "constant.language",
                               regex : "\\)",
                               next : "start"
                               },
                               {
                               defaultToken : "variable.constant"
                               }
                               ]
           };

           this.normalizeRules();
           };

           oop.inherits(LeafHighlightRules, TextHighlightRules);

           exports.LeafHighlightRules = LeafHighlightRules;
           });

ace.define("ace/mode/leaf",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/leaf_highlight_rules","ace/range"], function(require, exports, module) {
           "use strict";

           var oop = require("../lib/oop");
           var TextMode = require("./text").Mode;
           var LeafHighlightRules = require("./leaf_highlight_rules").LeafHighlightRules;
           var Range = require("../range").Range;

           var Mode = function() {
           this.HighlightRules = LeafHighlightRules;
           };
           oop.inherits(Mode, TextMode);

           (function() {

            this.lineCommentStart = "--";

            this.$id = "ace/mode/leaf";
            }).call(Mode.prototype);

           exports.Mode = Mode;

           });
