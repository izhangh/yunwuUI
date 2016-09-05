#云雾UI

##项目托管

* [Github代码托管](https://github.com/izhangh/yunwuUI "Github代码托管")

##兼容性

* IE8.0+, Chrome, Firefox, Safari。
* 本框架不适用于需要兼容IE6、7的开发者或使用者。一是因为Bootstrap3.2不支持，二是因为目前主流系统已是WIN7(IE8+)，三是带WebKit内核的浏览器大量出现，如360浏览器、搜狗浏览器、百度浏览器等。

##依赖项目

* [jQuery v1.11.3](http://api.jquery.com/ "jQuery v1.11.3")
* [jQuery-File-Upload](https://github.com/blueimp/jQuery-File-Upload/wiki "jQuery-File-Upload")
* [jQuery打印插件jqprint](http://www.jq22.com/jquery-info347 "jQuery打印插件jqprint")
* [tablesorter](http://tablesorter.com/docs/ "tablesorter")
* [Bootstrap v3.3.0](http://v3.bootcss.com/ "Bootstrap v3.3.0")
* [bootstrap-datetimepicker](http://www.bootcss.com/p/bootstrap-datetimepicker/ "bootstrap-datetimepicker")
* [bootstrap-select](http://silviomoreto.github.io/bootstrap-select/ "bootstrap-select")
* [BootstrapValidator](http://bv.doc.javake.cn/validators/ "BootstrapValidator")
* [Font Awesome v4.6.3](http://fontawesome.io/icons/ "Font Awesome v4.6.3")

##框架组件

###提示弹出框

```html
<!-- ConfirmModal begin -->
<div class="modal fade" id="ConfirmModal" tabindex="-1" role="dialog" aria-labelledby="ConfirmModalLabel">
    <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="btnClose">
                    <span aria-hidden="true"><i class="fa fa-times-circle"></i></span>
                </button>
                <h4 class="modal-title" id="ConfirmModalLabel">提示</h4>
            </div>
            <div class="modal-body text-center font20"></div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal" id="btnCancel">取消</button>
                <button type="button" class="btn btn-success" id="btnConfirm">确定</button>
            </div>
        </div>
    </div>
</div>
<!-- ConfirmModal end -->
```

点击按钮：
 * data-info 提示信息
 * data-objurl 删除调用地址

```html
<button class="btn btn-danger DelBtn" data-info="您确定要删除嘛?" data-objurl="">删除</button>
```

JS代码直接调用
```javascript
<script>
	/**
	 * 打开提示框
	 * 提示信息
	 * 是否显示按钮 0 不显示 1 显示
	 * 提示信息前的图标样式（font-awesome）
	 */
	confirmModalOpen('数据正在处理，请稍等...', '0', ' fa-spinner fa-spin ');

	/**
	 * 提示框提示信息修改
	 * 提示信息
	 * 提示信息前的图标样式（font-awesome）
	 */
	confirmModalInfo("操作失败", ' fa-check ');

	//关闭提示框
	confirmModalClose();
</script>
```

###左侧菜单

```html
<div class="menu_box" id="menuBar">
	<dl class="menu_list">
		<dt class="menu_title selected">
			<a href="index.html"><i class="fa fa-magic"></i>首页</a>
		</dt>
	</dl>
	<dl class="menu_list">
		<dt class="menu_title"><i class="fa fa-list"></i>功能列表</dt>
		<dd class="menu_item"><a href="base.html">基础实例</a></dd>
		<dd class="menu_item"><a href="form.html">表单控件</a></dd>
		<dd class="menu_item"><a href="document.html">使用文档</a></dd>
	</dl>
</div>
```
* 选中菜单添加样式`selected`

###面包屑导航

仅有一级导航示例
```html
<div class="page-header clearfix">
	<h3 class="pull-left nomargin">
		<i class='fa fa-gear'></i>表单控件
	</h3>
</div>
```
有一二级导航示例
```html
<div class="page-header clearfix">
	<h3 class="pull-left nomargin">
		<a href=""><i class='fa fa-gear'></i>基础实例</a> / 二级页面
	</h3>
	<!--如果页面无需搜索，添加按钮代码在此-->
	<button type="button" class="pull-right btn btn-success" data-toggle="modal" data-target="#HandleFormModal" data-action="add" data-backdrop="static" data-keyboard="false">添加按钮</button>
</div>
```

###提示信息

```html
<div class="bs-callout bs-callout-success" id="callout-type-b-i-elems">
	<h3>提示信息样式</h3>
	<p>1、绿色样式 bs-callout bs-callout-success</p>
	<p>2、蓝色样式 bs-callout bs-callout-info</p>
	<p>3、棕色样式 bs-callout bs-callout-warning</p>
	<p>4、红色样式 bs-callout bs-callout-danger</p>
</div>
```

###搜索框及添加按钮

```html
<div class="clearfix">
	<form class="form-horizontal" action="" method="POST">
		<div class="form-group">
			<div class="col-xs-6 col-sm-6 col-md-4">
				<input class="pull-left form-control" name="keys" id="keys" value="" placeholder="请输入关键字">
			</div>
			<div class="col-xs-2 col-sm-2 col-md-2 nopadding">
				<button type="submit" class="pull-left btn btn-primary">搜索</button>
			</div>
			<div class="col-xs-4 col-sm-4 col-md-3 col-md-offset-3 text-right">
				<button type="button" class="btn btn-success" data-toggle="modal" data-target="#HandleFormModal" data-action="add" data-backdrop="static" data-keyboard="false"><i class="fa fa-plus nomargin"></i>&nbsp;添加</button>
			</div>
		</div>
	</form>
</div>
```
###响应式表格列表

* 手机端隐藏某一列，添加样式 `hidden-xs`，参见[bootstrap响应式工具](http://v3.bootcss.com/css/#responsive-utilities "bootstrap响应式工具")

```html
<div class="table-responsive">
	<table class="table table-hover table-bordered table-advanced tablesorter tb-sticky-header">
		<thead>
		<tr>
			<th class="hidden-xs" width="40">#</th>
			<th>品种名称</th>
			<th class="hidden-xs">产地</th>
			<th width="150">操作</th>
		</tr>
		</thead>
		<tbody>
			<tr>
				<td class="hidden-xs">1</td>
				<td>党参</td>
				<td class="hidden-xs">甘肃兰州</td>
				<td>
					<button type="button" class="btn btn-success" data-toggle="modal" data-target="#HandleFormModal" data-obj="" data-whatever="@edit" data-action="edit" data-backdrop="static" data-keyboard="false">修改</button>
					<button class="btn btn-danger DelBtn" data-info="您确定要删除嘛?" data-objurl="">删除</button>
				</td>
			</tr>
		</tbody>
	</table>
</div>
```

###表单控件

```html
<form class="form-horizontal" id="HandleForm" name="HandleForm" action="" method="post">
	<div class="form-group">
		<label class="col-sm-2 col-md-offset-1 control-label">上传照片:</label>
		<div class="col-sm-6">
			<span class="btn btn-info fileinput-button">
				<i class="glyphicon glyphicon-plus"></i>
				<span>选择文件</span>
				<input id="fileupload" type="file" name="fileupload">
				<input type="hidden" name="pic" id="pic" value="">
			</span>
			<p style="display: inline-block;">只支持jpg、jpeg、png格式，大小不能超过100KB</p>
			<div id="progress" class="progress nomargin">
				<div class="progress-bar progress-bar-success progress-bar-striped"></div>
			</div>
			<div class="alert alert-danger nomargin" id="pic_tip_info" style="display:none;" role="alert"></div>
		</div>
	</div>
	<div class="form-group">
		<label class="col-sm-2 col-md-offset-1 control-label">输入框:</label>
		<div class="col-sm-6">
			<input type="text" class="form-control" name="" data-bv-field="" value="" />
		</div>
	</div>
	<div class="form-group">
		<label class="col-sm-2 col-md-offset-1 control-label">下拉框:</label>
		<div class="col-sm-6">
			<select name="" data-bv-field="" class="form-control selectpicker" data-live-search="true">
				<option value="" selected>汉族</option>
				<option value="" selected>苗族</option>
				<option value="" selected>藏族</option>
				<option value="" selected>维吾尔族族</option>
			</select>
		</div>
	</div>
	<div class="form-group">
		<label class="col-sm-2 col-md-offset-1 control-label">多选框:</label>
		<div class="col-sm-6">
			<label class="checkbox-inline">
				<input type="checkbox" name="" value=""> 选项一
			</label>
			<label class="checkbox-inline">
				<input type="checkbox" name="" value=""> 选项二
			</label>
		</div>
	</div>
	<div class="form-group">
		<label class="col-sm-2 col-md-offset-1 control-label">单选框1:</label>
		<div class="col-sm-6">
			<label class="radio-inline">
				<input type="radio" name="" value=""> 男
			</label>
			<label class="radio-inline">
				<input type="radio" name="" value=""> 女
			</label>
		</div>
	</div>
	<div class="form-group">
		<label class="col-sm-2 col-md-offset-1 control-label">单选框2:</label>
		<div class="col-sm-2">
			<div class="checkbox">
				<label class="nopadding">
					<input type="radio" name="img" value="default-user.jpg"> 默认头像
				</label>
				<img src="common/image/default-user.jpg" class="img-thumbnail" width="100%" alt="默认头像">
			</div>
		</div>
		<div class="col-sm-2">
			<div class="checkbox">
				<label class="nopadding">
					<input type="radio" name="img" value="default-male.jpg"> 我是帅哥
				</label>
				<img src="common/image/default-male.jpg" class="img-thumbnail" width="100%" alt="默认头像">
			</div>
		</div>
		<div class="col-sm-2">
			<div class="checkbox">
				<label class="nopadding">
					<input type="radio" name="img" value="default-female.jpg"> 我是美女
				</label>
				<img src="common/image/default-female.jpg" class="img-thumbnail" width="100%" alt="默认头像">
			</div>
		</div>
	</div>
	<div class="form-group">
		<label class="col-sm-2 col-md-offset-1 control-label">文本域:</label>
		<div class="col-sm-6">
			<textarea class="form-control" name="" style="resize:vertical;" data-bv-field=""></textarea>
		</div>
	</div>
	<div class="form-group">
		<label class="col-sm-2 col-md-offset-1 control-label">富文本编辑器:</label>
		<div class="col-sm-9">
			<textarea id="content" name="content" data-bv-field="content" style="width:100%;height:300px;"></textarea>
		</div>
	</div>
	<div class="form-group text-center">
		<div class="col-sm-8">
			<button type="submit" class="btn btn-success" data-loading-text="正在提交..." autocomplete="off">确认</button>
		</div>
	</div>
</form>
```

###上传插件
```html
<!--文件上传插件-->
<script src="common/lib/jquery/fileupload/jquery.ui.widget.js"></script>
<script src="common/lib/jquery/fileupload/jquery.iframe-transport.js"></script>
<script src="common/lib/jquery/fileupload/jquery.fileupload.js"></script>
```

```html
<span class="btn btn-info fileinput-button">
	<i class="glyphicon glyphicon-plus"></i>
	<span>选择文件</span>
	<input id="fileupload" type="file" name="fileupload">
	<input type="hidden" name="pic" id="pic" value="">
</span>
<p style="display: inline-block;">只支持jpg、jpeg、png格式，大小不能超过100KB</p>
<div id="progress" class="progress nomargin">
	<div class="progress-bar progress-bar-success progress-bar-striped"></div>
</div>
<div class="alert alert-danger nomargin" id="pic_tip_info" style="display:none;" role="alert"></div>
```

```javascript
$(document).ready(function() {
	/**
	 * ajax返回参数 data图片地址 info提示信息 status状态 200成功 其他失败
	 */
	$('#fileupload').fileupload({
		url: "",	//异步上传调用地址
		dataType: 'json',
		autoUpload: true,
		done: function (e, data) {
			$('#pic_tip_info').html(data.result.info).show();
			if(data.result.status == '200') {
				var path = data.result.data;
				$('#pic').val(path);
				$('#pic_img').attr('src', '' + path);
				$('#pic_div').show();
				$('#fileupload').fileupload('disable');
			} else {
				$('#fileupload').fileupload('enable');
				$('#fileupload').removeAttr('disabled');
			}
		},
		progressall: function (e, data) {
			var progress = parseInt(data.loaded / data.total * 100, 10);
			$('#progress .progress-bar').css('width', progress + '%');
		}
	}).prop('disabled', !$.support.fileInput).parent().addClass($.support.fileInput ? undefined : 'disabled');
})
```

###下拉框插件

参数请参照[bootstrap-select](http://silviomoreto.github.io/bootstrap-select/examples/ "bootstrap-select")

```html
<!--select下拉框美化-->
<link rel="stylesheet" href="common/lib/bootstrap/select/bootstrap-select.min.css">
<script src="common/lib/bootstrap/select/bootstrap-select.min.js"></script>
<script src="common/lib/bootstrap/select/bootstrap-select-zh_CN.min.js"></script>
```

```html
<select name="" data-bv-field="" class="form-control selectpicker" data-live-search="true">
	<option value="" selected>汉族</option>
	<option value="" selected>苗族</option>
	<option value="" selected>藏族</option>
	<option value="" selected>维吾尔族族</option>
</select>
```

###富文本编辑器 UMEditor

```html
<link href="common/lib/umeditor/themes/default/css/umeditor.css" type="text/css" rel="stylesheet">

<script type="text/javascript" src="common/lib/umeditor/umeditor.config.js"></script>
<script type="text/javascript" src="common/lib/umeditor/umeditor.js"></script>
<script type="text/javascript" src="common/lib/umeditor/lang/zh-cn/zh-cn.js"></script>
```

```html
<textarea id="content" name="content" data-bv-field="content" style="width:100%;height:300px;"></textarea>
```

```javascript
$(document).ready(function() {
    UM.getEditor('content');
})
```

###表单验证
参数请参照[BootstrapValidator](http://bv.doc.javake.cn/validators/ "BootstrapValidator")
```html
<script src="common/lib/bootstrap/validate/bootstrapValidator.min.js"></script>
<script src="common/lib/bootstrap/validate/zh_CN.js"></script>
```

```html
<input type="text" class="form-control" name="test" data-bv-field="test" value="test" />
```

```javascript
$('#HandleForm').bootstrapValidator({
	message: '您输入的信息有误，请仔细检查！',
	feedbackIcons: {
		valid: 'glyphicon glyphicon-ok',
		invalid: 'glyphicon glyphicon-remove',
		validating: 'glyphicon glyphicon-refresh'
	},
	fields: {
		test: {
			validators: {
				notEmpty: {
					message: '名字不能为空'
				}
			}
		}
	}
}).on('success.form.bv', function(e) {
	e.preventDefault();
	var $form = $(e.target);    //获取表单实例
	var bv = $form.data('bootstrapValidator');  //获取bootstrap实例
	//提示信息
	confirmModalOpen('数据正在处理，请稍等...', '0', ' fa-spinner fa-spin ');
	//ajax处理
	ajaxDo($form.attr('action'), $form.serialize(), "POST");
	if(ajaxReturnData.status == '200') {
		confirmModalInfo(ajaxReturnData.info, ' fa-check ');
		setTimeout(function() {
			window.location.replace(window.location.href);
		}, 1000);
	} else if(ajaxReturnData.status == '300') {
		confirmModalInfo(ajaxReturnData.info, '');
		setTimeout(function() {
			confirmModalClose();
		}, 1000);
	}
});
```
 
## 友好的开源协议

云雾UI遵循Apache2开源协议发布。Apache Licence是著名的非盈利开源组织Apache采用的协议，该协议和BSD类似，鼓励代码共享和尊重原作者的著作权，同样允许代码修改，再作为开源或商业软件发布。
