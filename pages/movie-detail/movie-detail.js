// pages/movie-detail/movie-detail.js
var app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		movieDesc: null,
		showIntro: false
	},
	toCastDetail(e){
		var castId = e.currentTarget.dataset.castId;
		wx:wx.navigateTo({
			url: '../cast-info/cast-info?castId=' + castId
		})
	},
	openFold(){
		if (this.data.showIntro){
			this.setData({ showIntro : false});
		}else{
			this.setData({ showIntro: true });
		}
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var url = app.globalData.url + app.globalData.movieDetail + options.id;
		wx.showLoading({
			title: '加载中',
		})
		wx.request({
			url,
			method: 'GET',
			header: {'content-type': 'json'},
			success: suc => {
				console.log(suc);
				var data = suc.data,
					desc = data.year + ' / ' + data.genres.join(' / '),
					aka = data.aka.join(' / '),
					countries = data.countries.join(' / ');
				data = { ...data, desc, aka, countries}
				this.setData({movieDesc: data});
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