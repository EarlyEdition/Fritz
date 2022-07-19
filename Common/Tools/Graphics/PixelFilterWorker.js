"use strict";

var F = function ()
{
	var Filter = {};

	Filter.darkenCorners = function( data, x, y, w, h, pix0 )
	{
		var rx = ( x - w * 0.46 ) / w, ry = ( y - h * 0.46 ) / h;	// displaced center
		var r = Math.sqrt( rx * rx + ry * ry );
		var fact = Math.exp( -( Math.pow( r, 4 ) / 0.5 ) );
		data[pix0] = data[pix0] * fact;
		data[pix0 + 1] = data[pix0 + 1] * fact;
		data[pix0 + 2] = data[pix0 + 2] * fact;
	};

	Filter.reset = function ( data, x, y, w, h, pix0 )
	{
		data[pix0 + 0] = 0;
		data[pix0 + 1] = 0;
		data[pix0 + 2] = 0;
	};

	Filter.applyFilter = function ( d, filterFn )
	{
		var imageData = d.imageData;
		var data = d.imageData.data;
		var w = imageData.width;
		var h = imageData.height;
		for ( var x = 0; x < imageData.width; x++ )
		{
			for ( var y = 0; y < imageData.height; y++ )
			{
				var pixOffs = ( y * imageData.width + x ) * 4;	// rgba
				filterFn( data, x, y, w, h, pixOffs );
			}
		}

		postMessage(
		{
			id: "result",
			imageData: d.imageData,
			ticket: d.ticket,
		} );
	};

	return Filter;
}();

onmessage = function ( e )
{
	switch ( e.data['cmd'] )
	{
		case "darkenCorners":
			F.applyFilter( e.data, F.darkenCorners );
			break;
	};
}
