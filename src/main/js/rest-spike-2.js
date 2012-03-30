function beanResponse (data)  {
	  var items = [];


	  $.each(data.entity, function(key, val) {
	    items.push('<li id="' + key + '">' + val + '</li>');
	  });
	  for (var i in data.links) {
		  var link = data.links[i];
		  items.push('<li id="do' + link.rel + '">');
		  if (link.href == '' || link.href == null) {
			  items.push(link.rel);
		  }
		  else if (link.method == 'POST') {
			  items.push(
			  	"<a href='javascript:postABean(" + '"' + link.href + '", ' + JSON.stringify(data.entity) + ")'>",
			  	link.rel,
			  	"</a>");
		  } else {
			  	items.push('<a href="' + link.href + '">', link.rel, '</a>' );
		  }
		  items.push("</li>");
	  };

	  $("#theBean").empty().append(
	  $('<ul/>', {
	    'class': 'my-new-list',
	    html: items.join('')
	  }));
	};

function getABean() {
	$.getJSON('/rest/hello/bean', beanResponse);
}

function postABean(href, data) {
	var postdata = JSON.stringify(data);
	xq = $.ajax(href, {contentType: "application/json", data : postdata, dataType : "json", type: "POST"});
	xq.done(beanResponse);
}
$('#getABean').click(getABean);
