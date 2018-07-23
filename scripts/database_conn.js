// receive data for database
async function receive_to_db( product_table, ele_id, data){
	data.id = user_id;
	try{
		var response = await receive_promise( product_table, ele_id, data);
		if( response == true ){
			console.log( "接收完成" );
		}
		else{
			alert( response )
		}
	}
	catch(e){
		alert( "資料庫錯誤:" + e  );
	}
}

// receive promise
function receive_promise( product_table, ele_id, data){
	return new Promise(function (resolve, reject){
		$.ajax({
			type: "post",
			url: "https://script.google.com/macros/s/AKfycbxY1vSL9WnuIAzh9BqHFpBR6_u_g3Erfmf9tbp2iRhNxtCzp2o/exec",
			data: data,
			dataType: "JSON",
			timeout: 10000,
			success: function(response){
				switch( data.state ){
					case "get_all_data":
					case "get_record_data":
						product_table.bootstrapTable('removeAll');
						product_table.bootstrapTable('load', response);
						product_table.bootstrapTable('selectPage', '1');
						product_table.bootstrapTable('scrollTo', 'top');
						resolve( true );
						break;	
					case "get_all_partnum":
						if( response[0].number == undefined || response.number == "" ){
							return;
						}
						part_list_options = "";
						for(var i=0; i < response.length; i++){
							part_list_options += '<option value="'+response[i].number+'" />';
						}
						part_list_obj.empty();
						part_list_obj.append( part_list_options );
						resolve( true );
						break;
					case "get_single_data":
						if( response.name == undefined || response.name == "" ){
							resolve( "錯誤的檔案" );
							return;
						}
						switch(data.func){
							case "bom_data":

								remove_bomtable_interface();
								
								var cnt = document.getElementById( ele_id );
								div_first_obj = document.createElement( "div" );
								div_first_obj.id = "bom";
								div_first_obj.setAttribute("class", "tab_form");
								cnt.appendChild(div_first_obj);
								
								var div_second_obj = document.createElement( "div" );
								div_second_obj.setAttribute("class", "text_field");
								div_first_obj.appendChild(div_second_obj);
								
								var data_str = "";
								var table_title = new Array();
								data_str += '<label for="part_num_in">品號 :</label><input id="part_num_in" class="input_container part_list_style" name="part_num_list" list="part_list" value="' + data.number + '" onchange="update_bomtable_type( this.value, -1 )"/>';
								data_str += '<a onclick="bomtable_go_page(' + (data.index-1) + ')"><i class="fa fa-arrow-circle-left fa-2x fa-fw"></i></a>';
								data_str += '<a onclick="bomtable_go_page(' + (data.index+1) + ')"><i class="fa fa-arrow-circle-right fa-2x"></i></a>';
								switch ( data.number[0] ){
									case '1':
										data_str += '<br><label for="part_name_out">品名 :</label><input id="part_name_out" class="input_container" style="width:300px" disabled="true" value="' + response.name + '" />';
										data_str += '<label for="part_stock_out">庫存 :</label><input id="part_stock_out" class="input_container" style="width:60px" disabled="true" value="' + response.stock_quantity + '" />';
										data_str += '<label for="part_cost_out">總成本 :</label><input id="part_cost_out" class="input_container" style="width:100px" disabled="true" value="' + response.cost + '" />';
										data_str += '<br><label for="part_remark_out">備註 : </label><br><textarea id="part_remark_out" rows="5" cols="50" wrap="hard" disabled="true" />' + response.remark + '</textarea>';
										table_title = [ '料號', '名稱', '成本', '數量', '備註', 'Sunny註解', '庫存' ];
										break;
									case '2':
										data_str += '<br><label for="part_name_out">品名 :</label><input id="part_name_out" class="input_container" style="width:300px" disabled="true" value="' + response.name + '" />';
										data_str += '<label for="part_stock_out">庫存 :</label><input id="part_stock_out" class="input_container" style="width:60px" disabled="true" value="' + response.stock_quantity + '" />';
										data_str += '<label for="part_cost_out">總成本 :</label><input id="part_cost_out" class="input_container" style="width:100px" disabled="true" value="' + response.cost + '" />';
										data_str += '<br><label for="part_remark_out">備註 :</label><br><textarea id="part_remark_out" rows="5" cols="50" wrap="hard" disabled="true" />' + response.remark + '</textarea>';
										table_title = [ '料號', '名稱', '成本', '數量', '廠商', '規格', '庫存'  ];
										break;
									case '3':
										data_str += '<br><label for="part_name_out">品名 :</label><input id="part_name_out" class="input_container" style="width:300px" disabled="true" value="' + response.name + '" />';
										data_str += '<label for="part_stock_out">庫存 :</label><input id="part_stock_out" class="input_container" style="width:60px" disabled="true" value="' + response.stock_quantity + '" />';
										data_str += '<br><label for="part_format_out">規格 :</label><input id="part_format_out" class="input_container" style="width:500px" disabled="true" value="' + response.format + '" />';
										data_str += '<br><label for="part_supplier_out">廠商 :</label><input id="part_supplier_out" class="input_container" style="width:100px" disabled="true" value="' + response.supplier + '" />';
										data_str += '<br><label for="part_unit_out">單位 :</label><input id="part_unit_out" class="input_container" style="width:60px" disabled="true" value="' + response.unit + '" />';
										data_str += '<br><label for="part_cost_out">成本 :</label><input id="part_cost_out" class="input_container" style="width:200px" disabled="true" value="' + response.cost + '" />';
										data_str += '<br><label for="part_fignum_out">圖號 :</label><input id="part_fignum_out" class="input_container" style="width:250px" disabled="true" value="' + response.fignum + '" />';
										break;
									default:
										resolve( "input error" );
										return;
								}
								div_second_obj.innerHTML = data_str;
								div_first_obj.appendChild(div_second_obj);
								var title_len = table_title.length;
								if( title_len <= 0 ){
									return;
								}
								
								if( response.data == undefined ){
									resolve( "BOM 不存在" );
									return;
								}
								table_obj = document.createElement( "table" );
								thead_obj = document.createElement( "thead" );
								tbody_obj = document.createElement( "tbody" );
								tr_obj = document.createElement( "tr" );
								table_obj.border = "1";
								var title_str = "";
								var style_str = "";
								for( var i=0; i<title_len; i++ ){
									switch( table_title[i] ){
										case '料號':
											style_str = "style='width:170px;text-align:center' ";
											break;
										case '名稱':
											style_str = "style='width:200px;text-align:center' ";
											break;
										case '成本':
											style_str = "style='width:80px;text-align:center' ";
											break;
										case '數量':
											style_str = "style='width:80px;text-align:center' ";
											break;
										case '廠商':
											style_str = "style='width:100px;text-align:center' ";
											break;
										case '規格':
											style_str = "style='width:200px;text-align:center' ";
											break;
										case '庫存':
											style_str = "style='width:80px;text-align:center' ";
											break;
										case '備註':
											style_str = "style='width:200px;text-align:center' ";
											break;
										case 'Sunny註解':
											style_str = "style='width:80px;text-align:center' ";
											break;
										default:
									}
									title_str += "<td " + style_str + ">" + table_title[i] + "</td>";
								}
								tr_obj.innerHTML = title_str;
								thead_obj.appendChild( tr_obj );
								table_obj.appendChild( thead_obj );
								var data_len = response.data.length;
								var data_str = "";
								for( var i=0; i<data_len; i++ ){
									tr_obj = document.createElement( "tr" );
									data_str = "";
									for( var j=0; j<title_len; j++ ){
										switch( table_title[j] ){
											case '料號':
												var number_str = response.data[i].number;
												var hnumber = "<a style='font-family: Monospace, Courier New, sans-serif' onclick = 'update_bomtable_type( this.text, -1 )' >" + number_str + "</a>";
												res_str = hnumber;
												break;
											case '名稱':
												res_str = response.data[i].name;
												break;
											case '成本':
												res_str = response.data[i].cost;
												break;
											case '數量':
												res_str = response.data[i].quantity;
												break;
											case '廠商':
												res_str = response.data[i].supplier;
												break;
											case '規格':
												res_str = response.data[i].format;
												break;
											case '庫存':
												res_str = response.data[i].stock_quantity;
												break;
											case '備註':
												res_str = response.data[i].remark;
												break;
											case 'Sunny註解':
												res_str = response.data[i].sunnyremark;
												break;
											default:
										}
										data_str += "<td style='height:35px;text-align:center' >" + res_str + "</td>";
									}
									tr_obj.innerHTML = data_str;
									tbody_obj.appendChild( tr_obj );
								}
								table_obj.appendChild( tbody_obj );
								div_first_obj.appendChild( table_obj );
								resolve( true );
								break;
							case "product":
								if( response.number !== undefined ){
									var num_param ={
										func: 1,
										val: response.number
									};
									var quan_param ={
										func: 1,
										val: 0
									};
									product_table.bootstrapTable('updateRow', {
										index: data.index,
										row: {
											index: data.index,
											number: num_param,
											name: response.name,
											quantity: quan_param,
											cost: response.cost,
											supplier: response.supplier,
											format: response.format
										}
									});
									resolve( true );
								}
								break;
							case "revise_part_data":
								console.log( response );
								var cnt = document.getElementById( ele_id );
								var var_val = cnt.getElementsByClassName("part_attr");
								for (var i=0; i<var_val.length; i++){
									switch( var_val[i].name ){
										case "part_name":
											var_val[i].value = response.name;
											break;
										case "part_format":
											var_val[i].value = response.format;
											break;
										case "part_fignum":
											var_val[i].value = response.fignum;
											break;
										case "part_supplier":
											var_val[i].value = response.supplier;
											break;
										case "part_unit":
											var_val[i].value = response.unit;
											break;
										case "part_cost":
											var_val[i].value = response.cost;
											break;
										case "part_quantity":
											var_val[i].value = response.stock_quantity;
											break;
										default:
									}
								}
								resolve( true );
								break;
							case "quantity":
								var cnt = document.getElementById( ele_id );
								var var_val = cnt.getElementsByClassName("part_attr");
								for (var i=0; i<var_val.length; i++){
									if( var_val[i].name == "inventory" ){
										var_val[i].value = response.stock_quantity;
										break;
									}
								}
								resolve( true );
								break;
							case "product_num_search":
								var cnt = document.getElementById( ele_id );
								var var_val = cnt.getElementsByClassName("part_attr");
								product_table.bootstrapTable('removeAll');
								if(response.data == undefined){
									for (var i=0; i<var_val.length; i++){
										switch( var_val[i].name ){	
											case "part_name":
												var_val[i].value = "";
												break;
											case "part_remark":
												var_val[i].value = "";
												break;
											case "part_totalcost":
												var_val[i].value = "";
												break;
											default:
										}
									}
								}
								else{
									for (var i=0; i<var_val.length; i++){
										switch( var_val[i].name ){	
											case "part_name":
												var_val[i].value = response.name;
												break;
											case "part_remark":
												var_val[i].value = response.remark;
												break;
											case "part_totalcost":
												var_val[i].value = response.cost;
												break;
											default:
										}
									}
									product_table.bootstrapTable('load', response.data);
									product_table.bootstrapTable('selectPage', '1');
									product_table.bootstrapTable('scrollTo', 'top');
									resolve( true );
								}
								break;
							case "revise_product_data":
								var cnt = document.getElementById( ele_id );
								var var_val = cnt.getElementsByClassName("part_attr");
								product_table.bootstrapTable('removeAll');
								if(response.data == undefined){
									for (var i=0; i<var_val.length; i++){
										switch( var_val[i].name ){	
											case "part_name":
												var_val[i].value = "";
												break;
											case "part_remark":
												var_val[i].value = "";
												break;
											case "part_totalcost":
												var_val[i].value = "";
												break;
											default:
										}
									}
								}
								else{
									for( var i=0; i<var_val.length; i++ ){
										switch( var_val[i].name ){	
											case "part_name":
												var_val[i].value = response.name;
												break;
											case "part_remark":
												var_val[i].value = response.remark;
												break;
											case "part_totalcost":
												var_val[i].value = response.cost;
												break;
											default:
										};
									}
									
									var rec_data;
									var new_data = new Array();
									for( var i=0; i<response.data.length; i++ ){
										rec_data = response.data[i];
										var num_param ={
											func: 1,
											val: rec_data.number
										};
										var quan_param ={
											func: 1,
											val: rec_data.quantity
										};
										new_data[i] = {
										  "index": rec_data.index,
										  "number": num_param,
										  "name": rec_data.name,
										  "quantity": quan_param,
										  "cost": rec_data.cost,
										  "totalcost": rec_data.totalcost,
										  "supplier": rec_data.supplier,
										  "format": rec_data.format,
										  "delrow": ""
										};
									}
									product_table.bootstrapTable('load', new_data);
									product_table.bootstrapTable('selectPage', '1');
									product_table.bootstrapTable('scrollTo', 'top');
									resolve( true );
								}
								break;
							default:
								resolve( "undefined function" );
						}
						break;
					default:
						resolve( "undefined function" );
				}
			},
			error: function(err){
				reject( err.status + err.responseText );
			}
		});
	});
}



