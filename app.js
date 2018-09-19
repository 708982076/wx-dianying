//app.js
App({
  onLaunch: function () {
  },
  globalData: {
	url: 'http://localhost/',
	inTheatersUrl: '/v2/movie/in_theaters',
	comingSoonUrl: '/v2/movie/coming_soon',
	movieDetail: '/v2/movie/subject/',
	castInfoUrl: '/v2/movie/celebrity/'
  },
  toMovieDetail(e){
	console.log(e);  
  }
})