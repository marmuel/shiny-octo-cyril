$(document).ready(function() {
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
   // add currency to labels
    SetCurrency();
});

// add row
$("#button-rowadd").click(function() {
	var newRow = "<tr>" + "<td class='dragHandle'></td>" + "<td><textarea type='text' data-key='description' class='table-inputs product' data-i18n='table.product'></textarea></td>" + "<td><input data-key='quantity' class='table-inputs' type='number' value='1'></td>" + "<td><input data-key='netprice' class='table-inputs' autocomplete='off' value='0'></td>" + "<td><input data-key='tax1' class='table-inputs' autocomplete='off' value='0%'></td>" + "<td><input disabled='disabled' data-key='grossprice' class='table-inputs' autocomplete='off' value='0'></td>" + "<td class='table-controls'><button class='btn btn-danger glyphicon glyphicon-trash remove-row' href='#'></button></td>" + "</tr>";
	$('#document-table tr:last').after(newRow);
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

		tr.css("background-color", "#d9534f");

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

// add currency to labels
function SetCurrency() {
   var cur = $('#currency').val();
   $('textarea.currency-label').val(cur); 

}
// add second tax  
function addTaxColumn (){  
$('#document-table').find('tr').each(function(){
        $(this).find('td').eq(3).after('<td>new cell added</td>');
   });
}