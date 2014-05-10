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
    // set discount
    SetDiscount();
    SetShipping();
});

// add row
$("#button-rowadd").click(function() {

var row = $("#document-table tbody>tr:last").clone(true);
 $("td input:text", row).val(0);
 $(".quantity", row).val(1);
 $(".tax1-row", row).val('0%');
 $(".tax2-row", row).val('0%');
 
 
 $(row).fadeIn(400 ,function (){ 
            row.insertAfter('#document-table tbody>tr:last');
  });
 
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
   var dissettings = $("#discount option:selected").index();
   var cur = $('#currency').val();
   var percent = "%";
   $('.currency-label').val(cur); 
   $('.discount-row-label').val(cur); 
   if (dissettings == 2) {
   	$('.discount-row-label').val(percent); 
   } 
}

// Discount or not?
function SetDiscount() {
	var dissettings = $("#discount option:selected").index();
	var drow = $(".discount-row").parents('tr');
	if (dissettings == 0) {
		    // no discount		
			$(drow).fadeOut(400 ,function (){ 
            $(drow).hide();
            $(".discount-total").val(0);                    
      });
		}
	if (dissettings == 1) {
		    // discount flat
			$(drow).fadeIn(400 ,function (){ 
            $(drow).show(); 
             });
			$(drow).i18n();
			SetCurrency();
		} 
	if (dissettings == 2) {
		    // discount percent
			$(drow).fadeIn(400 ,function (){ 
            $(drow).show(); 
             });
			$(drow).i18n();
			SetCurrency();
}
}

// Shipping or not?
function SetShipping() {
	var shipsettings = $("#shipping option:selected").index();
	var srow = $(".shipping-row").parents('tr');
	if (shipsettings == 0) {
		// no shipping costs		
		$(srow).fadeOut(400 ,function (){ 
        $(srow).hide();   
        $(".shipping-total").val(0);                 
      });
	} else {
		// shipping costs	
		$(srow).fadeIn(400 ,function (){ 
       	$(srow).show(); 
      });
	}
}

function SetTax(){
var taxsettings = $("#tax option:selected").index();
if (taxsettings == 2) {	
    // two taxes
}
}


