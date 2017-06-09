function exportPDF() {
    var table = {
    	title: 'Table',
    	columns: [],
    	data: []
    };

    Report.exportTableToPdf(table).open();
}