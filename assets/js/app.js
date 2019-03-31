var gifArr = ["Nissan", "Ford", "Mazda", "Mclaren", "Chevy"];
function createBtn() {
	$("#searchButtons").empty();
	for (var i = 0; i < gifArr.length; i++) {
		var a = $("<button>");
		a.addClass("btn");
		a.attr("data-input", gifArr[i]);
		a.text(gifArr[i]);
		$("#searchButtons").append(a);
	}
}
function results() {
	var search = $(this).attr("data-input");
	var queryURL =
		"https://api.giphy.com/v1/gifs/search?q=" +
		search +
		"&limit=10&api_key=dc6zaTOxFJmzC";
	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function(response) {
		console.log(response);
		$("#searchImages").empty();
		var results = response.data;
		for (var i = 0; i < results.length; i++) {
			if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
				var div = $("<div>");
				var rating = results[i].rating;
				var p = $("<p>").text("Rating: " + rating);
				var image = $("<img>");
				image.addClass("image pause");
				image.attr("src", results[i].images.fixed_height_still.url);
				div.append(p);
				div.append(image);
				$("#searchImages").prepend(div);
			}
		}
	});
}

$("#searchBtn").on("click", function(event) {
	event.preventDefault();
	var searchTerm = $("#searchText")
		.val()
		.trim();
	gifArr.push(searchTerm);
	createBtn();
	console.log(gifArr);
});

$(document).on("click", ".btn", results);

createBtn();

$(document).on("click", ".image", function() {
	var src = $(this).attr("src");
	if ($(this).hasClass("playing")) {
		$(this).attr("src", src.replace(/\.gif/i, "_s.gif"));
		$(this).removeClass("playing");
	} else {
		$(this).addClass("playing");
		$(this).attr("src", src.replace(/\_s.gif/i, ".gif"));
	}
});
