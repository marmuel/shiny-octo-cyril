$(document).ready(function() {
	// empty all inputs of tbody

	$("#document-table> tbody").not(':first').empty();

	// trigger default values
	$('#shippingno').trigger('click');
	$('#searchno').trigger('click');
	$('.tax-subtotal').hide();
	$("#tax").trigger("change");
	$("#currency").trigger("change");
	$("#discount").trigger("change");

	// add class for styling
	$("#document-table").tableDnD({
		onDragClass : "myDragClass"
		//dragHandle: ".dragHandle"
	});
	// add class for hover move icon
	$('table tr:not(".nodrag")').hover(function() {
		$(this.cells[0]).addClass('showDragHandle');
	}, function() {
		$(this.cells[0]).removeClass('showDragHandle');
	});

	// set all textareas to autosize
	$('textarea').autosize();

	// destroy autosize for different inputs
	$('#document-tocompany').trigger('autosize.destroy');
	$('#document-type').trigger('autosize.destroy');
	//$('.document-inputs-googlesearch').trigger('autosize.destroy');

});

// add row
$("#button-rowadd").click(function() {

	var row = $("#document-table tbody>tr:last").clone(true);
	$("td input:text", row).val(0);
	$(".quantity", row).val(1);
	$(".tax1-row", row).val('');
	$(".tax2-row", row).val('');

	$(row.insertAfter('#document-table tbody>tr:last')).fadeIn();

	// configuration table tablednd
	$("#document-table").tableDnD();
	// add class for styling
	$("#document-table").tableDnD({
		onDragClass : "myDragClass"
	});
	// translate product in description
	$(".product").i18n();
	// add class for hover move icon
	$('table tr:not(".nodrag")').hover(function() {
		$(this.cells[0]).addClass('showDragHandle');
	}, function() {
		$(this.cells[0]).removeClass('showDragHandle');
	});

});

// remove-row
$("#document-table").on("click", ".remove-row", function(event) {
	var tr = $(this).closest('tr');

	if (tr.is('tr:only-child')) {
		return false;
	} else {

		//tr.css("background-color", "#d9534f");

		tr.fadeOut(400, function() {

			tr.remove();

		});
	};
	return false;
	//}
});
$("#document-table").on('click', ".remove-row", function() {
	$("#document-table").closest('tr').remove();
});

// Discount or not?
$("#discount").change(function() {
	var dissettings = $("#discount").val();
	var drow = $(".discount-row").parents('tr');
	if (dissettings == "") {
		// no discount
		$(drow).fadeOut();
		$(".discount-total").val(0);
	}
	if (dissettings != "") {
		// discount
		$(drow).fadeIn();
		$(drow).i18n();
		// add currency to labels
		$("#currency").trigger("change");
	}
});

// Shipping or not?
var $delbtnyes = $('#shippingyes');
var $delbtnno = $('#shippingno');
var srow = $(".shipping-row").parents('tr');

$delbtnyes.on('click', function() {
	// shipping costs
	(srow).fadeIn();
});
$delbtnno.on('click', function() {
	// no shipping costs
	$(srow).fadeOut();
	$(".shipping-total").val(0);
});
var $taxes = $('.taxes');
$taxes.on('change', function() {

   $('.tax-subtotal').show();
   return false;
   
	$($taxes).each(function() {
		if ($(this).val().length == 0) {
			return;
		};
		if ($(this).val().length !== 0) {
			// add new taxrow
			$trLast = $('#document-table').find("tr.taxrow:last");

			$trNew = $trLast.clone();
			$trLast.after($trNew);
			$("#currency").trigger("change");

		};
	});
});

