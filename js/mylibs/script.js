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
   // set all textareas to autosize
    $('textarea').autosize();   
});

// add row
$("#button-rowadd").click(function() {
	var newRow = "<tr>" + "<td class='dragHandle'></td>" + "<td><textarea type='text' data-key='description' class='table-inputs product' data-i18n='table.product'></textarea></td>" + "<td><input data-key='quantity' class='table-inputs' type='number' value='1'></td>" + "<td><input data-key='netprice' class='table-inputs' autocomplete='off' value='0'></td>" + "<td  class='tax1-column'><input data-key='tax1' class='table-inputs tax1-row' autocomplete='off' value='0%'></td>" + "<td  class='tax2-column'><input data-key='tax2' class='table-inputs tax2-row' autocomplete='off' value='0%'></td>" + "<td><input disabled='disabled' data-key='grossprice' class='table-inputs' autocomplete='off' value='0'></td>" + "<td class='table-controls'><button class='btn btn-danger glyphicon glyphicon-trash remove-row' href='#'></button></td>" + "</tr>";
	
	
	
	
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
// add or delete row for discount
function SetDiscount() {
   var dis = $('#discount')[0].selectedIndex;
   if (dis.val == 0) {
   	return false;
   } else {
   	 AddDiscount();
   }
}


// Shipping or not?
function SetShipping() {
	var shiprow = $(".shipping-row").length != 0;
	var shipsettings = $("#shipping option:selected").index();
	if (shipsettings == 0) {
		if ($(".shipping-row").length == 0) {
			return false;
		} else {
			$(".shipping-row").parents('tr').remove();
			
		}

	} else {
		if ($(".shipping-row").length != 0) {
			return false;
		} else {
			AddShipping();
		}

	}

}


// Discount or not?
function SetDiscount() {
	var disprow = $(".discount-row").length != 0;
	var dissettings = $("#discount option:selected").index();
	if (dissettings == 0) {
		if ($(".discount-row").length == 0) {
			return false;
		} else {
			$(".discount-row").parents('tr').remove();

		}
	} else {
		$(".discount-row").parents('tr').remove();
		if (dissettings == 1) {
			if ($(".discount-row").length != 0) {
				return false;
			} else {
				
				AddDiscountFlat();
			}
		} else {
			$(".discount-row").parents('tr').remove();
			if (dissettings == 2) {
				if ($(".discount-row").length != 0) {
					return false;
				} else {
					
					AddDiscountPercent();
				}
			}

		}
	}
}

// discount flat
function AddDiscountFlat() {
	
	var i = 0;
	var newDiscount = "<tr>" 
	+ "<td colspan='3' style='cursor: default;' class='nodrag noline'>" 
	+ "<td class='nodrag'><textarea type='text' class='table-inputs discount-row' data-i18n='table.discount' style='cursor: default;'></textarea></td>" 
	+ "<td style='cursor: default;' class='nodrag'></td>"
	+ "<td style='cursor: default;' class='nodrag'></td>"
	+ "<td style='cursor: default;' class='nodrag'><input data-key='subtotal' class='table-inputs discount-total' disabled='disabled' value='0'></td>"
    + "<td style='cursor: default;' class='nodrag' currency-column'><textarea type='text' class='table-inputs currency-label' style='cursor: default;' disabled='disabled'></textarea></td>"
	+ "</tr>";
	$('#document-table > tfoot > tr').eq(i).after(newDiscount);
	$(".discount-row").i18n();
	
	SetCurrency();
}
// discount percent
function AddDiscountPercent() {
	
	var i = 0;
	var newDiscount = "<tr>" + "<td colspan='3' style='cursor: default;' class='nodrag noline'>" 
	+ "<td class='nodrag'><textarea type='text' class='table-inputs discount-row' data-i18n='table.discount' style='cursor: default;'></textarea></td>" 
	+ "<td style='cursor: default;' class='nodrag'></td>"
	+ "<td style='cursor: default;' class='nodrag'></td>"
	+ "<td style='cursor: default;' class='nodrag'><input data-key='subtotal' class='table-inputs discount-total' disabled='disabled' value='0'></td>"
    + "<td style='cursor: default;' class='nodrag' currency-column'><textarea type='text' class='table-inputs' style='cursor: default;'>0%</textarea></td>"
	+ "</tr>";
	$('#document-table > tfoot > tr').eq(i).after(newDiscount);
	$(".discount-row").i18n();

}
// shipping costs
function AddShipping() {
    	
	var i = 0;
	var newShipping = "<tr>" + "<td colspan='3' style='cursor: default;' class='nodrag noline'>" 
	+ "<td class='nodrag'><textarea type='text' class='table-inputs shipping-row' data-i18n='table.shipping' style='cursor: default;'></textarea></td>" 
	+ "<td style='cursor: default;' class='nodrag'></td>"
	+ "<td style='cursor: default;' class='nodrag'></td>"
	+ "<td style='cursor: default;' class='nodrag'><input data-key='subtotal' class='table-inputs shipping-total' disabled='disabled' value='0'></td>"
    + "<td style='cursor: default;' class='nodrag' currency-column'><textarea type='text' class='table-inputs currency-label' style='cursor: default;' disabled='disabled'></textarea></td>"
	+ "</tr>";
	$('#document-table > tfoot > tr').eq(i).after(newShipping);
	$(".shipping-row").i18n();
	
	SetCurrency();

}

function SetTax(){
	var taxsettings = $("#tax option:selected").index();
	// 1 tax column
	if (taxsettings == 1) {
		if ($(".tax2-column").length == 0) {
				return false;
			} else {
				$('#document-table th:nth-child(6), #document-table td:nth-child(6)').remove();
				$('#document-table tfoot th:nth-child(3), #document-table tfoot td:nth-child(3)').remove();
				
			}
	
	}
	// no tax column
	if (taxsettings == 0) {
		if ($(".tax2-column").length == 0 && $(".tax1-column").length == 0) {
			return false;
			} else {
	$('#document-table th:nth-child(6), #document-table td:nth-child(6)').remove();
	$('#document-table tfoot th:nth-child(3), #document-table tfoot td:nth-child(3)').remove();
	$('#document-table th:nth-child(5), #document-table td:nth-child(5)').remove();
	$('#document-table tfoot th:nth-child(3), #document-table tfoot td:nth-child(3)').remove();
	}
}
}

function AddTax2(){

}

function AddTax1(){

}
