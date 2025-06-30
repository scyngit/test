if (!window.fbControls) window.fbControls = []

window.fbControls.push(function(controlClass) {
  /**
   * 最基础的 input 控件
   */
  class controlMyInput extends controlClass {
    /**
     * 控件的定义信息
     */
    static get definition() {
      return {
        icon: '🔤',
        i18n: {
          default: '我的输入框'
        },
        // 可选，也可以设置 subtype，默认即可
      }
    }

    /**
     * 构建控件实际 HTML
     * @return {HTMLElement}
     */
    build() {
      this.input = this.markup('input', null, {
        type: 'text',
        name: this.config.name || '',
        placeholder: this.config.placeholder || '请输入',
        class: 'form-control'
      })
      return this.input
    }

    /**
     * 可选的渲染后钩子
     */
    onRender() {
      // 可添加插件或默认值
      if (this.config.value) {
        this.input.value = this.config.value
      }
    }
  }

  // 注册控件类型为 'myInput'
  controlClass.register('myInput', controlMyInput)
  return controlMyInput
})
