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
<body class="ke-event-view">
	<div class="ke-event-view-img">
		<img src="${pageData.event.eventImg}" width="100%">
	</div>
	<div style="background-color: white;">
		<div class="ke-event-view-title">${pageData.event.eventName}</div>
		<div class="ke-event-view-split"></div>
		<div class="ke-event-view-date">
			<fmt:formatDate value="${pageData.event.startTime}" pattern="yyyy.MM.dd" />
			-
			<fmt:formatDate value="${pageData.event.endTime}" pattern="yyyy.MM.dd" />
			<div class="ke-event-view-price">
				<c:choose>
					<c:when test="${pageData.event.price<=0 }">免费</c:when>
					<c:otherwise>
						<fmt:formatNumber value="${pageData.event.price}" maxFractionDigits="0" />元</c:otherwise>
				</c:choose>
			</div>
		</div>
		<div class="ke-event-view-split"></div>
		<div class="ke-event-view-address " onclick="window.location.href='${pageData.event.addressUrl}'" style="background: url('<%=path%>/static/img/event/icon-arrow-right.png')  no-repeat right center;     background-size: 10px;">${pageData.event.address}</div>
	</div>
	<div class="ke-event-view-desc">
		<img style="width: 200px; margin: 20px auto; display: block;" src="<%=path%>/static/img/event/event-detail-desc-title.png"> ${pageData.event.eventDesc}
	</div>
	<div class="ke-event-view-item-wrap">
		<c:forEach items="${pageData.event.attr }" var="leve1">
			<div class="ke-event-view-item">
				<p class="ke-event-view-item-title1">${leve1.name}</p>
				<ul>
					<c:forEach items="${leve1.list }" var="leve2">
						<li>
							<p class="ke-event-view-item-title2">${leve2.name }</p>
							<p class="ke-event-view-item-contetn">${leve2.content }</p>
						</li>
					</c:forEach>
				</ul>
			</div>
		</c:forEach>
	</div>

	<div class="ke-event-op">
		<table>
			<tr>
				<td width="50%" style="border-right: 1px solid white;"><span><img width="25px" src="<%=path%>/static/img/event/icon-like-big.png" /> <span>想去</span> </span></td>
				<td width="50%"><span><img width="25px" src="<%=path%>/static/img/event/icon-question.png" /> <span>想问</span> </span></td>
			</tr>
		</table>
	</div>
</body>
</html>