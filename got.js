var gotApp = function(){

var fs = require('fs');


gotApp.setStarRating = function(rate){
	var stars = "";
	var numberofstars = Math.round(rate);
	for (var i = 1; i<= numberofstars; i ++){
		stars += '*';
	}
	return stars;
};

gotApp.isJon = function(description){
	var jon = description.indexOf("Jon Snow");	
	var output = "";
	if (jon !== -1){ output = " Jon is here!";}
	return output;
};

gotApp.showEpisode = function(episode){
		console.log('Title: ' + episode.title + gotApp.isJon(episode.description) + ' Episode #:' + episode.episode_number + "\r\n" + 
			episode.description + "\r\n" + 
			'Rating: ' + episode.rating + " "  + gotApp.setStarRating(episode.rating) + "\r\n");
};

gotApp.showAllEpisodes = function(episodes){
var sortedEpisodes = episodes.sort(function(a, b){
  return parseInt(a.episode_number) - parseInt(b.episode_number);
});
	episodes.forEach(function (episode) {
		gotApp.showEpisode(episode);

	});
};

gotApp.showFilteredEpisodes = function(episodes){
var sortedEpisodes = episodes.sort(function(a, b){
  return parseInt(a.episode_number) - parseInt(b.episode_number);
});
	episodes.forEach(function (episode) {
		if (episode.rating >= 8.5){
			gotApp.showEpisode(episode);
		}
	});
};

gotApp.fileActions = function(err, file){ 
    if (err) {
        throw err;
    }
    var episodes = JSON.parse(file);
    gotApp.showAllEpisodes(episodes);
};

gotApp.fileFilteredActions = function(err, file){ 
    if (err) {
        throw err;
    }
    var episodes = JSON.parse(file);
    gotApp.showFilteredEpisodes(episodes);
};


fs.readFile("./GoTEpisodes.json", 'utf8', gotApp.fileActions);
//fs.readFile("./GoTEpisodes.json", 'utf8', gotApp.fileFilteredActions);

};

gotApp();
