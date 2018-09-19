// pages/search/search.js
const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		resList: [],
		getMovie: 'v2/movie/search'
	},
	backIndex() {
		wx.navigateBack({
			url: '../index/index',
		})
	},
	toMovieDetail(e) {
		wx.navigateTo({
			url: '../movie-detail/movie-detail?id=' + e.currentTarget.dataset.id
		})
	},
	searchMovie(e) {
		let self = this;
		let value = e.detail.value;
		let url = app.globalData.url + this.data.getMovie;
		wx.request({
			url,
			method: 'GET',
			data: {
				q: value,
				start: 0,
				count: 10
			},
			header: { 'content-type': 'json' },
			success: (suc) => {
				this.deepSubjects(suc.data.subjects);
			}
		})
	},
	deepSubjects(json) {
		var resList = [];
		json.forEach(ele => {
			var image = ele.images.small,
				name = ele.title,
				rating = ele.rating.average,
				year = ele.year,
				directors = ele.directors.map((ele) => ele.name).join(' / '),
				desc = rating + '分 / ' + year + ' / ' + directors,
				id = ele.id;

			resList.push({
				id,
				image,
				name,
				desc
			})
		})
		this.setData({ resList });
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

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