// addend new row to product table
function append_btn_res( product_table ){
	var data_attr = new Array();
	var data_attr = product_table.bootstrapTable("getData",false);
	product_table.bootstrapTable("append", add_product_part_row(data_attr.length));
	product_table.bootstrapTable("scrollTo", 'bottom');
};

// add product part table row
function add_product_part_row( idx ){
	var rows = [];
	var num_param ={
		func: 1,
		val: "undefined"
	};
	
	rows.push({
		index: idx,
		number: num_param,
		name: "",
		quantity: "",
		cost: "",
		totalcost: "",
		supplier: "",
		format: "",
		delrow: ""
	});
	return rows;
}


// remove table row
function remove_table_row( product_table, idx, sort_bool ){
	var attr = product_table.bootstrapTable('getRowByUniqueId', idx );
	product_table.bootstrapTable('remove', {
		field: "index",
		values: Array.of(idx)
	});
	if ( sort_bool ){
		sort_table_index( product_table, attr );
	}
}

// sort table index
function sort_table_index( product_table, attr ){
	var i = 1;
	while( attr !== null ){
		replace_index = idx+i-1;
		product_table.bootstrapTable('updateRow', {
			index: replace_index,
			row: {
				index: replace_index,
			}
		});
		attr = product_table.bootstrapTable('getRowByUniqueId', idx+i+1 );
		i++;
	}
}