// send data to database
async function send_to_db(data){
	data.id = user_id;
	try{
		var response = await send_promise(data);
		if( response == true ){
			switch( data.state ){
				case "add_newdata":
					receive_db_partlist();
					break;
				case "add_inventory_quantity":
					var attr = {
						"state": "get_single_data",
						"number": data.number,
						"func": 'quantity'
					};
					receive_to_db(attr);
				case "rem_record_data":
					receive_record();
				default:
			}
		}
		else{
			alert( response );
		}

	}
	catch(e){
		alert( "資料庫錯誤:" + e  );
	}
}
// send promise
function send_promise( data ){
	
	return new Promise(function (resolve, reject){
		$.ajax({
			type: "get",
			url: "https://script.google.com/macros/s/AKfycbxY1vSL9WnuIAzh9BqHFpBR6_u_g3Erfmf9tbp2iRhNxtCzp2o/exec",
			data: data,
			dataType: "JSON",
			timeout: 10000,
			success: function (response) {
				switch( data.state ){
					case "add_newdata":
						resolve( response );
						break;
					case "replace_data":
						resolve( response );
						break;
					case "add_inventory_quantity":
						resolve( response );
						break;
					case "add_track_data":
						resolve( response );
						break;
					case "rem_record_data":
						resolve( response );
						break;
					default:
				}
			},
			error: function (err) {
				reject( err.status + err.responseText );
			}
		});
	})			
}



// convert json array
function convert_json_array( data_array ){
	json_array = JSON.stringify( data_array );
	return json_array
}