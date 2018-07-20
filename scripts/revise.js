/* revise interface control */
function init_revise_interface(){
	var cnt = document.getElementById( ele_id );
	var div_first_obj = document.getElementById( "revise" );
	if( div_first_obj !== null ){
		remove_revise_interface();
	}
	div_first_obj = document.createElement( "div" );
	div_first_obj.id = "revise";
	div_first_obj.setAttribute("class", "tab_form");
	cnt.appendChild(div_first_obj);
	var div_second_obj = document.createElement( "div" );
	div_second_obj.setAttribute("class", "text_field");
	var data_str = '<label for="part_num_in">品號 : </label><input id="part_num_in" class="input_container part_list_style" name="part_num_list" list="part_list" onchange="update_revise_type( this.value )"/>';
	div_second_obj.innerHTML = data_str;
	div_first_obj.appendChild(div_second_obj);
}

function update_revise_type( num_value ){
	
	if( check_part_num( 0, 15, normal_part_number( num_value ) ) ){
		
		remove_revise_interface();
	
		var revise_table_obj = document.getElementById( "revise_title" );
		var cnt = document.getElementById( ele_id );
		div_first_obj = document.createElement( "div" );
		div_first_obj.id = "revise";
		div_first_obj.setAttribute("class", "tab_form");
		cnt.appendChild(div_first_obj);
									
		var div_second_obj = document.createElement( "div" );
		div_second_obj.setAttribute("class", "text_field");
		div_first_obj.appendChild(div_second_obj);
		
		var data_str = "";
		var table_title = new Array();
		data_str += '<label for="part_num_in">品號 :</label><input id="part_num_in" class="part_attr input_container part_list_style" name="part_num_list" list="part_list" value="' + num_value + '" onchange="update_revise_type( this.value )"/>';
		data_str += '<br><label for="part_name_in">品名 :</label><input id="part_name_in" type="text" class="part_attr input_container" style="width:300px" name="part_name">';
		switch( num_value[0] ){
			case "1":
			case "2":
				data_str += '<br><label for="part_remark_in">備註 : </label>';
				data_str += '<br><textarea id="part_remark_in" class="part_attr" name="part_remark" rows="5" cols="50" wrap="hard" ></textarea>';
				data_str += '<br><div class="col-xs-2" style="margin-top:5px;margin-bottom:5px"><button type="button" class="col-xs-12 btn btn-primary" onclick="append_btn_res()" >Add Item</button></div>';
				data_str += '<div class="col-xs-2" style="margin-top:5px;margin-bottom:5px" ><button type="button" class="col-xs-12 btn btn-primary" onclick="send_revise_product()" >Upload</button></div>';
				data_str += '<div class="col-xs-8 align_right"><label for="part_totalcost_out">總成本 :</label><input type=text id="part_totalcost_out" class="part_attr input_container" style="width:200px;margin-top:15px" name="part_totalcost" disabled="true" ></div>';
				div_second_obj.innerHTML = data_str;
				div_first_obj.appendChild(div_second_obj);
				div_first_obj.after( revise_table_obj );
				revise_table_obj.style.display = "inline";
				receive_part_info( "revise_product_data", num_value )
				break;
			case "3":
				data_str += '<br><label for="part_format_in">規格 :</label><input id="part_format_in" type="text" class="part_attr input_container" name="part_format" type="text" style="width:500px" />';
				data_str += '<br><label for="part_fignum_in">圖號 :</label><input id="part_fignum_in" type="text" class="part_attr input_container" name="part_fignum" type="text" style="width:250px" />';
				data_str += '<br><label for="part_supplier_in">廠商 :</label><input id="part_supplier_in" type="text" class="part_attr input_container" name="part_supplier" type="text" style="width:100px" />';
				data_str += '<br><label for="part_unit_in">單位 :</label><select id="part_unit_in" type="text" class="part_attr input_container" name="part_unit" style="width:70px" ><option value="SET">SET</option><option value="PCS">PCS</option></select>';
				data_str += '<br><label for="part_cost_in">成本 :</label><input id="part_cost_in" type="text" class="part_attr input_container" name="part_cost" type="text" style="width:100px" />';
				data_str += '<br><label for="part_quantity_in">數量 :</label><input id="part_quantity_in" type="text" class="part_attr input_container" name="part_quantity" type="text" style="width:60px" />';
				data_str += '<div class="btn_field"><button type="button" class="btn btn-primary" onclick="send_revise_part()">修改</button></div>';
				div_second_obj.innerHTML = data_str;
				div_first_obj.appendChild(div_second_obj);
				revise_table_obj.style.display = "none";
				receive_part_info( "revise_part_data", num_value )
				break;
			default:
		}
	}
	else{
		init_revise_interface();
	}
}

function remove_revise_interface(){
	var cnt = document.getElementById( ele_id );
	var div_obj = document.getElementById( "revise" );
	document.getElementById( "revise_title" ).style.display = "none";
	cnt.removeChild(div_obj);
}

