if (!window.fbControls) window.fbControls = []

window.fbControls.push(function(controlClass) {
  /**
   * 摄像头控件
   */
  class controlCamera extends controlClass {
    /**
     * 控件定义信息
     */
    static get definition() {
      return {
        icon: '<svg style="vertical-align: middle;" fill="#000000" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.00032"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M29 7h-4.599l-2.401-4h-12l-2.4 4h-4.6c-1 0-3 1-3 2.969v16.031c0 1.657 1.5 3 2.792 3h26.271c1.313 0 2.938-1.406 2.938-2.968v-16.032c0-1-1-3-3-3zM30 26.032c0 0.395-0.639 0.947-0.937 0.969h-26.265c-0.232-0.019-0.797-0.47-0.797-1v-16.031c0-0.634 0.851-0.953 1-0.969h5.732l2.4-4h9.802l1.785 3.030 0.55 0.97h5.731c0.705 0 0.99 0.921 1 1v16.032zM16 10c-3.866 0-7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zM16 22c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"></path> </g></svg>',
        i18n: {
          default: '摄像头'
        }
      }
    }

    /**
     * javascript & css to load
     */
    configure() {
        //console.log("[阿诺] camera-configure()");

        //此处可以引入自定义控件用到的第三方控件的js,css资源
        //this.js = 'js/control_plugins/test.js'
        //this.css = 'https://test/test.css'
    }

    /**
     * 构建控件的 HTML 元素(外观)
     */
    build() {
        //console.log("[阿诺] camera-build()");
        const html = `
        <div class="fb-camera-container" data-type="camera">
            <div class="camera-wrapper">
                <div class="camera-toolbar">
                    <!-- 拍照按钮和隐藏 input -->
                    <input type="file" class="photoInput" accept="image/*" capture="environment" style="display:none;">
                    <button type="button" class="btn btn-primary camera-btn">
                        <svg class="button-img" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 13C21 10.3333 20.5 8 20 7.66667C19.6796 7.45303 18.1268 7.2394 16 7.11352C14.8083 7.04298 17 5 12 5C7 5 9.19168 7.04298 8 7.11352C5.87316 7.2394 4.32045 7.45303 4 7.66667C3.5 8 3 10.3333 3 13C3 15.6667 3.5 18 4 18.3333C4.5 18.6667 8 19 12 19C16 19 19.5 18.6667 20 18.3333C20.5 18 21 15.6667 21 13Z" stroke="#ffffff" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 16C13.6569 16 15 14.6569 15 13C15 11.3431 13.6569 10 12 10C10.3431 10 9 11.3431 9 13C9 14.6569 10.3431 16 12 16Z" stroke="#ffffff" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>                    
                        照相
                    </button>
                    <!-- 录像按钮和隐藏 input -->
                    <input type="file" class="videoInput" accept="video/*" capture="environment" style="display:none;">
                    <button type="button" class="btn btn-success camera-btn">
                    <svg class="button-img" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16 10L18.5768 8.45392C19.3699 7.97803 19.7665 7.74009 20.0928 7.77051C20.3773 7.79703 20.6369 7.944 20.806 8.17433C21 8.43848 21 8.90095 21 9.8259V14.1741C21 15.099 21 15.5615 20.806 15.8257C20.6369 16.056 20.3773 16.203 20.0928 16.2295C19.7665 16.2599 19.3699 16.022 18.5768 15.5461L16 14M6.2 18H12.8C13.9201 18 14.4802 18 14.908 17.782C15.2843 17.5903 15.5903 17.2843 15.782 16.908C16 16.4802 16 15.9201 16 14.8V9.2C16 8.0799 16 7.51984 15.782 7.09202C15.5903 6.71569 15.2843 6.40973 14.908 6.21799C14.4802 6 13.9201 6 12.8 6H6.2C5.0799 6 4.51984 6 4.09202 6.21799C3.71569 6.40973 3.40973 6.71569 3.21799 7.09202C3 7.51984 3 8.07989 3 9.2V14.8C3 15.9201 3 16.4802 3.21799 16.908C3.40973 17.2843 3.71569 17.5903 4.09202 17.782C4.51984 18 5.07989 18 6.2 18Z" stroke="#ffffff" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                        录像
                    </button>
                </div>
                <div class="camera-preview">
                    <!--<img class="preview-img" src="data:image/svg+xml,%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3C!-- Uploaded to: SVG Repo, www.svgrepo.com, Transformed by: SVG Repo Mixer Tools --%3E%3Csvg width='150px' height='150px' viewBox='0 -3 24 24' id='meteor-icon-kit__solid-camera' fill='none' xmlns='http://www.w3.org/2000/svg' stroke='%23000000' stroke-width='0.00024000000000000003'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'/%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M3 3H5.58579L8 0.58579C8.37507 0.21071 8.88378 0 9.41421 0H14.5858C15.1162 0 15.6249 0.21071 16 0.58579L18.4142 3H21C22.6569 3 24 4.34315 24 6V15C24 16.6569 22.6569 18 21 18H3C1.34315 18 0 16.6569 0 15V6C0 4.34315 1.34315 3 3 3zM15 10C15 11.6569 13.6569 13 12 13C10.3431 13 9 11.6569 9 10C9 8.3431 10.3431 7 12 7C13.6569 7 15 8.3431 15 10zM17 10C17 12.7614 14.7614 15 12 15C9.23858 15 7 12.7614 7 10C7 7.2386 9.23858 5 12 5C14.7614 5 17 7.2386 17 10z' fill='%23758CA3'/%3E%3C/g%3E%3C/svg%3E" /> -->
                    <svg class="preview-img" viewBox="0 0 24 24" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-18yzcnr r-yc9v9c" style="color: rgb(255, 255, 255);"><g><path d="M9.697 3H11v2h-.697l-3 2H5c-.276 0-.5.224-.5.5v11c0 .276.224.5.5.5h14c.276 0 .5-.224.5-.5V10h2v8.5c0 1.381-1.119 2.5-2.5 2.5H5c-1.381 0-2.5-1.119-2.5-2.5v-11C2.5 6.119 3.619 5 5 5h1.697l3-2zM12 10.5c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm-4 2c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4zM17 2c0 1.657-1.343 3-3 3v1c1.657 0 3 1.343 3 3h1c0-1.657 1.343-3 3-3V5c-1.657 0-3-1.343-3-3h-1z"></path></g></svg>
                </div>
            </div>
            <div class="camera-overlay" style="display: none;">                
                <div class="camera-overlay-content"></div>
            </div>
        </div>
        `
        const wrapper = document.createElement('div');
        wrapper.innerHTML = html;
        const el = wrapper.firstElementChild;
        this.element = el;
        el._controlInstance = this;  //DOM元素绑定控件实例（绑定后就可以通过DOM元素调用实例方法）
        return el;
    }

    /**
     * 渲染
     */
    onRender() {
        //console.log("[阿诺] camera-onRender()");
      
        //局部作用域选择：限定值操作当前控件DOM中的元素,不会误选其他控件(或多个同一控件)里的同名元素
        const photoInput = this.element.querySelector('.photoInput');
        const photoBtn = this.element.querySelector('.btn.btn-primary.camera-btn');
        const videoInput = this.element.querySelector('.videoInput');
        const videoBtn = this.element.querySelector('.btn.btn-success.camera-btn');
        const preview = this.element.querySelector('.camera-preview');
        
        photoBtn.addEventListener('click', () => {
            photoInput.click();
        });

        videoBtn.addEventListener('click', () => {
            videoInput.click();
        });

        //预览
        // photoInput.addEventListener('change', (event) => {    
        //     const file = event.target.files[0];
        //     //console.log(file);
        //     if(file) {
        //         //释放资源
        //         this.releaseResources();

        //         this._photoFile = file;
        //         this._photoUrl = URL.createObjectURL(file);

        //         const img = document.createElement('img');
        //         img.style.maxWidth = '100%';
        //         img.src = this._photoUrl;
        
        //         // 插入页面
        //         setTimeout(() => {
        //             preview.innerHTML = '';
        //             preview.appendChild(img);
        //         }, 0);
        //     }
            
        //     $(photoBtn).blur();        
        // });
        photoInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                if (file && file.type.startsWith('image/')) {
                    this.releaseResources(); // 清掉之前的资源
                    this._photoFile = file;
                    this._photoUrl = URL.createObjectURL(file); // 原图大图预览用
                
                    // 使用 FileReader + canvas 生成缩略图
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const img = new Image();
                        img.onload = () => {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                
                        // 缩略图最大宽度 200px
                        const maxWidth = 200;
                        const ratio = maxWidth / img.width;
                        canvas.width = maxWidth;
                        canvas.height = img.height * ratio;
                
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                        const thumbUrl = canvas.toDataURL('image/jpeg');
                
                        const thumbImg = document.createElement('img');
                        thumbImg.src = thumbUrl;
                        thumbImg.style.maxWidth = '100%';
                
                        setTimeout(() => {
                            preview.innerHTML = '';
                            preview.appendChild(thumbImg);
                        }, 0);
                        };
                        img.src = e.target.result;
                    };
                    reader.readAsDataURL(file);
                }              
            }
          
            // photoInput.value = ''; // 清空 input 值，防止重复选同一个文件不触发 change
            $(photoBtn).blur();
          });

        videoInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            //console.log(file);
            if (file) {
                //释放资源
                this.releaseResources();

                this._videoFile = file;
                this._videoUrl = URL.createObjectURL(file);

                const video = document.createElement('video');
                video.src = this._videoUrl;
                //video.controls = true;                        
                video.autoplay = false;
                video.muted = true;
                //video.style.maxWidth = '100%';
                video.style.width = '200px';
                video.style.maxHeight = '120px';

                setTimeout(() => {
                    preview.innerHTML = '';
                    preview.appendChild(video);
                }, 0);
            }

            $(videoBtn).blur();
        });

        //绑定点击预览区域 ⇒ 放大显示
        const overlay = this.element.querySelector('.camera-overlay');
        // const overlayBg = this.element.querySelector('.camera-overlay-bg');
        const overlayContent = this.element.querySelector('.camera-overlay-content');
        
        preview.addEventListener('click', () => {
            if (!this._photoUrl && !this._videoUrl) return;

            overlay.style.display = 'flex';
            overlayContent.innerHTML = '';
          
            if (this._photoUrl) {
                const img = new Image();
                img.src = this._photoUrl;
                img.style.objectFit = 'contain';
                img.onload = () => {
                    const screenW = window.innerWidth * 0.9;
                    const screenH = window.innerHeight * 0.9;
                    const ratio = Math.min(screenW / img.naturalWidth, screenH / img.naturalHeight, 1);
                    img.style.width = `${img.naturalWidth * ratio}px`;
                    img.style.height = `${img.naturalHeight * ratio}px`;
                };
                overlayContent.appendChild(img);
            } else if (this._videoUrl) {                              
                const video = document.createElement('video');
                video.src = this._videoUrl;
                video.controls = true;
                video.style.objectFit = 'contain';
            
                // 视频需要加载元数据来获取尺寸
                video.addEventListener('loadedmetadata', () => {
                    const screenW = window.innerWidth * 0.9;
                    const screenH = window.innerHeight * 0.9;
                    const ratio = Math.min(screenW / video.videoWidth, screenH / video.videoHeight, 1);
                    video.style.width = `${video.videoWidth * ratio}px`;
                    video.style.height = `${video.videoHeight * ratio}px`;
                });
            
                overlayContent.appendChild(video);
            }
          });

        // 点击遮罩关闭（但排除点击内容）
        overlay.addEventListener('click', (e) => {
            if (!overlayContent.contains(e.target)) {
            overlay.style.display = 'none';
            overlayContent.innerHTML = '';
            }
        });
    }

    //释放照相资源
    releasePhotoResources() {
        if (this._photoUrl) {
          URL.revokeObjectURL(this._photoUrl);
          this._photoUrl = null;
        }
        this._photoFile = null;
        this.element.querySelector('.camera-preview').innerHTML = '';

        console.log("[阿诺] 照片资源被释放");
    }
    
    //释放录像资源
    releaseVideoResources() {
        if (this._videoUrl) {
            URL.revokeObjectURL(this._videoUrl);
            this._videoUrl = null;
        }
        this._videoFile = null;
        this.element.querySelector('.camera-preview').innerHTML = '';

        console.log("[阿诺] 录像资源被释放");
    }

    releaseOverlayResources() {
        const overlayContent = this.element.querySelector('.camera-overlay-content');
        if (overlayContent) {
            overlayContent.innerHTML = '';
        }
    }
      
    // 释放该控件的所有资源
    releaseResources() {
        this.releasePhotoResources();
        this.releaseVideoResources();
        this.releaseOverlayResources();       
    }
  }

  // 注册控件类型为 camera
  controlClass.register('camera', controlCamera)
  return controlCamera
})
