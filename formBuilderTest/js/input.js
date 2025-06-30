$(document).ready(function () {
    
    $('body').on("change", "#loadJson", function(e) {        
        console.log("loadjson");

        setTimeout(() => {
            $('#btnLoadJson').blur();
        }, 0);        
       
        const file = e.target.files[0];
        if (!file) return;

        switchToRenderMode(true);

        const reader = new FileReader();
        reader.onload = function (event) {
            const formJson = event.target.result;

            console.log("[阿诺],render json: ",formJson);
            
            //$('#form-render').formRender({ formData: formJson });
            $('#form-render').formRender({
                formData: formJson,
                onRender: function() {
                  console.log("[阿诺] form - rendering");
                }
              });
        
            // 👇 重点：清空 file input 的值，防止下次无法触发 change
            $('#loadJson').val('');                    
        };
        reader.readAsText(file);
    });

    // 点击自定义按钮时，模拟点击隐藏的 input
    $('#btnLoadJson').on('click', function () {
        $('#loadJson').click();
    });

    
});

function switchToRenderMode(enable) {
    $('body').toggleClass('rendering', enable);
}