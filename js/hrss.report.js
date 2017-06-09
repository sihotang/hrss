//
var Report = function () {
    
    var reportOptions;
    
    var report;

    var orientation = { potrait: 'potrait', landscape: 'landscape' };

    var defaultPage = function () {
        return {
            paper: 'A4',
            orientation: orientation.potrait,
            margin: [40, 80, 80, 80]
        };
    };
    
    var defaultHeader = function () {
        return {
	        margin: [40, 20, 20, 10],
	        columns: [{
	            image: 'sampleImage.jpg',
	            width: 100
	        }, {
	            stack: ['Report Title', {
	                text: 'This is a subtitle',
	                style: 'subtitle'
	            }, ],
	            style: 'title'
	        }]
	    };
    };
    
    var defaultFooter = function (page, pages) {
        return {
            columns: [{
                alignment: 'left',
                text: [{
                    text: page.toString(),
                    italics: true
                }, ' of ', {
                    text: pages.toString(),
                    italics: true
                }]
            }],
            margin: [40, 0]
        };
    };

    var defaultStyles = function () {
    	return {
    		header: {
	            fontSize: 18,
	            bold: true,
	            margin: [0, 50, 0, 10]
        	}
    	};
    };

    var defaultStyle = function () {
    	return {

    	};
    };

    var basicReport = function (content, options) {
        return {
            pageSize: options.page.paper,
            pageOrientation: options.page.orientation,
            pageMargins: options.page.margin,
            header: options.header,
            footer: options.footer,
            content: content,
            styles: options.styles,
            defaultStyle: options.defaultStyle
        };
    };

    var extendOptions = function (options) {
    	if (options === 'undefined') {
    		options = $.extend({}, reportOptions);
    	} else {
    		options = $.extend({}, reportOptions, options);
    	}

    	console.log(options);

    	return options;
    }

    var setupContentTable = function (columns, data) {};

    return {
        init: function (options) {
			options = $.extend(options, {
                page: defaultPage(),
                header: defaultHeader(),
                footer: defaultFooter,
                styles: defaultStyles(),
                defaultStyle: defaultStyle()
            });

        	report = this;

            reportOptions = options;
        },

        orientation: orientation,

        exportDataToPdf: function(data, options, layout) {
			if (typeof layout === 'undefined') return pdfMake.createPdf(layout);
            else return pdfMake.createPdf(basicReport(data, extendOptions(options)));
        },

        exportTableToPdf: function(table, options, layout) {
            content.push(setupContentTable(tables.columns, tables.data));

            if (typeof layout === 'undefined') return pdfMake.createPdf(layout);
            else return pdfMake.createPdf(basicReport(content, extendOptions(options)));
        },

        exportTablesToPdf: function(tables, options, layout) {
        	content = [];

            // if (tables.length > 0) {
            //     for (i = 0; i < tables.length; i++) {
            //         content.push(setupContentTable(tables[i].columns, tables[i].data));
            //     }
            // }
            
            if (typeof layout === 'undefined') return pdfMake.createPdf(basicReport(content, extendOptions(options)));
            else pdfMake.createPdf(layout);
        }
    };
}();

jQuery(document).ready(function() {
   Report.init(); 
});