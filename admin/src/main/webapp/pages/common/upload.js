function Upload() {
	this.init();
}
(function () {
	Upload.prototype = {
		total:70,
		init:function () {
			CUpload.init("attachmentIDs", "xls,doc,docx,xlsx,pdf,txt,jpg,jpeg,png,gif,pdf,flv");
		},
		exec:function () {
			var attachments = CUpload.getAttachmentByIDs($("#attachmentIDs").val());
			var dom = "";
			for(var i=0;i<attachments.length;i++){
				var url = CUpload.getAttachmentUrl(attachments[i]);
				if(CUpload.isVideo(url)){
					dom += CCore.getVideo(url);
				}
				if(CUpload.isImage(url)){
					dom += String.format("<img src='{0}' alt='{1}'/>",url,attachments[i].fileName);
				}
				if(CUpload.isAttachment(url)){
					dom += String.format("<a href='{0}' target='_blank'>{1}</a>",url,attachments[i].fileName);
				}
			}
			editor.execCommand('inserthtml',dom);
		}
	};
})();