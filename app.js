function init () {
	getReq('vim-cheat-sheet.json', function(resp) {

	    var data = JSON.parse(resp);
	    var html = '<h1 class="text-center">Vim Cheat Sheet</h1>';
	    html += '<ul class="data-table">';
	    for (var i in data) {
	        html += '<li><a href="#' + i + '">' + i + '</a></li>';
	    }
	    html += "</ul>";

	    for (var i in data) {
	        html += '<div id="' + i + '" class="data">';
	        html += "<h2>" + i + "</h2>";
	        for (var j in data[i]) {
	            html += "<p><strong>" + j + "</strong>: " + data[i][j] + "</p>";
	        }
	        html += "</div>";
	    }

	    document.getElementById('root').innerHTML += html;

	    var a = document.querySelectorAll('.data-table a');
		for (var i = 0; i < a.length; i++) {
		    a[i].addEventListener('click', function(e) {
		        var elm = e.target;
		        var data = document.getElementsByClassName('data');
		        var a = document.getElementsByClassName('active');
		        if (a) {
		            for (var i = 0; i < a.length; i++) {
		                a[i].classList.remove('active');
		            }
		        }
		        elm.classList.add('active');
		        var id = elm.href.split("#")[1];

		        for (var i = 0; i < data.length; i++) {
		            data[i].classList.add('hidden');
		            if (data[i].id === id) {
		                data[i].classList.remove('hidden');
		            }
		        }
		        
		        e.preventDefault();
		    });
		}
	});
}

function getReq(url, fn) {
    var inv = new XMLHttpRequest();
    inv.onreadystatechange = function() {
        if (inv.readyState === inv.DONE) {
            if (inv.status === 200) {
                fn(inv.responseText);
            }
        }
    }
    inv.open('GET', url, true);
    inv.send(null);
}

function log(msg) {
    return console.log(msg);
}

window.addEventListener('load', init);