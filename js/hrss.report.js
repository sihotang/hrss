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
     * [isPageNumber description]
     * @type {Boolean}
     */
    var isPageNumber = true;
    /**
     * [issetUserInfo description]
     * @type {Boolean}
     */
    var issetUserInfo = true;
    /**
     * [issetPeriodInfo description]
     * @type {Boolean}
     */
    var issetPeriodInfo = true;
    /**
     * [content description]
     * @type {Array}
     */
    var reportContent = [];
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
            margin: [72, 150]
        };
    };
    /**
     * [defaultHeader description]
     * @return {[type]} [description]
     */
    var defaultHeader = function() {
        // return {
        //     table: {
        //         widths: [100, 'auto'],
        //         body: [
        //             ['', ''],
        //             [{
        //                 image: 'sampleImage.jpg',
        //                 width: 100
        //             }, {
        //                 stack: ['Report Title', {
        //                     text: 'This is a subtitle',
        //                     style: 'subtitle'
        //                 }],
        //                 style: 'title'
        //             }]
        //         ]
        //     },
        //     layout: 'noBorders',
        //     margin: [40, 20, 10, 10]
        // };
        return {
            margin: [40, 10, 10, 10],
            columns: [{
                image: 'sampleImage.jpg',
                width: 100
            }, defaultTitle()]
        };
    };
    /**
     * [defaultTitle description]
     * @return {[type]} [description]
     */
    var defaultTitle = function() {
        return {
            stack: [reportOptions.title || 'Report Title', defaultSubTitle()],
            style: 'title'
        }
    }
    /**
     * [defaultSubTitle description]
     * @return {[type]} [description]
     */
    var defaultSubTitle = function() {
        if (!issetPeriodInfo) return defineHeaderPeriodInfo();
        return {
            text: reportOptions.subtitle || '',
            style: 'subtitle'
        };
    }
    /**
     * [defaultContent description]
     * @return {[type]} [description]
     */
    var defaultContent = function() {
        if (!issetUserInfo) return reportContent;
        reportContent.push(defineContentUserInfo());
        return reportContent;
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
            title: {
                fontSize: 18,
                bold: true,
            },
            subtitle: {
                fontSize: 14,
                bold: true,
            },
            header: {
                fontSize: 12,
                bold: true,
                margin: [0, 80, 0, 10]
            },
            titleTable: {
                fontSize: 12,
                bold: true,
                margin: [0, 10, 0, 5]
            },
            tableBasic: {
                margin: [0, 5, 0, 15]
            }
        };
    };
    /**
     * [defaultStyle description]
     * @return {[type]} [description]
     */
    var defaultStyle = function() {
        return {
            fontSize: 10
        };
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
     * [defineUserInit description]
     * @return {[type]} [description]
     */
    var defineHeaderPeriodInfo = function() {
        PageInfo.init();
        return {
            columns: [{
                text: PageInfo.period.period.label
            }, {
                text: ':'
            }, {
                text: PageInfo.period.period.value
            }, {
                text: '/'
            }, {
                text: PageInfo.period.year.label
            }, {
                text: ':'
            }, {
                text: PageInfo.period.year.value
            }],
            style: 'subtitle'
        };
    };
    /**
     * [defineUserInit description]
     * @return {[type]} [description]
     */
    var defineContentUserInfo = function() {
        PageInfo.init();
        return {
            style: 'header',
            stack: [{
                columns: [{
                    width: 150,
                    text: PageInfo.user.empno.label + ' / ' + PageInfo.user.empname.label
                }, {
                    width: 'auto',
                    text: ':'
                }, {
                    width: '*',
                    text: PageInfo.user.empno.value + ' / ' + PageInfo.user.empname.value
                }]
            }, {
                columns: [{
                    width: 150,
                    text: PageInfo.user.grade.label
                }, {
                    width: 'auto',
                    text: ':'
                }, {
                    width: '*',
                    text: PageInfo.user.grade.value
                }]
            }, {
                columns: [{
                    width: 150,
                    text: PageInfo.user.workgroup.label
                }, {
                    width: 'auto',
                    text: ':'
                }, {
                    width: '*',
                    text: PageInfo.user.workgroup.value
                }]
            }]
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
            header: options.header,
            content: content,
            footer: options.footer,
            styles: options.styles,
            pageSize: options.page.paper,
            pageOrientation: options.page.orientation,
            pageMargins: options.page.margin,
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
                width: 30,
                align: "right"
            },
            autonumber = table.autonumber || false;
        // Check title on table properties
        if (typeof table.title === 'object') {
            content.push({
                text: table.title.text,
                style: table.title.style || 'titleTable'
            });
        } else if (typeof table.title === 'string') {
            content.push({
                text: table.title,
                style: 'titleTable'
            });
        }
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
                        else textColumns.push({
                            text: column.text,
                            alignment: (typeof column.align !== 'undefined') ? column.align : 'center'
                        });
                        visibleColumns.push(column.name);
                        if (typeof column.width === 'undefined') widths.push('auto');
                        else widths.push(column.width);
                    } else hiddenColumns.push(column.name);
                });
                body.push(textColumns);
                // Binding Body by data
                $.each(table.data, function(index, value) {
                    var data = [];
                    if (autonumber) data.push({
                        text: index + 1,
                        alignment: 'right'
                    });
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
            table: dtable,
            layout: 'lightHorizontalLines'
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
            content = defaultContent(),
                options = $.extend(options, {
                    page: defaultPage(),
                    header: defaultHeader,
                    footer: defaultFooter,
                    content: content,
                    styles: defaultStyles(),
                    defaultStyle: defaultStyle(),
                    pageNumber: isPageNumber,
                    userInfo: issetUserInfo,
                    periodInfo: issetPeriodInfo
                });
            report = this;
            reportContent = content;
            reportOptions = options;
        },
        /**
         * [orientation description]
         * @type {[type]}
         */
        orientation: orientation,
        /**
         * [isPageNumber description]
         * @return {Boolean} [description]
         */
        isPageNumber: function() {
            return isPageNumber;
        },
        /**
         * [issetUserInfo description]
         * @return {[type]} [description]
         */
        issetUserInfo: function() {
            return issetUserInfo;
        },
        /**
         * [issetPeriodInfo description]
         * @return {[type]} [description]
         */
        issetPeriodInfo: function() {
            return issetPeriodInfo;
        },
        /**
         * [exportDataToPdf description]
         * @param  {[type]} data    [description]
         * @param  {[type]} options [description]
         * @param  {[type]} layout  [description]
         * @return {[type]}         [description]
         */
        exportDataToPdf: function(data, options, layout) {
            reportContent.push(data);
            if (typeof layout === 'undefined') return pdfMake.createPdf(basicReport(reportContent, extendOptions(options)));
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
            reportContent.push(setupContentTable(table));
            if (typeof layout === 'undefined') return pdfMake.createPdf(basicReport(reportContent, extendOptions(options)));
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
            if (tables.length > 0) {
                for (i = 0; i < tables.length; i++) {
                    reportContent.push(setupContentTable(tables[i]));
                }
            }
            if (typeof layout === 'undefined') return pdfMake.createPdf(basicReport(reportContent, extendOptions(options)));
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