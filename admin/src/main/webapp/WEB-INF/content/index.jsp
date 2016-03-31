<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/content/common/var.jsp"%>
<%
	pageContext.setAttribute("currentPath", "/index");
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
		<h3></h3>
	</div>
	<!-- page heading end-->
	<!--body wrapper start-->
	<div class="wrapper">...</div>
	<!--body wrapper end-->
	<%@ include file="/WEB-INF/content/common/mainend.jsp"%>
	<%@ include file="/WEB-INF/content/common/js.jsp"%>
	<!-- user js here -->
</body>
</html>