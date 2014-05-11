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

   // set all textareas to autosize
    $('textarea').autosize();  
    // set defaults discount, shipping and tax
    SetDiscount();

    $('#shippingno').trigger('click');
    $("#tax").trigger("change");
    // add currency to labels
    $("#currency").trigger("change");

    
});

// add row
$("#button-rowadd").click(function() {

var row = $("#document-table tbody>tr:last").clone(true);
 $("td input:text", row).val(0);
 $(".quantity", row).val(1);
 $(".tax1-row", row).val('0%');
 $(".tax2-row", row).val('0%');
 
 
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
function SetDiscount() {
	var dissettings = $("#discount option:selected").index();
	var drow = $(".discount-row").parents('tr');
	if (dissettings == 0) {
		    // no discount		
			$(drow).fadeOut();
            $(".discount-total").val(0);                    
		}
	if (dissettings == 1) {
		    // discount flat
			$(drow).fadeIn();
			$(drow).i18n();
			 // add currency to labels
    		$("#currency").trigger("change");
		} 
	if (dissettings == 2) {
		    // discount percent
			$(drow).fadeIn();
			$(drow).i18n();
			 // add currency to labels
    		$("#currency").trigger("change");
}
}

// Shipping or not?
var $delbtnyes = $('#shippingyes');
var $delbtnno = $('#shippingno'); 
var srow = $(".shipping-row").parents('tr'); 

$delbtnyes.on('click', function () {
	// shipping costs	
		(srow).fadeIn(); 
});   
$delbtnno.on('click', function () {
   // no shipping costs		
		$(srow).fadeOut();   
        $(".shipping-total").val(0);   
});


$('#tax').change(function () {
	var taxessettings = $("#tax option:selected").index();
	var trow = $(".tax-row").parents('tr');
	if (taxessettings == 0) {
		// no shipping costs		
		$(trow).fadeOut();   
        $(".tax-total").val(0);                 
	} else {
		// shipping costs	
		$(trow).fadeIn(); 
	}

	
    
    var $tax1 = $('#document-table').find('tbody tr').find('td:nth-child(5)'),
        $tax1th = $('#document-table').find('thead th:nth-child(5)'),
        $tax1ft = $('#document-table').find('tfoot tr').find('td:nth-child(3)'),
        $tax2 = $('#document-table').find('tbody tr').find('td:nth-child(6)'),
        $tax2th = $('#document-table').find('thead th:nth-child(6)'),
        $tax2ft = $('#document-table').find('tfoot tr').find('td:nth-child(4)'),
        $v = $(this).val();
        
    if ($v == 'tax-none') {
    	 $tax1.fadeOut();
    	 $tax1th.fadeOut();
    	 $tax1ft.fadeOut();
    	 $tax2.fadeOut();
    	 $tax2th.fadeOut();
    	 $tax2ft.fadeOut(); 	 
    	}      
        
    if ($v == '1 Tax') {
    	$tax1.fadeIn ();
    	$tax1th.fadeIn();
    	$tax1ft.fadeIn();
    	$tax2.fadeOut();
    	$tax2th.fadeOut();
    	$tax2ft.fadeOut();
    	}   
    if ($v == '2 Taxes') {
    	$tax1.fadeIn();
    	$tax1th.fadeIn();
    	$tax1ft.fadeIn();
    	$tax2.fadeIn();
    	$tax2th.fadeIn();
    	$tax2ft.fadeIn();
    	}   


});

// disable 'taxes 2' for e.g. German Market

$('#currency').change(function () {
	var str = "";
	var taxsettings = $("#tax option:selected").index();
	var currencysettings = $( "#currency option:selected" ).text();
	console.log(currencysettings);
	if (currencysettings == ' EUR Euro') {
		      	//$('#tax').attr('disabled','disabled');
      	$("#tax option[value='2 Taxes']").attr('disabled','disabled');
 	
	} else {
		$("#tax option[value='2 Taxes']").removeAttr('disabled');
	}
	
 // add currency to labels

   var dissettings = $("#discount option:selected").index();
   var cur = $('#currency').val();
   var percent = "%";
   $('.currency-label').val(cur); 
   $('.discount-row-label').val(cur); 
   if (dissettings == 2) {
   	$('.discount-row-label').val(percent); 
   } 
});

