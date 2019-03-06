var Log = function (DEBUG_JS, useConsole, printToPage, logStyling) {
    this.DEBUG_JS = DEBUG_JS;
    this.useConsole = useConsole;
    this.printToPage = printToPage;

    this.logStyling = {
        outputSwitch: "position:fixed;z-index:9999;top:0;right:0;" +
        "width:10%;height:2rem;opacity:.3;cursor:pointer;",
        output: "position:fixed;z-index:9998;top:0;left:0;margin:0;" +
        "background-color:white;width:100%;display:none;",
        clearButton: "font-size:1rem"
    };

    if (logStyling !== null && logStyling !== undefined) {
        this.logStyling = logStyling;
    }

    this.pageOutput = false;
};

Log.prototype.initPageOutput = function () {
    var outputSwitch = jQuery('<button id="log-output-switch" style="' + this.logStyling.outputSwitch + '"></button>');
    jQuery('body').prepend(outputSwitch);

    var outputContainer = jQuery('<pre id="log-output-container" style="' + this.logStyling.output + '">' +
        '<button id="clear-log" style="' + this.logStyling.clearButton + '">Clear</button>' +
        '<div id="log-output" ></div>' +  '</pre>');
    jQuery('body').prepend(outputContainer);

    jQuery("#log-output-switch").click(function () {
        jQuery("#log-output-container").finish().fadeToggle();
    });

    jQuery("#clear-log").click(function () {
        jQuery("#log-output").html('');
    });

    this.pageOutput = jQuery("#log-output");
};

Log.prototype.single = function (input) {
    if (this.DEBUG_JS) {
        if (this.useConsole) {
            console.log(input);
        }

        if (this.printToPage) {
            if (!this.pageOutput) {
                this.initPageOutput();
            }

            var output = (typeof input === 'object') ? JSON.stringify(input, null, 2): input;

            this.pageOutput.append( output + "\n" + '<hr>');
        }
    }
};


Log.prototype.scope = function (input) {
    var $this = this;
    if (this.DEBUG_JS) {
        if (this.useConsole) {
            input.forEach(function (element) {
                $this.single(element);
            });
        }
    }
};