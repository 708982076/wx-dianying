// pages/search/search.js
var app = getApp();
Page({
	searchHref() {
		wx.navigateTo({
			url: '../search/search',
		})
	},
	toMoreMovie(e){
		var typeId = e.currentTarget.dataset.typeId;
		wx.navigateTo({
			url: '../more-movie/more-movie?typeId=' + typeId,
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
   * 页面的初始数据
   */
  data: {
	  inTheaters: [],
	  comingSoon: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  var theatersUrl = app.globalData.url + app.globalData.inTheatersUrl + '?start=0&count=10',
		  comingSoonUrl = app.globalData.url + app.globalData.comingSoonUrl + '?start=0&count=10';
	//   var theatersUrl = 'https://www.easy-mock.com/mock/5ad206e12589533dee1315fe/example/douban',
	// 	  comingSoonUrl = 'https://www.easy-mock.com/mock/5ad206e12589533dee1315fe/example/douban';
	  this.getMovieListData(
		[
			{
				url: theatersUrl,
				dataType: 'inTheaters'
			},
			{
				url: comingSoonUrl, 
				dataType: 'comingSoon'
			}
		]
	  );
  },
  getMovieListData(data){
	  wx.showLoading({
		  title: '加载中',
		  mask: true
	  })
	  new Promise((rejected, resolevd) => {
		  var flag = 0;
		  data.forEach((ele) => {
			  wx.request({
				  url: ele.url,
				  method: 'GET',
				  header: { 'content-type': 'json' },
				  success: (data) => this.setData({ [ele.dataType]: data.data.subjects }),
				  fail: () => console.error('error'),
				  complete: () => {
					  flag++;
					  if (flag === 2){
						  rejected()
					  }
				  }
			  })
		  })
	  }).then(() => wx.hideLoading());
	
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