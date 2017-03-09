(function($){
	var lightBox=function(){
		var self=this;
		this.view=$('<div class="mask">');
		this.bodyName=$(document.body);
		this.pic_view=$('<div class="pic-view">');
		//加载弹出层
		this.loadWeb();
		this.pic=$(".tupian");
		this.captions=$('.pic-caption');
		this.p=this.captions.find('p');
		this.h3=this.captions.find('h3');
		this.groupName=null;
		this.groupData=[];

		this.bodyName.on('click', '.lightbox', function() {
			var currentGroup=$(this).attr('data-group');
			   if (currentGroup!=self.groupName) {
			   	   self.groupName=currentGroup;
			   	   //获取组别数据
			   	   self.getGroup();
   
			   } 
			   //初始化窗口
			   self.pic.hide();
			   self.captions.hide();
			   	   self.initial($(this));
			   	 

		});
		this.view.click(function(event) {
			self.view.fadeOut();
			self.pic_view.animate({top:"-2000px"});

		}); 
		self.flag=true;
		this.pic.on('click',function(e) {
			// self.flag=true;
			event.preventDefault();
			if (e.pageX<700) {
				if(self.flag){
					
				//切换动画
			self.goto('back');

		          }	
			} else if (e.pageX>700) {
				if(self.flag){
					
				self.goto('next');
				
			      }
			} 			
		});
	};

	lightBox.prototype={
		//加载弹出层
		loadWeb:function(){
			var str='<img class="tupian" src="">'+
					         '<div class="pic-caption">'+
					         	'<h3>这是个图片的描述</h3>'+
					         	'<p>0 of 0</p>'+
					         '</div>'+	
				         '</div>';
            this.pic_view.html(str);
			this.bodyName.append(this.view,this.pic_view);
		},
		//获取组别数据
		getGroup:function(){
			var self=this,
			    groupList=self.bodyName.find("*[data-group="+this.groupName+"]");
			    self.groupData=[];
			    groupList.each(function() {
			    	self.groupData.push({
			    		src:$(this).attr('data-source'),
			    		id:$(this).attr('data-id'),
			    		caption:$(this).attr('data-caption')
			    	})	
			    }); 

		},
		//初始化窗口
		initial:function(obj){
			var self=this,
			    pic_source=obj.attr('data-source'),
			    pic_id=obj.attr('data-id'),
			    pic_caption=obj.attr('data-caption'),
			    winWidth=$(window).width(),
			    winHeight=$(window).height();
			   
	            self.pic.attr("src","");
	            self.pic.attr("src",pic_source);
				this.view.fadeIn();
				this.pic_view.css({width:winWidth/2,height:winHeight/2,marginLeft:-(winWidth/2)/2}).
				animate({top:(winHeight/2)/2},1000,function(){
				  //原始图片大小
				  self.originPic(pic_id,pic_caption)
					
			});
		},
		//切换动画
		goto:function(dir){
			if(dir==='back'){
				if (this.index>0) {
			var srcId=this.groupData[this.index-1].id,
			    srccap=this.groupData[this.index-1].caption,
			    srcS=this.groupData[this.index-1].src;
			    this.originPic(srcId,srccap,srcS);
			 }else{alert('已经是第一张啦！！')}
			}else if(dir==='next'){
				if (this.index<this.groupData.length-1) {
			var srcId=this.groupData[this.index+1].id,
			    srccap=this.groupData[this.index+1].caption,
			    srcS=this.groupData[this.index+1].src;
			    this.originPic(srcId,srccap,srcS);
						}else{alert('已经是最后一张啦！！')}
			}
		
		},
		//原始图片大小
		originPic:function(srcid,srcCap,pic_sou){
			var self=this;
			 self.pic.attr("src",pic_sou);
				 self.pic.css({
				 	width: 'auto',
				 	height: 'auto'
				 }).fadeOut();
				 self.captions.fadeOut();

				var srcW=self.pic.width(),
				    srcH=self.pic.height();

			//高度，宽度过滤
			var winWidth=$(window).width(),
			    winHeight=$(window).height(),
			    scale=Math.min(winWidth/srcW,winHeight/srcH,1),
			    aWidth=srcW*scale,
			    aHeight=srcH*scale,
			    topH=(winHeight-aHeight)/2;
			self.pic_view.css({
				top:topH,
				width:aWidth,
				height:aHeight,
				marginLeft:-aWidth/2
			}).fadeIn();
			self.pic.css({width:aWidth,height:aHeight}).fadeIn();
			self.captions.fadeIn();
			self.p.text('索引：'+srcid+' of '+self.groupName+'组');
			self.h3.text(srcCap);
			$(self.groupData).each(function(i) {			
				if (srcid===this.id) {
					self.index=i;
					return false;
				} 	
				return self.index;
			});


		}
	};
	window["lightBox"]=lightBox;
})(jQuery);
new lightBox;