/**
 * [Report description]
 */
var Report = function() {
    /**
     * 
     */
    var report;
    /**
     * 
     */
    var reportOptions;
    /**
     * [orientation description]
     * @type {Object}
     */
    var orientation = {
        potrait: 'potrait',
        landscape: 'landscape'
    };
    /**
     * [defaultPage description]
     * @return {[type]} [description]
     */
    var defaultPage = function() {
        return {
            paper: 'A4',
            orientation: orientation.potrait,
            margin: [40, 80, 80, 80]
        };
    };
    /**
     * [defaultHeader description]
     * @return {[type]} [description]
     */
    var defaultHeader = function() {
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
    /**
     * [defaultFooter description]
     * @param  {[type]} page  [description]
     * @param  {[type]} pages [description]
     * @return {[type]}       [description]
     */
    var defaultFooter = function(page, pages) {
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
    /**
     * [defaultStyles description]
     * @return {[type]} [description]
     */
    var defaultStyles = function() {
        return {
            header: {
                fontSize: 18,
                bold: true,
                margin: [0, 50, 0, 10]
            },
            titleTable: {
                fontSize: 16,
                bold: true,
                margin: [0, 10, 0, 5]
            }
        };
    };
    /**
     * [defaultStyle description]
     * @return {[type]} [description]
     */
    var defaultStyle = function() {
        return {};
    };
    /**
     * [defaultTable description]
     * @return {[type]} [description]
     */
    var defaultTable = function() {
        return {
            table: {
                body: [
                    ['Column 1', 'Column 2', 'Column 3'],
                    ['One value goes here', 'Another one here', 'OK?']
                ]
            }
        };
    };
    /**
     * [undefinedTable description]
     * @return {[type]} [description]
     */
    var undefinedTable = function() {
        return {
            table: {
                body: [
                    ['Undefined'],
                    ['Undefined Table']
                ]
            }
        };
    };
    /**
     * [basicReport description]
     * @param  {[type]} content [description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    var basicReport = function(content, options) {
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
    /**
     * [extendOptions description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    var extendOptions = function(options) {
        if (options === 'undefined') options = $.extend({}, reportOptions);
        else options = $.extend(reportOptions, options);
        return options;
    }
    /**
     * [setupContentTable description]
     * @param  {[type]} table [description]
     * @return {[type]}       [description]
     */
    var setupContentTable = function(table) {
        var content = [],
            body = [],
            dtable = {},
            number = {
                name: 'number',
                index: 'number',
                text: 'No.',
                width: 50,
                align: "right"
            },
            autonumber = table.autonumber || false;
        // Check title on table properties
        if (typeof table.title === 'object') {
            content.push({
                text: table.title.text,
                style: table.title.style || 'titleTable'
            });
        } else if (typeof table.title === 'string') content.push(table.title);
        // Check columns on table properties
        if (typeof table.columns === 'undefined') content.push(undefinedTable());
        else {
            var columns = [],
                textColumns = [],
                visibleColumns = [],
                hiddenColumns = [],
                widths = [];
            //Push column & width
            if (table.columns.length > 0) {
                // Binding Header by columns
                columns = table.columns;
                if (autonumber) columns.unshift(number);
                $.each(columns, function(index, column) {
                    if (typeof column.hidden === 'undefined' || column.hidden) {
                        if (typeof column.text === 'undefined') textColumns.push(column.name);
                        else textColumns.push(column.text);
                        visibleColumns.push(column.name);
                        if (typeof column.width === 'undefined') widths.push('auto');
                        else widths.push(column.width);
                    } else hiddenColumns.push(column.name);
                });
                body.push(textColumns);
                // Binding Body by data
                $.each(table.data, function(index, value) {
                    var data = [];
                    if (autonumber) data.push(index + 1);
                    $.each(visibleColumns, function(idx, col) {
                        if (typeof value[col] !== 'undefined') data.push(value[col]);
                    });
                    body.push(data);
                });
            }
            // Set to table
            dtable.widths = widths;
            dtable.body = body;
        }
        // Push content
        content.push({
            style: table.style || 'tableBasic',
            table: dtable
        });
        return content;
    };
    /**
     * 
     */
    return {
        /**
         * [init description]
         * @param  {[type]} options [description]
         * @return {[type]}         [description]
         */
        init: function(options) {
            PageInfo.init();
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
        /**
         * [orientation description]
         * @type {[type]}
         */
        orientation: orientation,
        /**
         * [exportDataToPdf description]
         * @param  {[type]} data    [description]
         * @param  {[type]} options [description]
         * @param  {[type]} layout  [description]
         * @return {[type]}         [description]
         */
        exportDataToPdf: function(data, options, layout) {
            if (typeof layout === 'undefined') return pdfMake.createPdf(basicReport(data, extendOptions(options)));
            else return pdfMake.createPdf(layout);
        },
        /**
         * [exportTableToPdf description]
         * @param  {[type]} table   [description]
         * @param  {[type]} options [description]
         * @param  {[type]} layout  [description]
         * @return {[type]}         [description]
         */
        exportTableToPdf: function(table, options, layout) {
            if (typeof layout === 'undefined') return pdfMake.createPdf(basicReport(setupContentTable(table), extendOptions(options)));
            else return pdfMake.createPdf(layout);
        },
        /**
         * [exportTablesToPdf description]
         * @param  {[type]} tables  [description]
         * @param  {[type]} options [description]
         * @param  {[type]} layout  [description]
         * @return {[type]}         [description]
         */
        exportTablesToPdf: function(tables, options, layout) {
            var content = [];
            if (tables.length > 0) {
                for (i = 0; i < tables.length; i++) {
                    content.push(setupContentTable(tables[i]));
                }
            }
            if (typeof layout === 'undefined') return pdfMake.createPdf(basicReport(content, extendOptions(options)));
            else return pdfMake.createPdf(layout);
        }
    };
}();
/**
 * [description]
 * @param  {[type]} ) {               Report.init();} [description]
 * @return {[type]}   [description]
 */
jQuery(document).ready(function() {
    Report.init();
});