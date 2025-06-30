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
        '':'',
        'col-md-1': '1',
        'col-md-2': '2',
        'col-md-3': '3',
        'col-md-4': '4',
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
      'button'
    ],    
    actionButtons: [{
      id: 'smile',
      className: 'btn btn-success',
      label: '加载',
      type: 'button',
      events: {
        click: function() {
          // alert('😁😁😁 !SMILE! 😁😁😁');
          //$('#loadJson').click(); // 👈 模拟点击隐藏 input

          const json = '[{"type":"text","required":false,"label":"fuckyou","rowNumber":1,"colWidth":"col-md-3","className":"form-control row-1 col-md-3","name":"text-1751007489892-0","subtype":"text"}]';

          formBuilderInstance.actions.setData(json);
        }
      }
    }],

    typeUserAttrs: {
            
      //text: {...commonAttrs},

      text: {
        // rowNumber: {
        //   label: '行号',
        //   value: '',
        //   type: 'number',
        //   style: "width: 75px; margin-left: 10px;"
        // }        
      },
      
      // date: {...commonAttrs},

      // number: {...commonAttrs},

      // textarea: {...commonAttrs},

      // select: {...commonAttrs},

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

    // disabledActionButtons: ['data'],
    disableFields: ['autocomplete','file','hidden'],
    disabledFieldButtons: {
      'header': ['copy'], 
      'paragraph': ['copy'], 
      'text': ['copy'], 
      'textarea': ['copy'], 
      'radio-group': ['copy'], 
      'checkbox-group': ['copy'], 
      'select': ['copy'], 
      'date': ['copy'], 
      'number': ['copy'], 
      'button': ['copy']

    },
    // disabledAttrs: ['className', 'name'],
    onOpenFieldEdit: function (editPanel) {
      const labelMap = {
        'Display checkbox inline': '横向显示',
        'Display radio inline': '横向显示',
        'Inline': '排列方式'
      };
  
      editPanel.querySelectorAll('label').forEach(label => {
        const oldText = label.innerText.trim();
        if (labelMap[oldText]) {
          label.innerText = labelMap[oldText];
        }
      });
    },
    // fieldRemoveWarn: true,

    //save
    onSave: function(evt, formData) {
      //console.log('data: ', formData);

      //预览
      switchToRenderMode(true);
      //渲染
      $('#form-render').formRender({
        formData: formData,
        onRender: function() {
          console.log("[阿诺] form - render");
        }
      });
    }
  };
  var formBuilderInstance = $('#form-builder').formBuilder(options);

  formBuilderInstance.promise.then(function(fb) {
    console.log("formBuilder加载完成");

    $('#form-builder .save-template').text('预览');

    //替换原来的提示信息（加入svg图片（用于文本内容只能转成base64））
    const styleContent = `
      .form-wrap.form-builder .stage-wrap.empty::after {
        content: url("data:image/svg+xml,%3Csvg xmlns:xlink='http://www.w3.org/1999/xlink' xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 15 15'%3E%3Cpath fill='%23616161' d='M661.792222,195.056432 L663.844218,197.438383 C663.961487,197.498558 664.03567,197.618907 664.03567,197.751295 L664.03567,198.448325 C664.03567,198.55665 663.921402,198.627857 663.824175,198.578715 L662.026788,196.442476 L662.026,202.029 L667.556532,202.029071 L665.418283,200.23467 C665.36914,200.136439 665.441353,200.020161 665.551662,200.020161 L666.249711,200.020161 C666.380101,200.020161 666.499431,200.094344 666.556617,200.211613 L668.946584,202.332781 C669.018797,202.479123 669.017791,202.651537 668.943568,202.796874 L666.561617,204.848871 C666.501442,204.96614 666.381093,205.040323 666.248705,205.040323 L665.551675,205.040323 C665.44335,205.040323 665.372143,204.926054 665.421285,204.828828 L667.557524,203.03144 L662.026,203.031 L662.026788,208.557524 L663.824175,206.421285 C663.907512,206.379163 664.00337,206.425461 664.029057,206.507765 L664.03567,206.551675 L664.03567,207.248705 C664.03567,207.354615 663.988193,207.452821 663.90916,207.518676 L663.844218,207.561617 L661.792222,209.943568 C661.675952,210.002947 661.542353,210.015466 661.418637,209.981126 L661.328129,209.946584 L659.20696,207.556617 C659.113145,207.510869 659.046905,207.425347 659.024162,207.326209 L659.015509,207.249711 L659.015509,206.551662 C659.015509,206.457111 659.100937,206.39055 659.187205,206.404409 L659.230018,206.418283 L661.024419,208.556532 L661.024,203.031 L655.442476,203.03144 L657.578715,204.828828 C657.620837,204.912165 657.574539,205.008022 657.492235,205.033709 L657.448325,205.040323 L656.751295,205.040323 C656.645385,205.040323 656.547179,204.992846 656.481324,204.913813 L656.438383,204.848871 L654.056432,202.796874 C653.997053,202.680605 653.984534,202.547006 654.018874,202.42329 L654.053416,202.332781 L656.443383,200.211613 C656.489131,200.117798 656.574653,200.051558 656.673791,200.028814 L656.750289,200.020161 L657.448338,200.020161 C657.542889,200.020161 657.60945,200.10559 657.595591,200.191858 L657.581717,200.23467 L655.443468,202.029071 L661.024,202.029 L661.024419,196.443468 L659.230018,198.581717 C659.131787,198.63086 659.015509,198.558647 659.015509,198.448338 L659.015509,197.750289 C659.015509,197.619899 659.089691,197.500569 659.20696,197.443383 L661.328129,195.053416 C661.474471,194.981203 661.646885,194.982209 661.792222,195.056432 Z' transform='translate(-654 -195)'%3E%3C/path%3E%3C/svg%3E") " 请从右边拖拽组件到此区域";
        display: block;
        text-align: center;
        color: #666;
        font-size: 18px;
        line-height: 1.5;
        white-space: nowrap;
      }
    `;
    const styleTag = document.createElement('style');  //创建<style></style>元素
    styleTag.type = 'text/css';
    styleTag.appendChild(document.createTextNode(styleContent));
    //动态插入到<head>里，按照后插入覆盖先插入的规则，会覆盖原先的css，于css处于的在html文档中的物理位置无关
    //可是适用于所有css的替换，而且伪元素不是DOM中的实际元素，所以只能用这种方式替换其css（js只能操作实际存在的元DOM素）
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

});

//预览
function switchToRenderMode(enable) {
  $('body').toggleClass('rendering', enable);
}