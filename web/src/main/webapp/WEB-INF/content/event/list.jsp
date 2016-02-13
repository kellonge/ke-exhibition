<%@page import="java.util.Date"%>
<%@page import="com.kellonge.exhibition.common.date.DateUtil"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="ke" uri="/WEB-INF/tag/elfunc.tld"%>
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
		<div class="ke-top-left" style="background: url('<%=path%>/static/img/event/icon-arrow-down.png') no-repeat right center;">${cityName}</div>
		<div class="ke-top-right">
			<a><img src="<%=path%>/static/img/my/icon-my.png"></a>
		</div>
	</div>
	<c:forEach items="${pageData.event}" var="event">
		<div class="ke-event-list">
			<div class="ke-event-list-click-wrap" onclick="window.location.href='<%=path%>/event/view?eventID=${event.eventID }'">
				<div class="ke-event-list-img">
					<img src="${event.listImg}">
				</div>
				<div class="ke-event-list-title">${event.eventName }</div>
				<div class="ke-event-list-subtitle">${event.venueName}&nbsp;&nbsp;●&nbsp;&nbsp;${event.eventTypeName}</div>
			</div>
			<div class="ke-event-list-tag">
				<div>
					<c:choose>
						<c:when test="${ke:dateCompareNow(event.endTime)>=0 }">
							<c:choose>
								<c:when test="${ke:dateCompareNow(event.startTime)>0 }">
									<fmt:formatDate value="${event.startTime}" pattern="开始于MM月dd日" />
								</c:when>
								<c:otherwise>
									<fmt:formatDate value="${event.endTime}" pattern="截止于MM月dd日" />
								</c:otherwise>
							</c:choose>
						</c:when>
						<c:otherwise>
							<fmt:formatDate value="${event.endTime}" pattern="结束于MM月dd日" />
						</c:otherwise>
					</c:choose>
				</div>
				<div>
					<img class="ke-event-list-tag-like" src="<%=path%>/static/img/event/icon-like-small.png">
					<c:choose>
						<c:when test="${event.likeCnt<=0}">1</c:when>
						<c:otherwise> ${event.likeCnt}</c:otherwise>
					</c:choose>
					人喜欢
				</div>
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