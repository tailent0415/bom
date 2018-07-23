// Init Bomtable interface
function init_bomtable_interface( ){
	window.bom_node_array = [];
	var cnt = document.getElementById( window.ele_id );
	var div_first_obj = document.getElementById( "bom" );
	if( div_first_obj !== null ){
		remove_bomtable_interface();
	}
	div_first_obj = document.createElement( "div" );
	div_first_obj.id = "bom"
	div_first_obj.setAttribute("class", "tab_form");
	cnt.appendChild(div_first_obj);
	var div_second_obj = document.createElement( "div" );
	div_second_obj.setAttribute("class", "text_field");
	var data_str = '<label for="part_num_in">品號 : </label><input id="part_num_in" class="input_container part_list_style" name="part_num_list" list="part_list" onchange="update_bomtable_type( this.value, -1 )"/>';
	div_second_obj.innerHTML = data_str;
	div_first_obj.appendChild(div_second_obj);
}


// Update Bomtable interface type
function update_bomtable_type( num_value, data_ind ){
	if( check_part_num( 0, 15, normal_part_number( num_value ) ) ){
		if( data_ind == -1 ){
			window.bom_node_array[ window.bom_node_array.length ] = num_value;
			data_ind = window.bom_node_array.length-1;
		};
		
		var attr = {
			"state": "get_single_data",
			"number": num_value,
			"func": "bom_data",
			"index": data_ind
		};
		
		receive_to_db( attr );
	}
	else{
		init_bomtable_interface()
	}

}


// Remove Bomtable interface
function remove_bomtable_interface(){
	var cnt = document.getElementById( ele_id );
	var div_obj = document.getElementById( "bom" );
	cnt.removeChild(div_obj);
}


// Bomtable Page
function bomtable_go_page( data_ind ){
	if( data_ind<0 || data_ind>=window.bom_node_array.length ){
		return;
	}
	num_value = window.bom_node_array[ data_ind ];
	update_bomtable_type( num_value, data_ind );
}
