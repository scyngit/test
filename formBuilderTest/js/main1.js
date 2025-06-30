$(document).ready(function () {
  //自定义字段属性
  const commonAttrs = {
    rowNumber: {
      label: '行号',
      value: '',
      type: 'number',
      style: "width: 75px; margin-left: 10px;"
      
    },
    colWidth: {
      label: '宽度',
      value: '',
      options: {
        '': '',
        'col-md-1': '1',
        'col-md-2': '2',
        'col-md-3': '3',
        'col-md-4': '4',
        'col-md-5': '5',
        'col-md-6': '6',
        'col-md-12': '满宽'
      },
      style: "width: 75px; margin-left:10px;"
    }
  };
  var options = {
    // controlPosition: 'left',
    i18n: { locale: 'zh-CN',
      override: {
        'zh-CN': {
          getStarted: '请从右边拖拽组件到此区域',
          header: '标题',
          paragraph: '说明文字',
          radioGroup: '单选',
          checkboxGroup: '多选',
          select: '下拉选择',
          dateField: '日期',
          text: '单行输入',
          textArea: '多行输入'
        }
      }
    },
    replaceFields: [
      {
        type: "checkbox-group",
        label: "多选",
        // values: [{ label: "Option 1", value: "" }],
        icon: "☑"
      },
      {
        type: "radio-group",
        label: "单选",
        icon: "⦿"
      }
    ],
    scrollToFieldOnAdd: true,  //自动向下滚动
    // enableColumnInsertMenu: true,
    // enableEnhancedBootstrapGrid: true,
    controlOrder: [      
      'header',
      'paragraph',
      'text',
      'textarea',
      'radio-group',
      'checkbox-group',
      'select',
      'date',
      'number',
      'camera',
      'button'
    ],
    
    // disabledActionButtons: ['data'],
    disableFields: ['autocomplete','file','hidden'],
    disabledFieldButtons: {
      'header': ['copy','sort'], 
      'paragraph': ['copy','sort'], 
      'text': ['copy','sort'], 
      'textarea': ['copy','sort'], 
      'radio-group': ['copy','sort'], 
      'checkbox-group': ['copy','sort'], 
      'select': ['copy','sort'], 
      'date': ['copy','sort'], 
      'number': ['copy','sort'], 
      'button': ['copy','sort']

    },    

    typeUserAttrs: {
            
       text: {...commonAttrs},

      // text: {
      //   rowNumber: {
      //     label: '行号',
      //     value: 0,
      //     type: 'text',
      //     style: "width: 75px; margin-left: 10px;",
      //     // attributes: {
      //     //   type: 'number',
      //     //   inputmode: 'numeric',
      //     //   pattern: '[0-9]*'
      //     // }
      //   }
      // },
      
      date: {...commonAttrs},

      number: {...commonAttrs},

      textarea: {...commonAttrs},

      select: {...commonAttrs},

      camera: {...commonAttrs},

      // camera: {
      //   rowNumber: {
      //     label: '行号',
      //     value: '',
      //     type: 'number'
      //   }
      // }

      // camera: {
      //   label: {
      //     label: '控件名称',
      //     type: 'text'
      //   },
      //   required: {
      //     label: '是否必填',
      //     type: 'checkbox'
      //   }
      // }

    },

    //自定义事件
    typeUserEvents: {
      text: {
        //text控件被添加（拖入）时触发回调
        onadd: function (fld) {
          options.fieldRowColControl(fld);
        }
      },

      date: {
        //date控件被添加（拖入）时触发回调
        onadd: function (fld) {
          options.fieldRowColControl(fld);
        }
      },

      number: {        
        onadd: function (fld) {
          options.fieldRowColControl(fld);
        }
      },

      textarea: {
        onadd: function (fld) {
          options.fieldRowColControl(fld);
        }
      },

      select: {
        onadd: function (fld) {
          options.fieldRowColControl(fld);
        }
      },

      camera: {
        onadd: function (fld) {
          options.fieldRowColControl(fld);
        }
      },
    },

    disabledAttrs: [ 'name', 'access', 'other', 'min', 'max', 'step'],
    //字段面板打开
    onOpenFieldEdit: function (editPanel) {
      options.removeRowColClass(editPanel);

      const labelMap = {
        'Display checkbox inline':'横向排列',
        'Display radio inline':'横向排列',
        'Inline':'选项排列',
        'Value': '默认值',
        'Rows':'初始行数'
      };
  
      editPanel.querySelectorAll('label').forEach(label => {
        const oldText = label.innerText.trim();
        if (labelMap[oldText]) {
          label.innerText = labelMap[oldText];
        }
      });
      
    },
    // fieldRemoveWarn: true,
    //拖入控件
    onAddFieldAfter: function(fieldId, fieldData) {
      console.log("拖入控件",fieldId,fieldData);

      //修改多行输入的 "初始行数" 属性值 = 3行
      if(fieldData.type === "textarea")
      {
        $('.fld-rows').val('3');
        $(`#${fieldId} .prev-holder textarea`).attr('rows', 3);
      }

      //渲染
      options.startRender();
    },
    //字段面板关闭
    onCloseFieldEdit: function(editPanel) {

      options.removeRowColClass(editPanel);

      //渲染
      options.startRender();
    },
    //保存
    onSave: function(evt, formData) {
      //console.log('data: ', formData);      

      const blob = new Blob([formData], { type: "application/json" }); // 创建 blob 文件
      const url = URL.createObjectURL(blob); // 生成临时 URL
      const a = document.createElement("a"); // 创建 a 标签
      a.href = url; // 设置下载地址
      a.download = "form.json"; // 指定下载文件名
      a.click(); // 模拟点击下载
      URL.revokeObjectURL(url); // 释放 URL 资源
    },
    //还原
    actionButtons: [{
      id: 'smile',
      className: 'btn btn-success',
      label: '还原',
      type: 'button',
      events: {
        click: function() {
          // alert('😁😁😁 !SMILE! 😁😁😁');
          $('#loadJson').click(); // 👈 模拟点击隐藏 input

          //const json = '[{"type":"text","required":false,"label":"妈的为什么不行","maxlength": 6,"rowNumber":1,"colWidth":"col-md-3","className":"form-control row-1 col-md-3","name":"text-1751007489892-0","subtype":"text"}]';

          //formBuilderInstance.actions.setData(json);
        }
      }
    }],
    //清除所有
    onClearAll: function(formData) {
      //渲染
      options.startRender();
    },

    //自定义现有控件（不是全新控件）
    fields: [
      {
        type: 'camera',
        label: '摄像头',
        icon: '<svg style="vertical-align: middle;" fill="#000000" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.00032"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M29 7h-4.599l-2.401-4h-12l-2.4 4h-4.6c-1 0-3 1-3 2.969v16.031c0 1.657 1.5 3 2.792 3h26.271c1.313 0 2.938-1.406 2.938-2.968v-16.032c0-1-1-3-3-3zM30 26.032c0 0.395-0.639 0.947-0.937 0.969h-26.265c-0.232-0.019-0.797-0.47-0.797-1v-16.031c0-0.634 0.851-0.953 1-0.969h5.732l2.4-4h9.802l1.785 3.030 0.55 0.97h5.731c0.705 0 0.99 0.921 1 1v16.032zM16 10c-3.866 0-7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zM16 22c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"></path> </g></svg>'
      },
    ],
    templates: {
      camera: function(fieldData) {
        //console.log('[阿诺] fieldData', fieldData);
        return {
          field: `<div id="${fieldData.id}"></div>`
        };
      }
    },

    //#region 用户函数

    //指定横向排列的行号和列宽
    fieldRowColControl: function(fld) {
      const rowInput = $('input.fld-rowNumber', fld);    //行号
      const colSelect = $('select.fld-colWidth', fld);   //宽度
      const classField = $('input.fld-className', fld);  //Class类名
      
      //console.log("[阿诺] fld-rowNumber",rowInput);
      //console.log("[阿诺] fld-className",classField);
      //console.log("[阿诺] fld-colWidth",colSelect);

      rowInput.attr({
        type: 'number',
        min: 1,
        max: 99,
        placeholder: '1-99'
      });

      //输入值在1-99
      rowInput.on('input', function () {
        let val = parseInt(this.value, 10);
        if (val > 99) {
          this.value = 99;
        } else if (val < 1 && this.value !== '') {
          this.value = 1;
        }
      });
      
      function updateClassName() {
        const rowVal = rowInput.val();  //row
        const colVal = colSelect.val();
        let rowClass = rowVal ? `row-${rowVal}` : '';

        const finalClass = ['form-control', rowClass, colVal].filter(Boolean).join(' ');
        //console.log("[阿诺] finalClass",finalClass);

        classField.val(finalClass).trigger('change');
      }

      rowInput.on('input', updateClassName);
      colSelect.on('change', updateClassName);

      updateClassName();

      const $rowGroup = $('input.fld-rowNumber', fld); //.css({'margin-left':'10px'}); //.closest('.form-group');
      const $colGroup = $('select.fld-colWidth', fld); //.closest('.form-group');
      const $labelRow = $rowGroup.closest('.input-wrap').prev('label').css({'text-align':'left','font-weight':'normal','width':'auto'});
      const $labelCol = $colGroup.closest('.input-wrap').prev('label').css({'text-align':'left','font-weight':'normal','width':'auto'});
      $rowGroup.removeClass('form-control');
      $colGroup.removeClass('form-control');
            
      //console.log("[阿诺] $labelRow",$labelRow);
      //console.log("[阿诺] $labelCol",$labelCol);
      // console.log("[阿诺] rowGroup",$rowGroup);
      // console.log("[阿诺] colGroup",$colGroup);
      
      const $formelements = $('.form-elements'); 
      const $options = $('<div class="form-group field-row-col-control"></div>');
      const $label = $('<label class="false-label">横向排列</label>');          
      const $optionswrap = $('<div class="sortable-options-wrap"></div>');    
      const $ol = $('<ol class="sortable-options ui-sortable">').css({'border-radius':'4px'});
      const $li = $('<li class="ui-sortable-handle">').css({'border-radius':'4px','cursor':'default'});
      const $wrap = $('<div class="form-row-wrap">').css({'display':'inline-block','margin-left':'9px','margin-right':'18px'});
      const $wrap1 = $('<div class="form-row-wrap">').css({'display':'inline-block'});
      const $descriptionWrap = $('.form-group.description-wrap', fld);

      // 把两个自定义属性放进去  
      $wrap.append($labelRow, $rowGroup);
      $wrap1.append($labelCol, $colGroup);
      $li.append($wrap,$wrap1);
      $ol.append($li);
      $optionswrap.append($ol);
      $options.append($label,$optionswrap);          
      $descriptionWrap.before($options); //插入在 "帮助信息”前面          

      $('.form-group.rowNumber-wrap').remove();
      $('.form-group.colWidth-wrap').remove();
    },

    //处理编辑时div class：移除 row-* 和 col-md-*
    removeRowColClass: function(editPanel) {
      // 获取字段 ID
      const fieldId = editPanel.getAttribute('data-field-id');
      if (!fieldId) return;

      // 找到对应的 .prev-holder
      const prevHolder = document.querySelector(`.prev-holder[data-field-id="${fieldId}"]`);
      if (!prevHolder) return;

      // 找到里面的 .formbuilder-text（也可以根据你的控件类型调整 class 选择器）
      const target = prevHolder.querySelector('[class*="formbuilder-"]');
      if (!target) return;

      //console.log("[阿诺] target",target);

      const classList = Array.from(target.classList);
      classList.forEach(cls => {
        if (/^row-\d+$/.test(cls) || /^col-md-\d+$/.test(cls)) {
          target.classList.remove(cls);
        }
      });
    },

    //渲染
    startRender: function() {
      const formData = formBuilderInstance.actions.getData('json'); // 获取表单结构 JSON 字符串
      //渲染
      $('#form-render').formRender({
        formData: formData,
        onRender: function() {
          //console.log("[阿诺] Rendered");
        }
      });
    }

    //#endregion

  };

  var formBuilderInstance = $('#form-builder').formBuilder(options);

  formBuilderInstance.promise.then(function(fb) {
    console.log("formBuilder加载完成");

    fbInstance = fb; // ✅ 真正的 formBuilder 实例，之后可以直接用

    //替换原来的提示信息（加入svg图片（用于文本内容只能转成base64））
    const styleContent = `
      .form-wrap.form-builder .stage-wrap.empty::after {
        content: url("data:image/svg+xml,%3Csvg xmlns:xlink='http://www.w3.org/1999/xlink' xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 15 15'%3E%3Cpath fill='%23616161' d='M661.792222,195.056432 L663.844218,197.438383 C663.961487,197.498558 664.03567,197.618907 664.03567,197.751295 L664.03567,198.448325 C664.03567,198.55665 663.921402,198.627857 663.824175,198.578715 L662.026788,196.442476 L662.026,202.029 L667.556532,202.029071 L665.418283,200.23467 C665.36914,200.136439 665.441353,200.020161 665.551662,200.020161 L666.249711,200.020161 C666.380101,200.020161 666.499431,200.094344 666.556617,200.211613 L668.946584,202.332781 C669.018797,202.479123 669.017791,202.651537 668.943568,202.796874 L666.561617,204.848871 C666.501442,204.96614 666.381093,205.040323 666.248705,205.040323 L665.551675,205.040323 C665.44335,205.040323 665.372143,204.926054 665.421285,204.828828 L667.557524,203.03144 L662.026,203.031 L662.026788,208.557524 L663.824175,206.421285 C663.907512,206.379163 664.00337,206.425461 664.029057,206.507765 L664.03567,206.551675 L664.03567,207.248705 C664.03567,207.354615 663.988193,207.452821 663.90916,207.518676 L663.844218,207.561617 L661.792222,209.943568 C661.675952,210.002947 661.542353,210.015466 661.418637,209.981126 L661.328129,209.946584 L659.20696,207.556617 C659.113145,207.510869 659.046905,207.425347 659.024162,207.326209 L659.015509,207.249711 L659.015509,206.551662 C659.015509,206.457111 659.100937,206.39055 659.187205,206.404409 L659.230018,206.418283 L661.024419,208.556532 L661.024,203.031 L655.442476,203.03144 L657.578715,204.828828 C657.620837,204.912165 657.574539,205.008022 657.492235,205.033709 L657.448325,205.040323 L656.751295,205.040323 C656.645385,205.040323 656.547179,204.992846 656.481324,204.913813 L656.438383,204.848871 L654.056432,202.796874 C653.997053,202.680605 653.984534,202.547006 654.018874,202.42329 L654.053416,202.332781 L656.443383,200.211613 C656.489131,200.117798 656.574653,200.051558 656.673791,200.028814 L656.750289,200.020161 L657.448338,200.020161 C657.542889,200.020161 657.60945,200.10559 657.595591,200.191858 L657.581717,200.23467 L655.443468,202.029071 L661.024,202.029 L661.024419,196.443468 L659.230018,198.581717 C659.131787,198.63086 659.015509,198.558647 659.015509,198.448338 L659.015509,197.750289 C659.015509,197.619899 659.089691,197.500569 659.20696,197.443383 L661.328129,195.053416 C661.474471,194.981203 661.646885,194.982209 661.792222,195.056432 Z' transform='translate(-654 -195)'%3E%3C/path%3E%3C/svg%3E") " 请从右边拖拽组件到此区域";
        /*
        display: block;
        text-align: center;
        */
        color: #666;
        font-size: 18px;
        /*
        line-height: 1.5;
        white-space: nowrap;
        */
      }
      .form-wrap.form-builder *[tooltip]:hover::after {
        background: #223e6c;
      }
      .form-wrap.form-builder *[tooltip]:hover::before {       
        border-color: #223e6c rgba(0,0,0,0);
      }
      .rendered-form *[tooltip]:hover::after {
        background: #223e6c;
      }
      .rendered-form *[tooltip]:hover::before {
        border-color: #223e6c rgba(0,0,0,0);
      }
    `;
    const styleTag = document.createElement('style');  //创建<style></style>元素
    styleTag.type = 'text/css';
    styleTag.appendChild(document.createTextNode(styleContent));
    //动态插入到<head>里，按照后插入覆盖先插入的规则，会覆盖原先的css，于css处于的在html文档中的物理位置无关
    //可适用于所有css的替换，特别是伪元素（不是DOM中的实际元素），所以只能用这种方式替换其css（js只能操作实际存在的元DOM素）
    document.head.appendChild(styleTag);
  });

  $('body').on("click", "#btnEdit", function() {
    switchToRenderMode(false);
  });

  $('body').on("click", "#btnSave", function() {
    
    const formData = formBuilderInstance.actions.getData('json'); // 获取表单结构 JSON 字符串

    const blob = new Blob([formData], { type: "application/json" }); // 创建 blob 文件
    const url = URL.createObjectURL(blob); // 生成临时 URL
    const a = document.createElement("a"); // 创建 a 标签
    a.href = url; // 设置下载地址
    a.download = "form.json"; // 指定下载文件名
    a.click(); // 模拟点击下载
    URL.revokeObjectURL(url); // 释放 URL 资源
  });

  $('#form-builder').on('sortstop', 'ul.frmb', function () {
    // console.log('字段顺序更新了！');

    //渲染
    options.startRender();
  });

  $('#form-builder').on('click', '.del-button', function(event) {
    event.preventDefault(); // 防止默认操作，比如链接跳转
    //console.log(`[阿诺] ${event.target.id.replace('del_','')} 被删除`);  //取得触发删除的元素的id
    const fieldId = event.target.id;    
    //console.log("[阿诺] 删除前: ",formBuilderInstance.actions.getData('json'));

    const builderDiv = document.querySelector('#form-builder');
    const observer = new MutationObserver(() => {
      const targetElement = builderDiv.querySelector(`#${fieldId}`);
      if (!targetElement) {        
        // console.log("[阿诺] 删除后: ",formBuilderInstance.actions.getData('json'));
        
        //渲染
        options.startRender();
        //断开监听器，释放资源
        observer.disconnect();
      }
    });

    //启动监听器
    observer.observe(builderDiv, {
      childList: true,
      subtree: true,
    });
  });

  // $('#loadJson').on('change', function (event) {
  //   const file = event.target.files[0];
  //   if (!file) return;
    

  //   const reader = new FileReader();
  //   reader.onload = function (e) {
  //     const json = e.target.result;

  //     // const json = '[{"type":"text","required":false,"label":"单行输入","rowNumber":1,"colWidth":"col-md-3","className":"form-control row-1 col-md-3","name":"text-1751007489892-0","subtype":"text"}]';

  //     console.log("[阿诺],bulder json: ",json);
  

  //     formBuilderInstance.actions.setData(json);
      
  //   };
  
  //   reader.readAsText(file);
  // });

  $('#loadJson').on('change', function (event) {
    const file = event.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
  
    reader.onload = function (e) {
      try {
        let formArray = JSON.parse(e.target.result);
  
        // 🔧 遍历每个字段，处理 rowNumber 字段
        for (let i = 0; i < formArray.length; i++) {
          const field = formArray[i];
          if (
            Object.prototype.hasOwnProperty.call(field, 'rowNumber') &&
            typeof field.rowNumber === 'number'
          ) {
            field.rowNumber = String(field.rowNumber); // 强制转成字符串
          }
        }
  
        const json = JSON.stringify(formArray);
        //console.log('[阿诺] 处理rowNumber后的JSON:\n' + JSON.stringify(formArray, null, 2));
  
        // ✅ 传给 formBuilder 进行还原
        formBuilderInstance.actions.setData(json);
        
        cleanPreviewClasses(); //还原后清理class
  
      } catch (err) {
        console.error('[阿诺] ❌ JSON 加载或解析失败:', err);
      }
    };
    
    $('#loadJson').val(''); 
    reader.readAsText(file);
  });
  
});

//预览
function switchToRenderMode(enable) {
  $('body').toggleClass('rendering', enable);
}

//加载后移除所有控件的 row-* 和 col-md-*
function cleanPreviewClasses() {
  // 找到所有 .prev-holder
  const holders = document.querySelectorAll('ul.frmb.stage-wrap .prev-holder');

  holders.forEach(holder => {
    // 找到 holder 内部以 formbuilder- 开头的 div
    const target = holder.querySelector('[class^="formbuilder-"]');
    if (!target) return;

    // 清除 row-* 和 col-md-* 的 class
    const classList = Array.from(target.classList);
    classList.forEach(cls => {
      if (/^row-\d+$/.test(cls) || /^col-md-\d+$/.test(cls)) {
        target.classList.remove(cls);
      }
    });
  });
}


//#region 临时

//释放照相资源
// const cameraControls = document.querySelectorAll('.fb-camera-container');

// cameraControls.forEach(wrapper => {
//   const controlInstance = wrapper._controlInstance;
//   if (controlInstance && typeof controlInstance.releaseResources === 'function') {
//     controlInstance.releaseResources();
//   }
// });

//#endregion