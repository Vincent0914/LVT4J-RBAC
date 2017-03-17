function loadAccesses(){
    if(!curPro) return alert('请先选择当前产品!');
    q('/edit/access/list.json',
        {
            proAutoId: curPro.autoId,
            keyword: $('#keyword').val(),
            pager: $('#accessesPager').pagerSerialize()
        },
        function(accesses){
            $('#accesses').html($tpl(tpl_accesses)(accesses));
            $('#editAccessDiv').slideUp();
            $('#accessesDiv').slideDown();
        },
        '加载访问项中'
    );
}

function addAccess() {
    $('#editAccessDiv').formData({});
    $('#testPatternUri').val('');
    $('#testPatternRst').text('');
    $('#editAccessDiv').slideDown().scrollToMe();
}

function sortAccess() {
    var autoIds = [];
    $('#accesses tr').each(function(){
        autoIds.push($(this).attrData().autoId);
    });
    if(autoIds.length==0) return alert('无排序内容!');
    q('/edit/access/sort.json',
        {
            autoIds: autoIds,
        },
        function(){
            alert('保存排序成功!');
        },
        '保存排序中'
    );
}

function editAccess(btn) {
    var access = $(btn).closest('tr').attrData();
    $('#editAccessDiv').formData(access);
    $('#testPatternUri').val('');
    $('#testPatternRst').text('');
    $('#editAccessDiv').slideDown().scrollToMe();
}

function testPattern() {
    q('/edit/access/patternMatch.json',
        {
            pattern: $('#pattern').val(),
            uri: $('#testPatternUri').val()
        },
        function(match){
            if(match) {
                $('#testPatternRst').removeClass('text-danger').addClass('text-info').text('匹配');
            } else {
                $('#testPatternRst').removeClass('text-info').addClass('text-danger').text('不匹配');
            }
        },
        '验证uri匹配pattern中'
    );
}

function editAccessSave() {
    var access = $('#editAccessDiv').formData();
    if(!access) return;
    try {
        new RegExp($('#pattern').val())
    } catch (e) {
        $('#editAccessDiv .valid-err').text('pattern不是一个正则表达式!');
        $('#pattern').focusMe();
        return;
    }
    access.proAutoId = curPro.autoId;
    q('/edit/access/set.json',
        access,
        function() {
            alert('保存成功!');
            loadAccesses();
        },
        '保存访问项中'
    );
}

function delAccess(btn) {
    var access = $(btn).closest('tr').attrData();
    if(!confirm('确定要删除访问项\npattern:'+access.pattern+'\n名称:'+access.name+'\n吗?')) return;
    q('/edit/access/del.json',
        {
            proAutoId: curPro.autoId,
            autoId: access.autoId
        },
        function(){
            alert('删除成功!');
            loadAccesses();
        },
        '删除访问项中'
    );
}

$(document).ready(ready);

function ready(){
    loadAccesses();
}

function tpl_accesses(accesses) {
    if(!accesses) return;
    for (var i = 0; i < accesses.length; i++) {
        var access = accesses[i];
        /*<tr data="{Tigh(access)}" title="{Tigh(access.des)}">
            <td class="sortabler-handler"><i class="ace-icon fa fa-arrows-v"></i></td>
            <td><div class="list-ele">{Tigh(access.pattern)}</div></td>
            <td><div class="list-ele">{Tigh(access.name)}</div></td>
            <td>
                <button onclick="editAccess(this)" type="button" class="btn btn-info btn-minier">编辑</button>
                <button onclick="delAccess(this)" type="button" class="btn btn-danger btn-minier">删除</button>
            </td>
        </tr>*/
    }
}