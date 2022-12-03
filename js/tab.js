let that;
class Tab {
    constructor(id) {
        that = this;
        this.main = document.querySelector(id);
        this.add = this.main.querySelector('.tabadd');
        this.ul = this.main.querySelector('.firstnav ul:first-child');
        this.fsection = this.main.querySelector('.tabscon');
        this.init();
    }
    init() {
        this.updateNode();
        this.add.onclick = this.addTab;
        for (let i = 0; i < this.lis.length; i++) {
            this.lis[i].setAttribute('index', i);
            this.lis[i].onclick = this.toggleTab;
            this.remove[i].onclick = this.removeTab;
            this.spans[i].ondblclick = this.editTab;
            this.sections[i].ondblclick = this.editTab;
        }
    }
    updateNode() {
        this.lis = this.ul.querySelectorAll('li');
        this.sections = this.fsection.querySelectorAll('section');
        this.remove = this.ul.querySelectorAll('.icon-guanbi');
        this.spans = this.ul.querySelectorAll('li span:first-child');
    }
    toggleTab() {
        that.clearClass();
        this.className = 'liactive';
        that.sections[this.getAttribute('index')].className = 'conactive';
    }
    clearClass() {
        for (let i = 0; i < this.lis.length; i++) {
            this.lis[i].className = '';
            this.sections[i].className = '';
        }
    }
    addTab() {
        that.clearClass();
        let random = Math.random();
        let li = "<li class='liactive'><span>新选项卡</span><span class='iconfont icon-guanbi'></span></li>";
        let section = "<section class='conactive'>测试" + random + "</section>";
        that.ul.insertAdjacentHTML('beforeend', li);
        that.fsection.insertAdjacentHTML('beforeend', section);
        that.init();
    }
    removeTab(e) {
        e.stopPropagation();
        let index = this.parentNode.getAttribute('index');
        that.lis[index].remove();
        that.sections[index].remove();
        that.init();
        if (document.querySelector('.liactive')) return false;
        index--;
        that.lis[index] && that.lis[index].click();
    }
    editTab() {
        let str = this.innerHTML;
        this.innerHTML = '<input type="text" />';
        let input = this.children[0];
        input.value = str;
        input.select();

        input.onblur = function() {
            let str = this.value;
            this.parentNode.innerHTML = str;
        }

        input.onkeyup = function(e) {
            if (e.keyCode == 13) {
                this.blur();
            }
        }
    }
}
new Tab('#tab');