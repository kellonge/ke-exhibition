<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<section>
	<!-- left side start-->
	<div class="left-side sticky-left-side">
		<!--logo and iconic logo start-->
		<div class="logo">
			<a href="${path}/index"><img src="${path}/static/img/logo.png" alt=""></a>
		</div>
		<div class="logo-icon text-center">
			<a href="${path}/index"><img src="${path}/static/img/logo_icon.png" alt=""></a>
		</div>
		<!--logo and iconic logo end-->
		<div class="left-side-inner">
			<!-- visible to small devices only -->
			<div class="visible-xs hidden-sm hidden-md hidden-lg">
				<div class="media logged-user">
					<img alt="" src="${path}/static/img/photos/user-avatar.png" class="media-object">
					<div class="media-body">
						<h4>
							<a href="#">Admin</a>
						</h4>
					</div>
				</div>
				<ul class="nav nav-pills nav-stacked custom-nav">
					<li><a href="#"><i class="fa fa-sign-out"></i> <span>退出</span></a></li>
				</ul>
			</div>
			<!--sidebar nav start-->
			<ul class="nav nav-pills nav-stacked custom-nav">
				<li class="<c:if test="${currentPath =='/index'}">active</c:if>"><a href="${path}/index"><i class="fa fa-home"></i> <span>首页</span></a></li>
				<li class="<c:if test="${currentPath =='/event/list'}">active</c:if>"><a href="${path}/event/list"><i class="fa fa-flag"></i> <span>展览管理</span></a></li>
				<li class=""><a href="${path}/index"><i class="fa fa-building-o"></i> <span>展馆管理</span></a></li>
				<li class=""><a href="${path}/index"><i class="fa fa-folder"></i> <span>字典管理</span></a></li>
			</ul>
			<!--sidebar nav end-->
		</div>
	</div>
	<!-- left side end-->
	<!-- main content start-->
	<div class="main-content">
		<!-- header section start-->
		<div class="header-section">
			<!--toggle button start-->
			<a class="toggle-btn"><i class="fa fa-bars"></i></a>
			<!--toggle button end-->
			<!--notification menu start -->
			<div class="menu-right">
				<ul class="notification-menu">
					<li><a href="#" class="btn btn-default dropdown-toggle" data-toggle="dropdown"> <img src="${path}/static/img/photos/user-avatar.png" alt="" /> Admin <span class="caret"></span>
					</a>
						<ul class="dropdown-menu dropdown-menu-usermenu pull-right">
							<li><a href="#"><i class="fa fa-sign-out"></i> 退出</a></li>
						</ul></li>
				</ul>
			</div>
			<!--notification menu end -->
		</div>
		<!-- header section end-->