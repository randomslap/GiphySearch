var imageArr = ["Nissan", "Ford", "Mazda", "Mclaren", "Chevy"];
function createBtn() {
	$("#searchButtons").empty();
	for (var i = 0; i < imageArr.length; i++) {
		var a = $("<button>");
		a.addClass("btn");
		a.attr("data-input", imageArr[i]);
		a.text(imageArr[i]);
		$("#searchButtons").append(a);
	}
}
function getResults() {
	var search = $(this).attr("data-input");
	var queryURL =
		"http://api.giphy.com/v1/gifs/search?q=" +
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
				var gifDiv = $("<div>");
				var rating = results[i].rating;
				var p = $("<p>").text("Rating: " + rating);
				var image = $("<img>");
				image.addClass("image pause")
                image.attr("src", results[i].images.fixed_height_still.url);
				gifDiv.append(p);
				gifDiv.append(image);
				$("#searchImages").prepend(gifDiv);
			}
		}
	});
}

$("#searchBtn").on("click", function(event) {
	event.preventDefault();
	var search = $("#searchText")
		.val()
		.trim();
	imageArr.push(search);
	createBtn();
	console.log(imageArr);
});

$(document).on("click", ".btn", getResults);

createBtn();

$(document).on("click", ".image", function() {
    var src = $(this).attr("src")
    if ($(this).hasClass('playing')) {
        $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
        $(this).removeClass('playing');
    } else {
        //play
        $(this).addClass('playing');
        $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
    }
});

