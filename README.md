#云雾UI

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
