// pages/more-movie/more-movie.js
var app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		showInTheaters: true,
		showComingSoon: false,
		theaters: {},
		comingsoon: {},
		movies: []
	},
	tabTitle(e) {
		var typeId = e.currentTarget.dataset.typeId;
		this.changeData(typeId);
		if (!this.data[typeId].movies) {
			this.getMovieList(typeId);
		}
	},
	changeData(typeId) {
		if (typeId === 'theaters') {
			this.setData({ showComingSoon: false, showInTheaters: true });
		} else if (typeId === 'comingsoon'){
			this.setData({ showComingSoon: true, showInTheaters: false });
		}
	},
	loadMore(){
		var typeId;
		if (this.data.showInTheaters){
			typeId = 'theaters'
		} else if (this.data.showComingSoon){
			typeId = 'comingsoon'
		}
		this.getMovieList(typeId);
	},
	getMovieList(typeId) {
		var url,
			offset = this.data[typeId].offset || 0,
			total = this.data[typeId].total || 999,
			movies = this.data[typeId].movies || [];
		if (offset >= total) {
			return;
		}
		if (typeId === 'theaters') {
			url = app.globalData.url + app.globalData.inTheatersUrl;
		} else if (typeId === 'comingsoon') {
			url = app.globalData.url + app.globalData.comingSoonUrl;
		}
		wx.showLoading({
			title: '加载中'
		})
		wx.request({
			url,
			method: 'GET',
			header: { 'content-type': 'json' },
			data: {
				start: offset,
				count: 5
			},
			success: (suc) => {
				var data = suc.data;
				total = data.total;
				offset += data.subjects.length;
				
				data.subjects.forEach(item => {
					var genres = item.genres.map(item => item).join(' / '),
						directors = item.directors.map(item => item.name).join(' / '),
						casts = item.casts.map(item => item.name).join(' / ');
					movies.push({
						...item,
						genres,
						directors,
						casts,
						typeId
					})
				})
				this.setData({
					[typeId]: {
						movies,
						total,
						offset
					}
				})
			},
			fail: (e) => console.log(e),
			complete: () => wx.hideLoading()
		})
	}, 
	toMovieDetail(e) {
		var id = e.currentTarget.dataset.id;
		// 	url = app.globalData.url + movieDetail + id;
		wx.navigateTo({
			url: '../movie-detail/movie-detail?id=' + id,
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.changeData(options.typeId);
		this.getMovieList(options.typeId);
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})