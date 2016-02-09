<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%
	String path = request.getContextPath();
%>
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<link rel="stylesheet" href="<%=path%>/static/lib/pure/pure-min.css" type="text/css">
<link rel="stylesheet" href="<%=path%>/static/css/core.css" type="text/css">
<link rel="stylesheet" href="<%=path%>/static/css/event.css" type="text/css">
<title>九目</title>
<style type="text/css">
</style>
<script type="text/javascript">
	
</script>
</head>
<body>
	<div class="ke-top-wrap">
		<div class="ke-top-left"></div>
		<div class="ke-top-right">
			<a><img src="<%=path%>/static/img/my/icon-my.png"></a>
		</div>
	</div>
	<c:forEach items="${pageData.event}" var="event">
		<div class="ke-event-list">
			<div class="ke-event-list-img">
				<img src="${event.listImg}">
			</div>
			<div class="ke-event-list-title">${event.eventName }</div>
			<div class="ke-event-list-subtitle">${event.venueName}&nbsp;&nbsp;●&nbsp;&nbsp;${event.eventTypeName}</div>
			<div class="ke-event-list-tag">
				<div>
					<%= new Date() %>
					<fmt:formatDate value="${event.endTime}" pattern="MM月dd日" />
				</div>
				<div>${event.likeCnt}人喜欢</div>
				<div style="float: right;">
					<c:choose>
						<c:when test="${event.price<=0 }">免费</c:when>
						<c:otherwise>
							<fmt:formatNumber value="${event.price}" maxFractionDigits="0" />元</c:otherwise>
					</c:choose>
				</div>
			</div>
			<div class="clear"></div>
		</div>
	</c:forEach>
</body>
</html>