/* record table control */
function delete_record(){
	var sel_target = new Array();
	var del_index = new Array();
	sel_target = product_table.bootstrapTable('getSelections');
	for( var i=0; i<sel_target.length; i++ ){
		del_index[i] = sel_target[i].index
	}
	var json_array = convert_json_array( del_index );
	var attr = {
		"state": "rem_record_data",
		"del_index": json_array
	};
	send_to_db( attr );
}



function receive_record(){
	var attr = {
		"state": "get_record_data",
	};
	receive_to_db( attr );
}
