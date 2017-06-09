
var PageInfo = function () {

	var user = {
		empno: { label: 'Employee No', value: '' },
		empname: { label: 'Employee Nam', value: '' }
	};

	var period = {
		period: { label: 'Period', value: '' },
		year: { label: 'Year', value: '' }
	};

	var handleInitUser = function () {
		$('[data-init-user]').each(function() {
			var userInit = $(this).attr('data-init-user');

			if (userInit == 'empno') {
				user.empno.value = $(this).val();
			} else if (userInit == 'empname') {
				user.empname.value = $(this).val();
			} else {
				return;
			}
		});
	};

	var handleInitPeriod = function () {
		$('[data-init-period]').each(function() {
			var periodInit = $(this).attr('data-init-user');

			if (periodInit == 'period') {
				period.period.value = $(this).val();
			} else if (periodInit == 'year') {
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