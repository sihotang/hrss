function exportPDF() {
    var tables = [{
        columns: [],
        data: [],
    }, {
        columns: [],
        data: []
    }];

    Report.exportTablesToPdf(tables).open();
}