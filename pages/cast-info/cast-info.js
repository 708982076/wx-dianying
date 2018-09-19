// pages/cast-info/cast-info.js
var app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		showIntro : false,
		cast: null
	},
	openFold() {
		if (this.data.showIntro) {
			this.setData({ showIntro: false });
		} else {
			this.setData({ showIntro: true });
		}
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
		var url = app.globalData.url + app.globalData.castInfoUrl + options.castId;
		wx.showLoading({
			title: '加载中',
		});
		wx.request({
			url,
			method: 'GET',
			header: {'content-type' : 'json'},
			success: suc => {
				console.log(suc)
				var data = suc.data,
					professions = data.professions || '演员 / 导演 / 制片',
					birthday = data.birthday || '1978-02-17';
				data = { ...data, professions, birthday};
				this.setData({ cast: data});
			},
			fail: e => console.log(e),
			complete: () => wx.hideLoading()
		})

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