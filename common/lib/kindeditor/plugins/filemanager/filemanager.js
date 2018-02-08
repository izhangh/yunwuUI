/*******************************************************************************
* KindEditor - WYSIWYG HTML Editor for Internet
* Copyright (C) 2006-2011 kindsoft.net
*
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence http://www.kindsoft.net/license.php
*******************************************************************************/

KindEditor.plugin('filemanager', function(K) {
	var self = this, name = 'filemanager',
		fileManagerJson = K.undef(self.fileManagerJson, self.basePath + 'php/file_manager_json.php'),
		imgPath = self.pluginsPath + name + '/images/',
		lang = self.lang(name + '.');
	self.plugin.filemanagerDialog = function(options) {
		var width = K.undef(options.width, 650),
			height = K.undef(options.height, 510),
			dirName = K.undef(options.dirName, ''),
			viewType = K.undef(options.viewType, 'VIEW').toUpperCase(), // "LIST" or "VIEW"
			clickFn = options.clickFn;
		var html = [
			'<div style="padding:10px 20px;">',
			// header start
			'<div class="ke-plugin-filemanager-header">',
			// left start
			'<div class="ke-left">',
            '<input type="text" name="keysInput" value="">',
            '<button name="searchButton">搜索</button>&nbsp;',
            lang.viewType + ' <select class="ke-inline-block" name="viewType">',
            '<option value="VIEW">' + lang.viewImage + '</option>',
            '<option value="LIST">' + lang.listImage + '</option>',
            '</select>&nbsp;',
            lang.orderType + ' <select class="ke-inline-block" name="orderType">',
            '<option value="id">' + lang.fileDatetime + '</option>',
            '<option value="name">' + lang.fileName + '</option>',
            '<option value="size">' + lang.fileSize + '</option>',
            '<option value="type">' + lang.fileType + '</option>',
            '</select>&nbsp;',
			'</div>',
			// right start
			'<div class="ke-right">',
            '<a class="ke-inline-block" name="prevPage" href="javascript:;"><img src="' + imgPath + 'go-left.gif" width="16" height="16" border="0" alt="" /> ' + lang.prevPage + '</a>&nbsp;',
            '<a class="ke-inline-block" name="nextPage" href="javascript:;"><img src="' + imgPath + 'go-right.gif" width="16" height="16" border="0" alt="" /> ' + lang.nextPage + '</a>',
			'</div>',
			'<div class="ke-clearfix"></div>',
			'</div>',
			// body start
			'<div class="ke-plugin-filemanager-body"></div>',
            '</div>'
		].join('');
		var dialog = self.createDialog({
			name : name,
			width : width,
			height : height,
			title : self.lang(name),
			body : html
		}),
		div = dialog.div,
		bodyDiv = K('.ke-plugin-filemanager-body', div),
        searchButton = K('[name="searchButton"]', div),
        keysInput = K('[name="keysInput"]', div),
		viewServerBtn = K('[name="viewServer"]', div),
		viewTypeBox = K('[name="viewType"]', div),
        orderTypeBox = K('[name="orderTypeBox"]', div),
        prevPage = K('[name="prevPage"]', div),
        nextPage = K('[name="nextPage"]', div);
		function reloadPage(order, keys, func, page) {
			var param = 'order=' + order + '&dir=' + dirName + '&keys=' + keys + '&page=' + page;
			dialog.showLoading(self.lang('ajaxLoading'));
			K.ajax(K.addParam(fileManagerJson, param + '&' + new Date().getTime()), function(data) {
				dialog.hideLoading();
				func(data);
			});
		}
		var elList = [];
		function bindEvent(el, result, data, createFunc) {
			var fileUrl = data.filepath;
			if (data.is_photo) {
				el.click(function(e) {
					clickFn.call(this, fileUrl, data.filename);
				});
			} else {
				el.click(function(e) {
					clickFn.call(this, fileUrl, data.filename);
				});
			}
			elList.push(el);
		}
		function createCommon(result, createFunc) {
			// remove events
			K.each(elList, function() {
				this.unbind();
			});
            searchButton.unbind();
			viewTypeBox.unbind();
            orderTypeBox.unbind();
            prevPage.unbind();
            nextPage.unbind();
			// add events
			function changeFunc() {
                reloadPage(orderTypeBox.val(), keysInput.val(), viewTypeBox.val() == 'VIEW' ? createView : createList, result.page);
			}
            searchButton.click(changeFunc);
			viewTypeBox.change(changeFunc);
            orderTypeBox.change(changeFunc);
            //没有上一页隐藏按钮
            if(result.page - 1 < 1) {
                prevPage.hide();
            } else { //有上一页显示翻页按钮
                prevPage.show().css('display', 'inline-block');
                prevPage.click(function() {
                    if(result.page - 1 < 1) {
                        alert('现在已经是第一页！没有上一页了！');
                    } else {
                        reloadPage(orderTypeBox.val(), keysInput.val(), viewTypeBox.val() == 'VIEW' ? createView : createList, result.page - 1);
                    }
                });
            }
            //没有下一页隐藏按钮
            if(result.page + 1 > result.totalPage) {
                nextPage.hide();
            } else { //有下一页显示翻页按钮
                nextPage.show().css('display', 'inline-block');
                nextPage.click(function() {
                    if(result.page + 1 > result.totalPage) {
                        alert('现在已经是最后一页！没有下一页了！');
                    } else {
                        reloadPage(orderTypeBox.val(), keysInput.val(), viewTypeBox.val() == 'VIEW' ? createView : createList, result.page + 1);
                    }
                });
            }
			bodyDiv.html('');
		}
		function createList(result) {
			createCommon(result, createList);
			var table = document.createElement('table');
			table.className = 'ke-table';
			table.cellPadding = 0;
			table.cellSpacing = 0;
			table.border = 0;
			bodyDiv.append(table);
			var fileList = result.file_list;
			for (var i = 0, len = fileList.length; i < len; i++) {
				var data = fileList[i], row = K(table.insertRow(i));
				row.mouseover(function(e) {
					K(this).addClass('ke-on');
				})
				.mouseout(function(e) {
					K(this).removeClass('ke-on');
				});
				var iconUrl = imgPath + 'file-16.gif',
					img = K('<img src="' + iconUrl + '" width="16" height="16" alt="' + data.filename + '" align="absmiddle" />'),
					cell0 = K(row[0].insertCell(0)).addClass('ke-cell ke-name').append(img).append(document.createTextNode(' ' + data.filename + '.' + data.fileext));
                row.css('cursor', 'pointer');
                cell0.attr('title', data.filename);
                bindEvent(cell0, result, data, createList);
				K(row[0].insertCell(1)).addClass('ke-cell ke-size').html(Math.ceil(data.filesize / 1024) + 'KB');
				K(row[0].insertCell(2)).addClass('ke-cell ke-datetime').html(data.datetime);
			}
		}
		function createView(result) {
			createCommon(result, createView);
			var fileList = result.file_list;
			for (var i = 0, len = fileList.length; i < len; i++) {
				var data = fileList[i],
					div = K('<div class="ke-inline-block ke-item"></div>');
				bodyDiv.append(div);
				var photoDiv = K('<div class="ke-inline-block ke-photo"></div>')
					.mouseover(function(e) {
						K(this).addClass('ke-on');
					})
					.mouseout(function(e) {
						K(this).removeClass('ke-on');
					});
				div.append(photoDiv);
				var fileUrl = data.filepath,
					iconUrl = data.is_photo ? fileUrl : imgPath + 'file-64.gif';
				var img = K('<img src="' + iconUrl + '" width="80" height="80" alt="' + data.filename + '" />');
                photoDiv.css('cursor', 'pointer');
                photoDiv.attr('title', data.filename + '.' + data.fileext + ' (' + Math.ceil(data.filesize / 1024) + 'KB, ' + data.datetime + ')');
                bindEvent(photoDiv, result, data, createView);
				photoDiv.append(img);
				div.append('<div class="ke-name" title="' + data.filename + '">' + data.filename + '</div>');
			}
		}
		viewTypeBox.val(viewType);
		reloadPage(orderTypeBox.val(), keysInput.val(), viewTypeBox.val() == 'VIEW' ? createView : createList, '1');
		return dialog;
	}
});