// add dynamically rows for taxes 
$('#tax').change(function() {
	var taxessettings = $("#tax option:selected").index();
	var $tax1 = $('#document-table').find('tbody tr').find('td:nth-child(5)'), $tax1th = $('#document-table').find('thead th:nth-child(5)'),
	$tax2 = $('#document-table').find('tbody tr').find('td:nth-child(6)'), $tax2th = $('#document-table').find('thead th:nth-child(6)'),
	$v = $(this).val();

	if ($v == 'tax-none') {
		$tax1.fadeOut();
		$tax1th.fadeOut();
		$tax2.fadeOut();
		$tax2th.fadeOut();
		$('.footer-labels').attr('colspan',1);
	}

	if ($v == '1 Tax') {
		$tax1.fadeIn();
		$tax1th.fadeIn();
		$tax2.fadeOut();
		$tax2th.fadeOut();
		$('td.footer-labels').attr('colspan',2);
	}
	if ($v == '2 Taxes') {
		$tax1.fadeIn();
		$tax1th.fadeIn();
		$tax2.fadeIn();
		$tax2th.fadeIn();
		$('td.footer-labels').attr('colspan',3);
	}

});

// disable 'taxes 2' for e.g. German Market

$('#currency').change(function() {
	var str = "";
	var taxsettings = $("#tax option:selected").index();
	var currencysettings = $("#currency option:selected").text();
	if (currencysettings == ' EUR Euro') {
		//$('#tax').attr('disabled','disabled');
		$("#tax option[value='2 Taxes']").attr('disabled', 'disabled');

	} else {
		$("#tax option[value='2 Taxes']").removeAttr('disabled');
	}

	// add currency to labels

	var cur = $('#currency').val();
	$('.currency-label').val(cur);
	$('.discount-row-label').val(cur);
});

// autocomplete feature
// of the Google Places API to help users fill in the information.

// Use Google Search or not
var $gbtnyes = $('#searchyes');
var $gbtnno = $('#searchno');
var gbtnsearchagain = $('.address-controls');
var locationfield = $('#locationField');
var gaddressResult = $('#addressresult');
var manaddress = $("#document-to");

$gbtnyes.on('click', function() {
	// google address search
	(manaddress).hide();
	(gbtnsearchagain).hide();
	$('#autocomplete').val('');
	(locationfield).show();
	(gaddressResult).hide();

});
$gbtnno.on('click', function() {
	// no google address search
	(manaddress).show();
	(locationfield).hide();
	(gaddressResult).hide();
});

// Search Again
var $gSearchAgain = $('#search-again');
$gSearchAgain.on('click', function() {
	// google address search
	(manaddress).hide();
	(gbtnsearchagain).hide();
	$('#autocomplete').val('');
	(locationfield).show();
	(gaddressResult).hide();
});

// Accept Search
var $gSearchAccept = $('#search-accept');
$gSearchAccept.on('click', function() {

	(manaddress).show();
	(gbtnsearchagain).hide();
	$('#autocomplete').val('');
	(gaddressResult).hide();

	Country();
});

// Autocomplete

var placeSearch, autocomplete;
var componentForm = {
	street_number : 'short_name',
	route : 'long_name',
	locality : 'long_name',
	administrative_area_level_1 : 'short_name',
	country : 'long_name',
	postal_code : 'short_name'
};

function initialize() {
	// Create the autocomplete object, restricting the search
	// to geographical location types.
	autocomplete = new google.maps.places.Autocomplete(
	/** @type {HTMLInputElement} */(document.getElementById('autocomplete')), {
		types : ['geocode']
	});
	// When the user selects an address from the dropdown,
	// populate the address fields in the form.
	google.maps.event.addListener(autocomplete, 'place_changed', function() {
		fillInAddress();
	});
}

function fillInAddress() {
	var gaddressResult = $('#addressresult');
	var locationfield = $('#locationField');
	var gbtnsearchagain = $('.address-controls');

	(locationfield).fadeOut();
	(gaddressResult).fadeIn();
	(gbtnsearchagain).fadeIn();
	// Get the place details from the autocomplete object.
	var place = autocomplete.getPlace();
	for (var component in componentForm) {
		document.getElementById(component).value = '';
		document.getElementById(component).disabled = false;
	}

	// Get each component of the address from the place details
	// and fill the corresponding field on the form.
	for (var i = 0; i < place.address_components.length; i++) {
		var addressType = place.address_components[i].types[0];
		if (componentForm[addressType]) {
			var val = place.address_components[i][componentForm[addressType]];
			document.getElementById(addressType).value = val;
		}
	}
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var geolocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			autocomplete.setBounds(new google.maps.LatLngBounds(geolocation, geolocation));
		});
	}
}



