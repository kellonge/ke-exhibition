<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/content/common/var.jsp"%>
<%
	pageContext.setAttribute("currentPath", "/event/list");
%>
<!DOCTYPE HTML>
<html>
<head>
<%@ include file="/WEB-INF/content/common/head.jsp"%>
<style type="text/css">
</style>
</head>
<body class="sticky-header">
	<%@ include file="/WEB-INF/content/common/mainbegine.jsp"%>
	<!-- page heading start-->
	<div class="page-heading">
		<h3>展览管理</h3>
		<ul class="breadcrumb">
			<li><a href="${path}/index">首页</a></li>
			<li class="active">展览管理</li>
		</ul>
	</div>
	<!-- page heading end-->
	<!--body wrapper start-->
	<div class="wrapper">
		<div class="panel panel-default">
			<div class="panel-body">
				<div style="padding: 10px 0px 20px 0px">
					<form class="form-inline" role="form">
						<div class="form-group">
							<label for="keyword">关键字</label> <input type="text" class="form-control" id="keyword" name="cityName" placeholder="输入关键词">
						</div>
						<div class="form-group">
							<label for="keyword">城市</label> <select class="form-control" id="cityID" name="cityID">
								<option>全部</option>
								<c:forEach items="${pageData.citys }" var="city">
									<option value="${city.id }">${city.name }</option>
								</c:forEach>
							</select>
						</div>
						<div class="form-group">
							<label for="keyword">发布状态</label> <select class="form-control" id="cityID" name="cityID">
								<option>全部</option>
								<option value="1">已发布</option>
								<option value="0">未发布</option>
							</select>
						</div>
						<button type="submit" class="btn btn btn-default">搜索</button>
					</form>
				</div>
				<table class="table table-bordered" id="event-table">
					<thead>
						<tr>
							<th>名称</th>
							<th>城市</th>
							<th>开始时间</th>
							<th>状态</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						<c:forEach items="${pageData.events.row }" var="event">
							<tr>
								<td>${event.eventName }</td>
								<td>${event.cityID }</td>
								<td>Win 95+</td>
								<td>4</td>
								<td>X</td>
							</tr>
						</c:forEach>
					</tbody>
				</table>
				<div style="text-align: right;">
					<ul class="pagination">
						<li><a href="#">«</a></li>
						<li><a href="#">1</a></li>
						<li><a href="#">2</a></li>
						<li><a href="#">3</a></li>
						<li class="active"><a href="#">4</a></li>
						<li><a href="#">5</a></li>
						<li><a href="#">»</a></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<!--body wrapper end-->
	<%@ include file="/WEB-INF/content/common/mainend.jsp"%>
	<%@ include file="/WEB-INF/content/common/js.jsp"%>
	<!-- user js here -->
</body>
</html>