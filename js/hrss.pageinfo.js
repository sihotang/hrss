//
var PageInfo = function () {

	var user = {
		empno: { label: 'Employee No', value: '' },
		empname: { label: 'Employee Name', value: '' },
		grade: { label: 'Grade Name', value: '' },
		workgroup: { label: 'Work Unit', value: '' }
	};

	var period = {
		period: { label: 'Period', value: '' },
		year: { label: 'Year', value: '' }
	};

	var handleInitUser = function () {
		$('[data-init-user]').each(function() {
			var dataInit = $(this).attr('data-init-user');

			if (dataInit == 'empno') {
				user.empno.value = $(this).val();
			} else if (dataInit == 'empname') {
				user.empname.value = $(this).val();
			} else if (dataInit == 'grade') {
				user.grade.value = $(this).val();
			} else if (dataInit == 'workgroup') {
				user.workgroup.value = $(this).val();
			} else {
				return;
			}
		});
	};

	var handleInitPeriod = function () {
		$('[data-init-period]').each(function() {
			var dataInit = $(this).attr('data-init-user');

			if (dataInit == 'period') {
				period.period.value = $(this).val();
			} else if (dataInit == 'year') {
				period.year.value = $(this).val();
			} else {
				return;
			}
		});
	};

	return {
		init: function () {
			handleInitUser();
			handleInitPeriod();
		},

		user: user,

		period: period
	};

}();

jQuery(document).ready(function() {
   PageInfo.init(); 
});